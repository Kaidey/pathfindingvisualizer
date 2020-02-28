import React, { Component } from "react";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <button
          type="button"
          onClick={() => this.props.selectNode(this.props.nodes.WALL_NODE)}>
          Wall
        </button>
        <button
          type="button"
          onClick={() => this.props.selectNode(this.props.nodes.START_NODE)}>
          Start
        </button>
        <button
          type="button"
          onClick={() => this.props.selectNode(this.props.nodes.END_NODE)}>
          End
        </button>
      </div>
    );
  }
}
