// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/context/web3";

class BlockListItem extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      block: {
        transactions: []
      }
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchBlockData();
  }

  /************* Private Methods *************/

  async _fetchBlockData() {
    const block = await this.props.web3.eth.getBlock(this.props.blockNumber);
    this.setState({ block });
  }


  /***************** Render ******************/

  _renderTransactions() {
    return this.state.block.transactions.map(tx => (
      <div>
      </div>
    ));
  }

  render() {
    return(
      <div>
        {this.props.blockNumber}
        {this._renderTransactions()}
      </div>
    )
  }
}

export default withWeb3Access(BlockListItem);
