// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";
import { BlockLink, AccountLink } from "@src/js/helpers/links";
// styles
require("@src/styles/details-container");

class Transaction extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
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
      isLoaded: true,
      transaction
    });
  }

  /***************** Render ******************/

  _renderLoaded() {
    const { hash, blockNumber, from, to, value } = this.state.transaction;
    return(
      <div>
        <h1>Transaction Details</h1>
        <div className="details-container">
          <div>Hash:</div>
          <div>{hash}</div>
          <div>Block Number:</div>
          <div><BlockLink number={blockNumber} /></div>
          <div>From:</div>
          <div><AccountLink address={from} /></div>
          <div>To:</div>
          <div><AccountLink address={to} /></div>
          <div>Amount:</div>
          <div>{value} Wei</div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.isLoaded ? this._renderLoaded() : null;
  }
}

export default withWeb3Access(Transaction);
