// libraries
import React from "react";
// app files
import BlockAge from "./BlockAge";
import { withWeb3Access } from "@src/context/web3";

class App extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      latestBlockNumber: null
    }
  }

  /************ Lifecycle Methods ************/

  async componentDidMount() {
    await this._fetchCurrentBlock();
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  /************* Private Methods *************/

  async _fetchCurrentBlock() {
    const lastestBlock = await this.props.web3.eth.getBlock("latest");
    await this.setState({ latestBlockNumber: lastestBlock.number });
  }

  _subscribe() {
    this.subscription = this.props.web3.eth.subscribe("newBlockHeaders");
    this.subscription.on("data", async newBlock => {
      this.setState({ latestBlockNumber: newBlock.number });
    });
  }

  _unsubscribe() {
    this.subscription.unsubscribe();
  }

  /***************** Render ******************/

  render() {
    return(
      <BlockAge latestBlockNumber={this.state.latestBlockNumber}/>
    )

  }
}

export default withWeb3Access(App);
