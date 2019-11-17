import os 
import json 
import sklearn 
import pickle

from flask import Flask
from flask import request
from flask import jsonify, make_response


from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

import pandas as pd 

app = Flask(__name__)

# externally visible or something 
# flask run --host=0.0.0.0

rf_dict = {
  '1043': None,
  '1050': None,
  '1225': None,
  '1246': None,
  '912': None,
  '922': None
}

def get_onehot_df(df):
  result_df = pd.get_dummies(df, columns = ['TimeOfDay', 'Weekday Or Weekend', 'Season', 'Clouds'])
  return result_df

def make_sensor_prediction(rf_dict, CounterID_ASTA, TimeOfDay, Temperature, RainIntensity, SnowDepth, WindSpeed, WeekdayOrWeekend, Season, Clouds):
  print(f"prediction on {CounterID_ASTA}")
  X_dict = {'TimeOfDay': [TimeOfDay, 'Night', 'Morning', 'Afternoon', 'Evening'],
            'Temperature': [Temperature, None, None, None, None],
            'Rain Intensity (mm/h)': [RainIntensity, None, None, None, None],
            'Snow Depth (cm)': [SnowDepth, None, None, None, None],
            'Wind Speed (m/s)': [WindSpeed, None, None, None, None],
            'Weekday Or Weekend': [WeekdayOrWeekend, 'Weekday', 'Weekend', None, None],
            'Season': [Season, 'Winter', 'Spring', 'Summer', 'Autumn'],
            'Clouds': [Clouds, 'Clear', 'PartlyCloudy', 'Cloudy', None]
  }
  X = pd.DataFrame.from_dict(X_dict)
  X = get_onehot_df(X)
  prediction_input = [X.iloc[0]]
  print(X.columns)
  return rf_dict[CounterID_ASTA].predict(prediction_input)

def weekday(num):
  if num > 4:
    return 'Weekend'
  return 'Weekday'


@app.route('/predict', methods=['POST'])
def predict():
  predictions = []

  content = request.get_json()

  # parameters 
  depth = content['snowdepth']
  ws = content['windspeed']
  temp = content['temp']
  rainint = content['rainintensity']
  clouds = content['clouds']
  date = content['date']
  sensor_id = content['sensorid']

  #input_df = pd.DataFrame([depth, ws, temp, rainint, clouds, date])

  tod = ['Morning', 'Afternoon', 'Evening', 'Night']
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn']

  pd.to_datetime(date).month
  seasons_month = [(month%12 + 3)//3 for month in range(1, 13)]
  season = seasons[seasons_month[pd.to_datetime(date).month - 1] - 1]
  weekd = weekday(pd.to_datetime(date).weekday())

  for daytime in tod: 
    prediction = make_sensor_prediction(
      rf_dict, 
      sensor_id, 
      daytime, 
      temp, 
      rainint, 
      depth, 
      ws, 
      weekd, 
      season,
      clouds
    )
    predictions.append(prediction)

  response_body = {
    "Morning": predictions[0][0],
    "Afternoon": predictions[1][0],
    "Evening":  predictions[2][0],
    "Night":  predictions[3][0]
  }

  res = make_response(jsonify(response_body), 200)
  return res

if __name__ == '__main__':
  for filename in os.listdir('models'):
    temp_model = pickle.load(open("models/" + filename, 'rb'))

    rf_dict[filename.split("_")[1].split('.')[0]] = temp_model
  
  print("Models loaded into dict -- all is gucci")

  app.run(debug=True)