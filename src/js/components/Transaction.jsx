// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";

class Transaction extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      transaction: {}
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchTransactionData();
  }

  /************* Private Methods *************/

  async _fetchTransactionData() {
    const txHash = this.props.match.params.txHash;
    const transaction = await this.props.web3.eth.getTransaction(txHash);
    this.setState({
      isLoading: false,
      transaction
    });
  }

  /***************** Render ******************/

  _renderLoading() {
    return(
      <div></div>
    );
  }

  _renderLoaded() {
    const tx = this.state.transaction;
    return(
      <div>
        <h1>Transaction Details</h1>
        <div className="transaction-details-container">
          <div>Hash:</div>
          <div>{tx.hash}</div>
          <div>Block Number:</div>
          <div>{tx.blockNumber}</div>
          <div>From:</div>
          <div>{tx.from}</div>
          <div>To:</div>
          <div>{tx.to}</div>
          <div>Amount:</div>
          <div>{tx.value} Wei</div>
        </div>
      </div>

    );
  }

  render() {
    return this.state.isLoading ? this._renderLoading() : this._renderLoaded();
  }
}

export default withWeb3Access(Transaction);
