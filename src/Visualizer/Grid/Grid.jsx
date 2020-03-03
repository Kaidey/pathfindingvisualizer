import React from "react";
import "./Grid.css";

const Grid = props => {
  const grid = props.grid;
  return (
    <>
      <table id="grid" onMouseLeave={props.setMouseDownFalse}>
        <tbody id="tableBody">
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
                        props.mouseEventHandler(event);
                        props.setMouseDownTrue();
                      }}
                      onMouseUp={props.setMouseDownFalse}
                      onMouseOver={event => {
                        if (props.mouseDown) {
                          props.mouseEventHandler(event);
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
};

export default Grid;
