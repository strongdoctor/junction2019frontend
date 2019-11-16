import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Proj4jsHelper from '../utils/Proj4jsHelper';

export default class SensorLocationMap extends Component {
  state = {
    lat: 6687729,
    lng: 364641,
    zoom: 13,
  }

  render() {
    //I'm not going to redefine those two in latter examples.
    
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
        <Marker position={projectedPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}