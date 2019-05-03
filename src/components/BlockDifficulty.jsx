// libraries
import React from "react";
import Websocket from "react-websocket";
// app files
import { withWeb3Access } from "@src/context/web3";

class BlockHeight extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      difficulty: "--"
    }
  }

  /************ Lifecycle Methods ************/

  async componentDidMount() {
    this._fetchBlockDifficulty();
  }

  /************* Private Methods *************/

  async _fetchBlockDifficulty() {
    const lastestBlock = await this.props.web3.eth.getBlock("latest");
    const latestBlockAge = this._timeDifference(lastestBlock.timestamp);
    await this.setState({ difficulty: latestBlockAge });
    this._startTicker();
  }

  _subscribe() {
    this.subscription = this.props.web3.eth.subscribe("newBlockHeaders");
    this.subscription.on("data", async newBlock => {
      // const latestBlockAge = this._timeDifference(newBlock.timestamp);
      this._stopTicker();
      await this.setState({ difficulty: 0 });
      this._startTicker();
    });
  }

  _unsubscribe() {
    this.subscription.unsubscribe();
  }

  /***************** Render ******************/

  render() {
    return(
      `${this.state.difficulty} TH`
    )

  }
}

export default withWeb3Access(BlockHeight);
