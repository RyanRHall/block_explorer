// libraries
import React from "react";
// app files
import { withWeb3Access } from "@src/js/context/web3";

class GasPrice extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      gasPrice: 0
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchGasPrice();
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.latestBlock.number !== this.props.latestBlock.number) {
      this._fetchGasPrice();
    }
  }

  /************* Private Methods *************/

  async _fetchGasPrice() {
    const gasPrice = await this.props.web3.eth.getGasPrice();
    this.setState({ gasPrice });
  }

  /***************** Render ******************/

  render() {
    return(
      `${this.state.gasPrice} Wei`
    )
  }
}

export default withWeb3Access(GasPrice);
