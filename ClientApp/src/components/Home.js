import React, { Component} from "react";
import { VisitorFilter } from "./VisitorFilter"

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Nuuksio Visitors</h1>
        <VisitorFilter />
      </div>
    );
  }
}