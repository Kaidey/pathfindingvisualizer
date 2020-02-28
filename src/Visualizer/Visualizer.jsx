import React, { Component } from "react";
import Grid from "../Grid/Grid";
import Menu from "../Menu/Menu";

import "./Visualizer.css";

const NODES = {
  WALL_NODE: "wall",
  START_NODE: "start",
  END_NODE: "end"
};

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeToPlace: NODES.WALL_NODE
    };
  }

  setNodeToPlace = nodeType => {
    this.setState({ nodeToPlace: nodeType });
  };

  render() {
    return (
      <div className="main">
        <div id="menu">
          <Menu selectNode={this.setNodeToPlace} nodes={NODES} />
        </div>
        <div id="grid">
          <Grid nodeToPlace={this.state.nodeToPlace} />
        </div>
      </div>
    );
  }
}
