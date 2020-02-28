import React, { Component } from "react";
import Grid from "../Grid/Grid";
import Menu from "../Menu/Menu";

import "./Visualizer.css";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <div id="menu">
          <Menu />
        </div>
        <div id="grid">
          <Grid />
        </div>
      </div>
    );
  }
}
