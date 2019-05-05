// libraries
import React from "react";
import Masonry from "react-masonry-component";
// app files
import { range } from "lodash";
import BlockListItem from "./BlockListItem";
import masonryConfig from "@src/js/config/masonryConfig"
// styles
require("@src/styles/block_list");

const NUM_BLOCKS = 20

class BlockList extends React.Component {

  /************* Private Methods *************/

  _startBlock() {
    return parseInt(this.props.match.params.blockNumber) || this.props.latestBlock.number;
  }

  /***************** Render ******************/

  _renderBlockListItems() {
    return range(this._startBlock(), this._startBlock() - NUM_BLOCKS, -1).map(blockNumber => (
      <BlockListItem key={blockNumber} blockNumber={blockNumber} />
    ));
  }

  render() {
    return(
      <div>
        <h1>Block Explorer</h1>
        <Masonry options={masonryConfig} id="block-list-container" onLayoutComplete={this._handleLoaded} >
          {this._renderBlockListItems()}
        </Masonry>
      </div>
    )
  }
}

export default BlockList;
