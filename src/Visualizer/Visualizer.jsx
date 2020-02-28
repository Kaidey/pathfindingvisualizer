import React, { Component } from "react";
import ReactDOM from "react-dom";
import Grid from "../Grid/Grid";
import Menu from "../Menu/Menu";

import "./Visualizer.css";

const NODES = {
  WALL_NODE: 0,
  START_NODE: 1,
  END_NODE: 2
};

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeToPlace: NODES.WALL_NODE,
      startNode: null,
      endNode: null
    };
  }

  setNodeToPlace = nodeType => {
    this.setState({ nodeToPlace: nodeType });
  };

  cellClickHandler = event => {
    const tableNode = ReactDOM.findDOMNode(this);
    const clickedCellID = event.target.id;
    const cell = tableNode.querySelector(`#${clickedCellID}`);

    if (cell.className === "unvisited") {
      cell.className = this.validateNode(cell);
    }
  };

  //Checks if there is already a start node and an end node
  //Returns the css class that corresponds to the selected node
  validateNode = cell => {
    const { nodeToPlace, startNode, endNode } = this.state;

    switch (nodeToPlace) {
      case 0:
        return "wall";

      case 1:
        if (startNode) {
          startNode.className = "unvisited";
        }

        this.setState({ startNode: cell });

        return "start";

      case 2:
        if (endNode) {
          endNode.className = "unvisited";
        }

        this.setState({ endNode: cell });

        return "end";

      default:
        break;
    }
  };

  render() {
    return (
      <div className="main">
        <div id="menu">
          <Menu selectNode={this.setNodeToPlace} nodes={NODES} />
        </div>
        <div id="grid">
          <Grid cellClickHandler={this.cellClickHandler} />
        </div>
      </div>
    );
  }
}
