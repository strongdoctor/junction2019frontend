using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;
using static Junction2019.Controllers.DataController;

public class DataHttpService : IDataHttpService
{
    private readonly HttpClient _httpClient;
    public DataHttpService(HttpClient httpClient) {
        // Set up e.g. base-URL, access tokens etc here
        _httpClient = httpClient;
    }

    public async Task<string> getRemoteData(
        int sensorId,
        string date,
        WeatherDataModel weatherModel
    )
    {

        // {
        // "snowdepth": 1.2, 
        // "windspeed": 2.1,
        // "temp": 21,
        // "rainintensity": 5.5,
        // "clouds": "Clear",
        // "Date": "2019-12-9",
        // "sensorid": "213224"
        // }
        // weekday/weekend
        // Season (Winter, spring, summer, autumn) Winter = december, januari, februari
        // TimeOfday (Morning, afternoon, evening, night) Morning = 6AM->12AM


        var cloudsString = Enum.GetName(typeof(Cloudiness), weatherModel.cloudiness);

        var contentObj = new {
            snowdepth = weatherModel.snowDepth,
            windspeed = weatherModel.windSpeed,
            temp = weatherModel.temperature,
            rainintensity = weatherModel.rainIntensity,
            clouds = cloudsString,
            date = date,
            sensorid = sensorId.ToString()
        };

        var serializedContent = JsonConvert.SerializeObject(contentObj);
        var data = new StringContent(serializedContent, Encoding.UTF8, "application/json");
        
        var response = await _httpClient.PostAsync("http://127.0.0.1:5000/predict", data);
        var responseContents = await response.Content.ReadAsStringAsync();

        return responseContents;
    }
}
