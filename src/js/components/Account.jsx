// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";
// styles
require("@src/styles/details-container");

class Account extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      account: {}
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchAccountData();
  }

  /************* Private Methods *************/

  async _fetchAccountData() {
    const address = this.props.match.params.address;
    const balance = await this.props.web3.eth.getBalance(address);
    this.setState({
      isLoaded: true,
      account: { address, balance }
    });
  }

  /***************** Render ******************/

  _renderLoaded() {
    const { balance, address } = this.state.account;
    return(
      <div>
        <h1>Account Details</h1>
        <div className="details-container">
          <div>Address:</div>
          <div className="mono">{address}</div>
          <div>Balance:</div>
          <div>{balance} Wei</div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.isLoaded ? this._renderLoaded() : null;
  }
}

export default withWeb3Access(Account);
