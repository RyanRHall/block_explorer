// libraries
import { range, max, bindAll } from "lodash";
import React from "react";
import Masonry from "react-masonry-component";
// app files
import BlockListItem from "./BlockListItem";
import masonryConfig from "@src/js/config/masonryConfig"
// styles
require("@src/styles/block_list");



class BlockList extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props)
    bindAll(this, [ "_handleScroll" ])
    this.state = {
      startBlock: null,
      numBlocks: 20,
      loadable: true
    }
  }

  /************ Lifecycle Methods ************/

  static getDerivedStateFromProps(props, state) {
    const routeParamBlockNumber = parseInt(props.match.params.blockNumber);
    const startBlock = routeParamBlockNumber || props.latestBlock.number;
    // reset length to 20 blocks and scroll to top if navigating to new block
    let numBlocks = state.numBlocks;
    let loadable = true;
    if(routeParamBlockNumber && startBlock !== state.startBlock) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      numBlocks = 20;
      loadable = false;
    }
    return { startBlock, numBlocks, loadable }
  }

  componentDidMount() {
    window.addEventListener("scroll", this._handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._handleScroll)
  }

  /************* Private Methods *************/

  _blockNumbers() {
    const endBlock = max([ this.state.startBlock - this.state.numBlocks, -1 ]);
    return range(this.state.startBlock, endBlock, -1);
  }

  _handleScroll(event) {
    if(!this.state.loadable) return;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({
        loadable: false,
        numBlocks: this.state.numBlocks + 20
      })
    }
  }

  /***************** Render ******************/

  _renderBlockListItems() {
    return this._blockNumbers().map(blockNumber => (
      <BlockListItem key={blockNumber} blockNumber={blockNumber} />
    ));
  }

  render() {
    return(
      <div>
        <h1>Ethereum Block Explorer</h1>
        <Masonry options={masonryConfig} id="block-list-container" onLayoutComplete={this._handleLoaded} >
          {this._renderBlockListItems()}
        </Masonry>
      </div>
    )
  }
}

export default BlockList;
