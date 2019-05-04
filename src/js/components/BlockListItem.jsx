// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";
import { BlockLink, TransactionLink } from "@src/js/hoc/links";

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
    this.setState({
      isLoading: false,
      block
    });
  }

  /***************** Render ******************/

  _renderTransactions() {
    return this.state.block.transactions.map(tx => (
      <TransactionLink key={tx} hash={tx}>
        {"tx"}
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
      <div>
        <div>Number:</div>
        <div><BlockLink number={block.number} /></div>
        <div>Hash:</div>
        <div><BlockLink number={block.number}>{block.hash}</BlockLink></div>
        <div>Nonce:</div>
        <div>{block.nonce}</div>
        <div>Number of Transactions:</div>
        <div>{block.transactions.length}</div>
        {this._renderTransactions()}
      </div>
    );
  }

  render() {
    return this.state.isLoading ? this._renderLoading() : this._renderLoaded();
  }
}

export default withWeb3Access(BlockListItem);
