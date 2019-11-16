import React, { Component } from "react";
import SensorLocationMap from "./SensorLocationMap";
import { Nivobar } from "./Nivobar";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Nuuksio Visitors</h1>
        <SensorLocationMap />
        
        <Nivobar />
      </div>
    );
  }
}
