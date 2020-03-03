import React, { Component } from "react";
import Grid from "./Grid/Grid";
import Menu from "./Menu/Menu";
import AlgorithmCompletionMessage from "./AlgorithmCompletionMessage/AlgorithmCompletionMessage";

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
      grid: [],
      running: false,
      animationComplete: false
    };

    this.nodeToPlace = NODES.WALL_NODE;
    this.startNode = null;
    this.endNode = null;
    this.mouseDown = false;
    this.algorithm = null;
    this.tableElement = null;
    this.results = [];
    this.elapsedTime = 0;
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
    this.setState({ animationComplete: false });
  };

  clearPath = () => {
    clearGridPath(this.state.grid);
    const rows = document.getElementById("tableBody").children;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].children;
      for (let j = 0; j < row.length; j++) {
        if (
          row[j].className !== "start" &&
          row[j].className !== "end" &&
          row[j].className !== "wall"
        ) {
          row[j].className = "unvisited";
        }
      }
    }
    this.setState({ animationComplete: false });
  };

  animateAlgo = () => {
    let i = 1;
    let timeout = 10;
    const end = this.tableElement.querySelector(
      `#node_${this.endNode.row}_${this.endNode.col}`
    );
    this.results.visited.forEach(node => {
      const cell = this.tableElement.querySelector(
        `#node_${node.row}_${node.col}`
      );
      if (cell === end) {
        setTimeout(() => {
          this.animateSPNodes(timeout);
        }, timeout * i);
      }

      if (cell.className !== "start" && cell.className !== "end") {
        setTimeout(() => {
          cell.className = "visited";
        }, timeout * i);
        i++;
      }
    });
    setTimeout(() => {
      this.setState({ animationComplete: true });
    }, timeout * i);
  };

  animateSPNodes = timeout => {
    let j = 1;
    this.results.sp.forEach(node => {
      const cell = this.tableElement.querySelector(
        `#node_${node.row}_${node.col}`
      );

      if (cell.className !== "start" && cell.className !== "end") {
        setTimeout(() => {
          cell.className = "shortestPath";
        }, timeout * 3 * j);
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

        const start = new Date().getTime();
        this.results = algoInstance.run();
        const end = new Date().getTime();
        this.elapsedTime = end - start;

        this.animateAlgo();
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
            clearPath={this.clearPath}
            updateAlgo={algoName => {
              this.algorithm = algoName;
            }}></Menu>
        </div>
        <AlgorithmCompletionMessage
          display={this.state.animationComplete}
          results={this.results}
          elapsedTime={this.elapsedTime}
          algorithm={this.algorithm}
        />
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

const clearGridPath = grid => {
  for (let row = 0; row < 17; row++) {
    for (let col = 0; col < 70; col++) {
      const node = {
        row: row,
        col: col,
        cost: Infinity,
        path: null,
        isWall: false
      };

      if (grid[row][col].isWall) {
        node.isWall = true;
      }

      grid[row][col] = node;
    }
  }
};
