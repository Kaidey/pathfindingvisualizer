import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Grid.css";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  cellClickHandler(event) {
    const tableNode = ReactDOM.findDOMNode(this);
    const clickedCellID = event.target.id;
    const cell = tableNode.querySelector(`#${clickedCellID}`);

    cell.className = this.props.nodeToPlace;
  }

  getInitialGrid() {
    const grid = [];

    for (let row = 0; row < 17; row++) {
      const currentRow = [];
      for (let col = 0; col < 70; col++) {
        currentRow.push(0);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  render() {
    const grid = this.state.grid;
    return (
      <>
        <table id="grid">
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr id={`row_${rowIdx}`}>
                  {row.map((cell, cellIdx) => {
                    return (
                      <td
                        id={`node_${rowIdx}_${cellIdx}`}
                        className="unvisited"
                        onClick={event => this.cellClickHandler(event)}></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
