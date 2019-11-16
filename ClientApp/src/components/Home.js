import React, { Component } from "react";
import { Word } from "./Word";
import SensorLocationMap from "./SensorLocationMap";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, Spam project</h1>
        <Word hello="Word"/>
        <SensorLocationMap />
      </div>
    );
  }
}
