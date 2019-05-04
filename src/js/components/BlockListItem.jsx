// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";
import { BlockLink, TransactionLink } from "@src/js/helpers/links";
import { hashShortner } from "@src/js/helpers/viewHelpers";
// styles
require("@src/styles/block_list_item");

class BlockListItem extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    if(!block) return;// TODO
    this.setState({
      isLoading: false,
      block
    });
  }

  /***************** Render ******************/

  _renderTransactions() {
    return this.state.block.transactions.map(tx => (
      <TransactionLink key={tx} hash={tx}>
        <div className="transaction-link-icon" />
      </TransactionLink>
    ));
  }

  _renderLoading() {
    return(
      <div></div>
    );
  }

  _renderLoaded() {
    const block = this.state.block;
    return (
      <div className="block-list-item">
        <div>Number:</div>       <div><BlockLink number={block.number}/></div>
        <div>Hash:</div>         <div><BlockLink number={block.number}>{hashShortner(block.hash)}</BlockLink></div>
        <div>Nonce:</div>        <div>{block.nonce}</div>
        <div>Transactions:</div> <div>{block.transactions.length}</div>

        <div>{this._renderTransactions()}</div>
      </div>
    );
  }

  render() {
    return this.state.isLoading ? this._renderLoading() : this._renderLoaded();
  }
}

export default withWeb3Access(BlockListItem);
