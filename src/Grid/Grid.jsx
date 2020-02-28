import React, { Component } from "react";
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
                <tr key={rowIdx} id={`row_${rowIdx}`}>
                  {row.map((cell, cellIdx) => {
                    return (
                      <td
                        key={cellIdx}
                        id={`node_${rowIdx}_${cellIdx}`}
                        className="unvisited"
                        onClick={event =>
                          this.props.cellClickHandler(event)
                        }></td>
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
