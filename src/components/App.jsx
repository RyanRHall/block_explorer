// libraries
import React from "react";
// app files
import BlockAge from "./BlockAge";
import BlockDifficulty from "./BlockDifficulty";
import GasPrice from "./GasPrice";
import BlockList from "./BlockList";
import { withWeb3Access } from "@src/context/web3";

class App extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      latestBlock: {
        number: null,
        difficulty: null
      }
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._fetchLatestBlock();
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  /************* Private Methods *************/

  async _fetchLatestBlock() {
    const lastestBlock = await this.props.web3.eth.getBlock("latest");
    this.setState({ latestBlock: lastestBlock });
  }

  _subscribe() {
    this.subscription = this.props.web3.eth.subscribe("newBlockHeaders");
    this.subscription.on("data", this._fetchLatestBlock.bind(this));
  }

  _unsubscribe() {
    this.subscription.unsubscribe();
  }

  /***************** Render ******************/

  render() {
    return(
      <div>
        <BlockAge block={this.state.latestBlock}/>
        <BlockDifficulty block={this.state.latestBlock}/>
        <GasPrice block={this.state.latestBlock}/>
        {/*<BlockList startingNumber={this.state.latestBlock.number}/>*/}
      </div>
    )

  }
}

export default withWeb3Access(App);
