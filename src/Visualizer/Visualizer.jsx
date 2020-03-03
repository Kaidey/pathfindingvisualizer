import React, { Component } from "react";
import Grid from "./Grid/Grid";
import Menu from "./Menu/Menu";

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
      grid: []
    };

    this.nodeToPlace = NODES.WALL_NODE;
    this.startNode = null;
    this.endNode = null;
    this.mouseDown = false;
    this.algorithm = null;
    this.tableElement = null;
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.tableElement = document.getElementById("grid");
    this.setState({
      grid: grid
    });
  }

  setNodeToPlace = nodeType => {
    this.nodeToPlace = nodeType;
  };

  mouseEventHandler = event => {
    event.preventDefault();
    const clickedCellID = event.target.id;
    const cell = this.tableElement.querySelector(`#${clickedCellID}`);

    if (cell.className === "unvisited") {
      cell.className = this.validateNode(clickedCellID);
    }
  };

  //Checks if there is already a start node and an end node
  //Returns the css class that corresponds to the selected node
  validateNode = clickedCellID => {
    let row = parseInt(clickedCellID.split("_")[1]);
    let col = parseInt(clickedCellID.split("_")[2]);

    let node = this.state.grid[row][col];

    switch (this.nodeToPlace) {
      case 0:
        const updateGrid = this.state.grid;
        updateGrid[row][col].isWall = true;
        this.setState({ grid: updateGrid });
        return "wall";

      case 1:
        if (this.startNode) {
          let element = this.tableElement.querySelector(
            `#node_${this.startNode.row}_${this.startNode.col}`
          );
          element.className = "unvisited";
        }

        this.startNode = node;

        return "start";

      case 2:
        if (this.endNode) {
          let element = this.tableElement.querySelector(
            `#node_${this.endNode.row}_${this.endNode.col}`
          );
          element.className = "unvisited";
        }

        this.endNode = node;

        return "end";

      default:
        break;
    }
  };

  clearBoard = () => {
    this.setState({ grid: getInitialGrid() });
    const rows = document.getElementById("tableBody").children;
    this.startNode = null;
    this.endNode = null;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].children;
      for (let j = 0; j < row.length; j++) {
        row[j].className = "unvisited";
      }
    }
  };

  /* clearPath = () => {
    this.setState({ grid: getInitialGrid() });
    const rows = document.getElementById("tableBody").children;
    this.startNode.cost = Infinity;
    this.endNode.cost = Infinity;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].children;
      for (let j = 0; j < row.length; j++) {
        if (row[j].className !== "start" && row[j].className !== "end") {
          row[j].className = "unvisited";
        }
      }
    }
  }; */

  animateAlgo = (sp, visited) => {
    let i = 1;
    const end = this.tableElement.querySelector(
      `#node_${this.endNode.row}_${this.endNode.col}`
    );
    visited.forEach(node => {
      const cell = this.tableElement.querySelector(
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
      const cell = this.tableElement.querySelector(
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

  runAlgo = () => {
    if (this.algorithm && this.startNode && this.endNode) {
      import(`../Algorithms/${this.algorithm}`).then(algo => {
        let algoInstance = new algo.default(
          this.state.grid,
          this.startNode,
          this.endNode
        );
        /* console.time("algoTimer"); */
        let results = algoInstance.run();
        this.animateAlgo(results.sp, results.visited);
        /* console.timeEnd("algoTimer"); */
      });
    } else {
      window.alert(
        "Something's missing! Check if you placed both start and end nodes nad if you chose an algorithm"
      );
    }
  };

  render() {
    return (
      <div className="main">
        <div id="menu">
          <Menu
            selectNode={this.setNodeToPlace}
            nodes={NODES}
            runAlgo={this.runAlgo}
            clearBoard={this.clearBoard}
            /* clearPath={this.clearPath} */
            updateAlgo={algoName => {
              this.algorithm = algoName;
            }}
          />
        </div>
        <div id="grid">
          <Grid
            mouseEventHandler={this.mouseEventHandler}
            setMouseDownFalse={() => (this.mouseDown = false)}
            setMouseDownTrue={() => (this.mouseDown = true)}
            mouseDown={this.mouseDown}
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
