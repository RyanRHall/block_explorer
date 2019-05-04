// libraries
import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Main } from "@aragon/ui";
// app files
import BlockAge from "./BlockAge";
import BlockDifficulty from "./BlockDifficulty";
import GasPrice from "./GasPrice";
import BlockList from "./BlockList";
import Transaction from "./Transaction";
import { withWeb3Access } from "@src/context/web3";

class App extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      latestBlock: null,
      loading: true
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
      loading: false
    });
  }

  _subscribe() {
    this.subscription = this.props.web3.eth.subscribe("newBlockHeaders");
    this.subscription.on("data", this._fetchLatestBlock.bind(this));
  }

  _unsubscribe() {
    this.subscription.unsubscribe();
  }

  /***************** Render ******************/

  _renderLoading() {
    return (
      <div></div>
    );
  }

  _renderApp() {
    return (
      <Main>
        <BlockAge latestBlock={this.state.latestBlock}/>
        <BlockDifficulty latestBlock={this.state.latestBlock}/>
        <GasPrice latestBlock={this.state.latestBlock}/>
        <Switch>
          <Route path="/" exact render={(props) => <BlockList {...props} latestBlock={this.state.latestBlock} />} />
          <Route path="/block/" component={BlockList} />
          <Route path="/transaction/" component={Transaction} />
        </Switch>
      </Main>
    );
  }

  render() {
    return this.state.loading ? this._renderLoading() : this._renderApp();
  }
}

export default withWeb3Access(App);
