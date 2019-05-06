// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";
import { BlockLink, TransactionLink } from "@src/js/helpers/links";
import { hexShortner } from "@src/js/helpers/viewHelpers";

class BlockListItem extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      block: {}
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchBlockData();
  }

  /************* Private Methods *************/

  async _fetchBlockData() {
    let block;
    // might have to try several times to fetch block
    while(!block) {
      block = await this.props.web3.eth.getBlock(this.props.blockNumber);
      if(block) {
        return this.setState({
          isLoaded: true,
          block
        });
      }
    }
  }

  /***************** Render ******************/

  _renderTransactions() {
    return this.state.block.transactions.map(tx => (
      <TransactionLink key={tx} hash={tx} >
        <div className="transaction-link-icon" />
      </TransactionLink>
    ));
  }

  _renderLoading() {
    return(
      <div className="block-list-item"></div>
    );
  }

  _renderLoaded() {
    const block = this.state.block;
    return (
      <div className="block-list-item">
        <div><BlockLink number={block.number}/></div>
        <div>Hash:</div>    <div><BlockLink number={block.number}>{hexShortner(block.hash)}</BlockLink></div>
        <div>Nonce:</div>   <div>{hexShortner(block.nonce)}</div>
        <div>Txs:</div>     <div>{block.transactions.length}</div>

        <div>{this._renderTransactions()}</div>
      </div>
    );
  }

  render() {
    return this.state.isLoaded ? this._renderLoaded() : this._renderLoading();
  }
}

export default withWeb3Access(BlockListItem);
