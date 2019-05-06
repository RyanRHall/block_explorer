// libraries
import React from "react";

const BlockDifficulty = props => (
  <div className="metric-container">
      <span>Block Difficulty:</span>
      <span>{props.latestBlock.difficulty}</span>
  </div>
);

export default BlockDifficulty;
