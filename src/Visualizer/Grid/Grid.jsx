import React from "react";
import "./Grid.css";

const Grid = (props) => {
	const grid = props.grid;
	return (
		<>
			<table id="grid" onMouseLeave={props.setMouseDownFalse}>
				<tbody id="tableBody">
					{grid.map((row, rowIdx) => {
						return (
							<tr key={rowIdx} id={`row_${rowIdx}`}>
								{row.map((cell, colIdx) => {
									return (
										<td
											key={colIdx}
											id={`node_${rowIdx}_${colIdx}`}
											className="unvisited"
											onMouseDown={(event) => {
												props.mouseEventHandler(event);
												props.setMouseDownTrue();
											}}
											onMouseUp={() => {
												props.setMouseDownFalse();
											}}
											onMouseOver={(event) => {
												if (props.mouseDown) {
													props.mouseEventHandler(event);
												}
											}}
										></td>
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
