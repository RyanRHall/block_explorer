// libraries
import React from "react";
import { bindAll } from "lodash";
import Masonry from "react-masonry-component";
// app files
import { range, omitBy, every } from "lodash";
import BlockListItem from "./BlockListItem";
import masonryConfig from "@src/js/config/masonryConfig"
// import { withLoader } from "@src/js/helpers/Loader";
// styles
require("@src/styles/block_list");

const NUM_BLOCKS = 20

class BlockList extends React.Component {

  constructor(props) {
    super(props);
    // bindAll(this, [ "blockAdded", "blockLoaded", "blockRemoved" ])
    bindAll(this, [ "_handleLoaded"]);
    this.masonryContainer = React.createRef();
    this.state = {
      isLoaded: false,
      columnWidth: 350
    };
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._calculateColumnWidth();
  }

  /************** Public Methods *************/


  /************* Private Methods *************/

  _startBlock() {
    return parseInt(this.props.match.params.blockNumber) || this.props.latestBlock.number;
  }

  _calculateColumnWidth() {
    const containerWidth = this.masonryContainer.current.offsetWidth;
    const numColumns = Math.floor(containerWidth / 350);
    // const columnWidth = Math.floor(containerWidth / numColumns);
    // alert(columnWidth);
    const columnWidth = 410;
    this.setState({
      isLoaded: true,
      columnWidth
    })
  }

  // _blockNumbers() {
  //   return range(this._startBlock(), this._startBlock() - NUM_BLOCKS, -1);
  // }

  // _initialState() {
  //   return this._blockNumbers().reduce((accum, el) => { accum[el] = false; return accum }, {});
  // }

  // _isLoaded() {
  //   return every(this._blockNumbers(), blockNumber => this.state.blockStatuses[blockNumber]);
  // }

  _handleLoaded() {
    console.log("loaded");
  }

  /***************** Render ******************/

  _renderBlockListItems() {
    return range(this._startBlock(), this._startBlock() - NUM_BLOCKS, -1).map(blockNumber => (
      <BlockListItem
        blockNumber={blockNumber}
        key={blockNumber}
        blockLoaded={this.blockLoaded}
      />
    ));
  }

  _generateMasonryConfig() {
    return Object.assign(
      {},
      masonryConfig,
      { columnWidth: this.state.columnWidth }
    );
  }

  _renderLoading() {

  }

  _renderLoaded() {
    return(
      <Masonry
        options={this._generateMasonryConfig()}
        id="block-list-container"
        onLayoutComplete={this._handleLoaded}
      >
        {this._renderBlockListItems()}
      </Masonry>
    );
  }

  render() {
    debugger
    return(
      <div ref={this.masonryContainer}>
        <h1>Block Explorer</h1>
        {this.state.isLoaded ? this._renderLoaded() : null}
      </div>
    )
  }
}

export default BlockList;
