// libraries
import React from "react";
// app files
import { range } from "lodash";
import BlockListItem from "./BlockListItem";
// styles
require("@src/styles/block_list");

class BlockList extends React.Component {

  /***************** Render ******************/

  _renderBlockListItems() {
    const start = parseInt(this.props.match.params.blockNumber) || this.props.latestBlock.number;
    return range(start, start - 4, -1).map(blockNumer => (
      <BlockListItem blockNumber={blockNumer} key={blockNumer} />
    ));
  }

  render() {
    return(
      <div>
        <h1>Block Explorer</h1>
        <div id="block-list-container">
          {this._renderBlockListItems()}
        </div>
      </div>
    )
  }
}

export default BlockList;
