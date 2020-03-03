import React from "react";
import "./AlgorithmCompletionMessage.css";

const AlgorithmCompletionMessage = props => {
  const pathExistsMessage = `The ${props.algorithm} algorithm took ${props.elapsedTime}ms to finish!
  Visited ${props.results.visited.length} nodes and the best path length
  is ${props.results.sp.length} nodes!`;

  const pathNotFoundMessage =
    "There is no path from the start node to the end node!";

  return (
    <div>
      {props.display ? (
        <p id="message">
          {props.pathExists ? pathExistsMessage : pathNotFoundMessage}
        </p>
      ) : null}
    </div>
  );
};

export default AlgorithmCompletionMessage;
