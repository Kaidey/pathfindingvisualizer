import React from "react";
import "./Menu.css";

const Menu = props => {
  return (
    <nav id="navbar">
      <ul id="navbar-list">
        <li className="dropdown-menu-item">
          Algorithms
          <AlgosDropdown updateAlgo={props.updateAlgo}></AlgosDropdown>
        </li>
        <li className="dropdown-menu-item">
          Nodes
          <NodesDropdown
            nodes={props.nodes}
            selectNode={props.selectNode}
            updateAlgo={props.updateAlgo}></NodesDropdown>
        </li>
        <li className="dropdown-menu-item" onClick={() => props.runAlgo()}>
          Run
        </li>
        <li className="dropdown-menu-item" onClick={() => props.clearBoard()}>
          Clear Board
        </li>
        {/* <li className="dropdown-menu-item" onClick={() => props.clearPath()}>
          Clear Path
        </li> */}
      </ul>
    </nav>
  );
};

export default Menu;

const AlgosDropdown = props => {
  return (
    <ul className="dropdown-menu">
      <li onClick={props.updateAlgo("Dijkstra")}>Dijkstra</li>
      <li onClick={props.updateAlgo("AStar")}>A*</li>
    </ul>
  );
};

const NodesDropdown = props => {
  return (
    <ul className="dropdown-menu">
      <li value="Wall" onClick={() => props.selectNode(props.nodes.WALL_NODE)}>
        Wall
      </li>
      <li
        value="Start"
        onClick={() => props.selectNode(props.nodes.START_NODE)}>
        Start
      </li>
      <li value="End" onClick={() => props.selectNode(props.nodes.END_NODE)}>
        End
      </li>
    </ul>
  );
};
