// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/context/web3";

class BlockList extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      startingNumber: null,
      blocks: []
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchBlocks();
  }

  /************* Private Methods *************/

  async _fetchBlocks() {
    const batch = new this.props.web3.BatchRequest();
    batch.add(this.props.web3.eth.getBlock.request(105));
    batch.add(this.props.web3.eth.getBlock.request(106));
    batch.execute().then(data => {

      debugger
    });
  }

  /***************** Render ******************/

  render() {
    return("yo")
  }
}

export default withWeb3Access(BlockList);
