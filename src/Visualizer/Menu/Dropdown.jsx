import React, { Component } from "react";
import { render } from "react-dom";

class Dropdown extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var items = [];
		var i = 0;

		//Extract the numeric values from the enum passed as a prop in elements
		let elements = Object.values(this.props.elements);

		elements.forEach((val) => {
			items.push(
				//props.function is either selectNode or updateAlgo, depending on what kind of Dropdown Index is attempting to create
				//props.labels is a Map which takes a numeric value (enum value) and maps it to a displayable string description of what it represents in the enum
				<li key={i} onClick={() => this.props.function(val)}>
					{this.props.labels.get(val)}
				</li>
			);
			i++;
		});

		return <ul className="dropdown-menu">{items}</ul>;
	}
}

export default Dropdown;
