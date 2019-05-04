// libraries
import React from "react";

const BlockDifficulty = props => (
  <div className="metric-container">
    {props.latestBlock.difficulty}
  </div>
);

export default BlockDifficulty;
