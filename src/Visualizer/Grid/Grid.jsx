import React, { Component } from "react";

import "./Grid.css";

class Grid extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const grid = this.props.grid;
		return (
			<>
				<table id="grid" onMouseLeave={this.props.setMouseDownFalse}>
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
													if (!this.props.running) {
														this.props.mouseEventHandler(event);
														this.props.setMouseDownTrue();
													}
												}}
												onMouseUp={() => {
													this.props.setMouseDownFalse();
												}}
												onMouseOver={(event) => {
													if (this.props.mouseDown) {
														this.props.mouseEventHandler(event);
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
	}
}

export default Grid;
