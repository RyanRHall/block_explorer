// libraries
import React from "react";
import { Route, Switch } from 'react-router-dom';
import { bindAll } from "lodash";
// app files
import BlockAge from "./BlockAge";
import BlockDifficulty from "./BlockDifficulty";
import GasPrice from "./GasPrice";
import BlockList from "./BlockList";
import Search from "./Search";
import Transaction from "./Transaction";
import Account from "./Account";
import { withWeb3Access } from "@src/js/context/web3";
// styles
require("@src/styles/app");
require("@src/styles/header");

class App extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    bindAll(this, [ "_fetchLatestBlock", "_renderBlockList" ])
    this.state = {
      latestBlock: null,
      isLoaded: false
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
    this.setState({
      latestBlock: lastestBlock,
      isLoaded: true
    });
  }

  _subscribe() {
    this.subscription = this.props.web3.eth.subscribe("newBlockHeaders");
    this.subscription.on("data", this._fetchLatestBlock);
  }

  _unsubscribe() {
    this.subscription.unsubscribe();
  }

  /***************** Render ******************/

  _renderBlockList(props) {
    return <BlockList {...props} latestBlock={this.state.latestBlock} />
  }

  _renderHeader() {
    return (
      <header>
        <Search />
        <div>
          <BlockAge latestBlock={this.state.latestBlock}/>
          <BlockDifficulty latestBlock={this.state.latestBlock}/>
          <GasPrice latestBlock={this.state.latestBlock}/>
        </div>
      </header>
    );
  }

  _renderMain() {
    return(
      <main>
        <Switch>
          <Route path="/" exact render={this._renderBlockList} />
          <Route path="/blocks/:blockNumber" render={this._renderBlockList} />
          <Route path="/transactions/:txHash" component={Transaction} />
          <Route path="/accounts/:address" component={Account} />
        </Switch>
      </main>
    );
  }

  _renderLoaded() {
    return (
      <div>
        {this._renderHeader()}
        {this._renderMain()}
      </div>
    );
  }

  render() {
    return this.state.isLoaded ? this._renderLoaded() : null;
  }
}

export default withWeb3Access(App);
