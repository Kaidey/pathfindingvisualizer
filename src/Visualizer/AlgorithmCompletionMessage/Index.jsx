import React, { Component } from "react";
import "./Index.css";

class AlgorithmCompletionMessage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const pathExistsMessage = `The ${this.props.algorithm} algorithm took ${this.props.elapsedTime}ms to finish!
  Visited ${this.props.results.visited.length} nodes and the best path length
  is ${this.props.results.sp.length} nodes!`;

		const pathNotFoundMessage =
			"There is no path from the start node to the end node!";

		return (
			<div>
				{this.props.display ? (
					<p id="message">
						{this.props.pathExists ? pathExistsMessage : pathNotFoundMessage}
					</p>
				) : null}
			</div>
		);
	}
}

export default AlgorithmCompletionMessage;
