import React, { Component } from "react";
import Dropdown from "./Dropdown";

import "./Index.css";

class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav id="navbar">
				<ul id="navbar-list">
					<li className="dropdown-menu-item">
						Algorithms
						<Dropdown
							elements={this.props.algos}
							function={this.props.updateAlgo}
							labels={this.props.algoLabels}
						></Dropdown>
					</li>
					<li className="dropdown-menu-item">
						Nodes
						<Dropdown
							elements={this.props.nodes}
							function={this.props.selectNode}
							labels={this.props.nodeLabels}
						></Dropdown>
					</li>
					<li
						className="dropdown-menu-item"
						onClick={() => {
							if (!this.props.running) {
								this.props.runAlgo();
							}
						}}
					>
						Run
					</li>
					<li
						className="dropdown-menu-item"
						onClick={() => {
							if (!this.props.running) {
								this.props.clearBoard();
							}
						}}
					>
						Clear Board
					</li>
					<li
						className="dropdown-menu-item"
						onClick={() => {
							if (!this.props.running && !this.props.pathCleared) {
								this.props.clearPath();
							}
						}}
					>
						Clear Path
					</li>
					<li
						className="dropdown-menu-item"
						onClick={() => {
							if (!this.props.running) {
								if (!this.props.boardCleared) {
									this.props.clearBoard();
								}
								this.props.maze();
							}
						}}
					>
						Kruskal Maze
					</li>
				</ul>
			</nav>
		);
	}
}

export default Index;
