import React, { Component } from "react";
import "./Grid.css";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const grid = this.props.grid;
    return (
      <>
        <table id="grid" onMouseLeave={this.props.setMouseDownFalse}>
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
                        onMouseDown={event => {
                          this.props.mouseEventHandler(event);
                          this.props.setMouseDownTrue();
                        }}
                        onMouseUp={this.props.setMouseDownFalse}
                        onMouseOver={event => {
                          if (this.props.mouseDown) {
                            this.props.mouseEventHandler(event);
                          }
                        }}></td>
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
