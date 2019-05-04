// libraries
import React from "react";
// app files
import { range } from "lodash";
import BlockListItem from "./BlockListItem";

class BlockList extends React.Component {

  /***************** Render ******************/

  _renderBlockListItems() {
    const start = this.props.latestBlock.number;
    return range(start, start - 4, -1).map(blockNumer => (
      <BlockListItem blockNumber={blockNumer} key={blockNumer} />
    ))
  }

  render() {
    return(
      <div>
        {this._renderBlockListItems()}
      </div>
    )
  }
}

export default BlockList;
