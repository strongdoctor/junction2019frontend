import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Proj4jsHelper from '../utils/Proj4jsHelper';
import axios from 'axios';

export default class SensorLocationMap extends Component {
  state = {
    lat: 6687729,
    lng: 364641,
    zoom: 11,
    sensors: [],
  }

  render() {
    //I'm not going to redefine those two in latter examples.

    let sensorMarkersJsx;
    if(this.state.sensors.length > 0) {
      sensorMarkersJsx = this.state.sensors.map((sensor) => {
        const projectedPosition = Proj4jsHelper
          .convertToDegrees(Number.parseInt(sensor.CoordinateNorth, 10),  Number.parseInt(sensor.CoordinateEast, 10));
        console.log("Projected in map:", projectedPosition);
        return (
          <Marker
            position={projectedPosition}
            key={`sensormarker-${sensor.CounterID_ASTA}`}
          >
            <Popup>
              <div><strong>{sensor.CounterID_ASTA}</strong></div>
              <div>{sensor.Name_ASTA}</div>
            </Popup>
          </Marker>
        );
      });
    }
    

    
    const position = [this.state.lat, this.state.lng]
    const projectedPosition = Proj4jsHelper.convertToDegrees(position[0], position[1]);
    console.log("ProjectedPosition:", projectedPosition);
    return (
      <Map
        center={projectedPosition}
        zoom={this.state.zoom}
        style={{ height: "600px" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensorMarkersJsx}
      </Map>
    )
  }

  componentDidMount(){
    const self = this;
    axios.get('/api/sensor/')
    .then(function (response) {

        response.data = response.data.sort((a,b,) => a > b.TimeOfDay);

        self.setState({
            sensors: response.data,
        });
    });
}
}