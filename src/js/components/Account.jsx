// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";

class Account extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
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
    const block = await this.props.web3.eth.getBalance(address);
    this.setState({ block });
  }

  /***************** Render ******************/

  render() {
    return("Account");
  }
}

export default withWeb3Access(Account);
