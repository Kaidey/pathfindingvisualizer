import React from "react";
import "./AlgorithmCompletionMessage.css";

const AlgorithmCompletionMessage = props => {
  return (
    <div>
      {props.display ? (
        <p id="message">
          The {props.algorithm} algorithm took {props.elapsedTime}ms to finish!
          Visited {props.results.visited.length} nodes and the best path length
          is {props.results.sp.length} nodes
        </p>
      ) : null}
    </div>
  );
};

export default AlgorithmCompletionMessage;
