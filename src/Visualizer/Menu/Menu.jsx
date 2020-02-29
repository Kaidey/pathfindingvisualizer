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
        <button type="button" onClick={() => this.props.runAlgo()}>
          Run
        </button>
        <button type="button" onClick={() => this.props.clearBoard()}>
          Clear Board
        </button>
        <select
          id="algos"
          value={undefined}
          onChange={event => this.props.updateAlgo(event.target.value)}>
          <option hidden>Choose an Algorithm</option>
          <option value="Dijkstra">Dijkstra</option>
        </select>
      </div>
    );
  }
}
