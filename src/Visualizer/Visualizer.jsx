import React, { Component } from "react";
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
      grid: [],
      tableElement: null
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({
      grid: grid,
      tableElement: document.getElementById("grid")
    });
  }

  setNodeToPlace = nodeType => {
    this.setState({ nodeToPlace: nodeType });
  };

  mouseEventHandler = event => {
    event.preventDefault();
    const clickedCellID = event.target.id;
    const cell = this.state.tableElement.querySelector(`#${clickedCellID}`);

    if (cell.className === "unvisited") {
      cell.className = this.validateNode(clickedCellID);
    }
  };

  //Checks if there is already a start node and an end node
  //Returns the css class that corresponds to the selected node
  validateNode = clickedCellID => {
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
          let element = this.state.tableElement.querySelector(
            `#node_${startNode.row}_${startNode.col}`
          );
          element.className = "unvisited";
        }

        this.setState({ startNode: node });

        return "start";

      case 2:
        if (endNode) {
          let element = this.state.tableElement.querySelector(
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

  clearBoard = () => {
    this.setState({ grid: getInitialGrid() });
    const rows = document.getElementById("tableBody").children;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].children;
      for (let j = 0; j < row.length; j++) {
        row[j].className = "unvisited";
      }
    }
  };

  animateDijkstra = (sp, visited) => {
    let i = 1;
    const end = this.state.tableElement.querySelector(
      `#node_${this.state.endNode.row}_${this.state.endNode.col}`
    );
    visited.forEach(node => {
      const cell = this.state.tableElement.querySelector(
        `#node_${node.row}_${node.col}`
      );
      if (cell === end) {
        setTimeout(() => {
          this.animateSPNodes(sp);
        }, 10 * i);
      }

      if (cell.className !== "start" && cell.className !== "end") {
        setTimeout(() => {
          cell.className = "visited";
        }, 10 * i);
        i++;
      }
    });
  };

  animateSPNodes = sp => {
    let j = 1;
    sp.forEach(node => {
      const cell = this.state.tableElement.querySelector(
        `#node_${node.row}_${node.col}`
      );

      if (cell.className !== "start" && cell.className !== "end") {
        setTimeout(() => {
          cell.className = "shortestPath";
        }, 30 * j);
        j++;
      }
    });
  };

  runDijkstra = () => {
    let Dij = new Dijkstra(
      this.state.grid,
      this.state.startNode,
      this.state.endNode
    );
    let results = Dij.run();

    this.animateDijkstra(results.sp, results.visited);
  };

  render() {
    return (
      <div className="main">
        <div id="menu">
          <Menu
            selectNode={this.setNodeToPlace}
            nodes={NODES}
            runDijkstra={this.runDijkstra}
            clearBoard={this.clearBoard}
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

const getInitialGrid = () => {
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
};
