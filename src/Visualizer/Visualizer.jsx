import React, { Component } from "react";
import ReactDOM from "react-dom";
import Grid from "./Grid/Grid";
import Menu from "./Menu/Menu";
import Dijkstra from "../Algorithms/Dijkstra";

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
      endNode: null,
      mouseDown: false,
      grid: []
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  getInitialGrid() {
    const grid = [];

    for (let row = 0; row < 17; row++) {
      const currentRow = [];
      for (let col = 0; col < 70; col++) {
        currentRow.push({
          row: row,
          col: col,
          cost: Infinity,
          path: null,
          isWall: false
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  setNodeToPlace = nodeType => {
    this.setState({ nodeToPlace: nodeType });
  };

  mouseEventHandler = event => {
    event.preventDefault();
    const tableNode = ReactDOM.findDOMNode(this);
    const clickedCellID = event.target.id;
    const cell = tableNode.querySelector(`#${clickedCellID}`);

    if (cell.className === "unvisited") {
      cell.className = this.validateNode(clickedCellID, tableNode);
    }
  };

  //Checks if there is already a start node and an end node
  //Returns the css class that corresponds to the selected node
  validateNode = (clickedCellID, tableNode) => {
    const { nodeToPlace, startNode, endNode } = this.state;

    let row = parseInt(clickedCellID.split("_")[1]);
    let col = parseInt(clickedCellID.split("_")[2]);

    let node = this.state.grid[row][col];

    switch (nodeToPlace) {
      case 0:
        const updateGrid = this.state.grid;
        updateGrid[row][col].isWall = true;
        this.setState({ grid: updateGrid });
        return "wall";

      case 1:
        if (startNode) {
          let element = tableNode.querySelector(
            `#node_${startNode.row}_${startNode.col}`
          );
          element.className = "unvisited";
        }

        this.setState({ startNode: node });

        return "start";

      case 2:
        if (endNode) {
          let element = tableNode.querySelector(
            `#node_${endNode.row}_${endNode.col}`
          );
          element.className = "unvisited";
        }

        this.setState({ endNode: node });

        return "end";

      default:
        break;
    }
  };

  runDijkstra = () => {
    let Dij = new Dijkstra(
      this.state.grid,
      this.state.startNode,
      this.state.endNode
    );
    let results = Dij.run();

    const tableNode = ReactDOM.findDOMNode(this);

    console.log(results.sp);

    results.sp.forEach(node => {
      const cell = tableNode.querySelector(`#node_${node.row}_${node.col}`);
      if (cell.className !== "start" && cell.className !== "end") {
        cell.className = "shortestPath";
      }
    });

    results.visited.forEach(node => {
      const cell = tableNode.querySelector(`#node_${node.row}_${node.col}`);
      if (
        cell.className !== "start" &&
        cell.className !== "end" &&
        cell.className !== "shortestPath"
      ) {
        cell.className = "visited";
      }
    });
  };

  render() {
    return (
      <div className="main">
        <div id="menu">
          <Menu
            selectNode={this.setNodeToPlace}
            nodes={NODES}
            runDijkstra={this.runDijkstra}
          />
        </div>
        <div id="grid">
          <Grid
            mouseEventHandler={this.mouseEventHandler}
            setMouseDownFalse={() => this.setState({ mouseDown: false })}
            setMouseDownTrue={() => this.setState({ mouseDown: true })}
            mouseDown={this.state.mouseDown}
            grid={this.state.grid}
          />
        </div>
      </div>
    );
  }
}
