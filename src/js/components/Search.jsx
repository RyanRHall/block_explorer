// libraries
import { bindAll } from "lodash";
import React from "react";
import { withRouter } from "react-router-dom";
// app files
import { withWeb3Access } from "@src/js/context/web3";
// styles
require("@src/styles/search");

class Search extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    bindAll(this, [ "_handleChange", "_handleSubmit", "_handleKeyDown" ])
    this.state = {
      value: ""
    };
  }

  /************* Private Methods *************/

  _handleKeyDown(event) {
    if (event.key === "Enter") {
      return this._handleSubmit();
    }
  }

  _handleChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  _handleSubmit() {
    if(!this.state.value) return;
    // look for block
    this.props.web3.eth.getBlock(this.state.value).then(block => {
      this.props.history.push(`/blocks/${block.number}`);
    }).catch(error => {
      // couldn't find block, look for transaction
      return this.props.web3.eth.getTransaction(this.state.value).then(tx => {
        this.props.history.push(`/transactions/${tx.hash}`);
      })
    }).catch(error => {
      // couldn't find transaction, look for address
      return this.props.web3.eth.getBalance(this.state.value).then(balance => {
        this.props.history.push(`/accounts/${this.state.value}`);
      })
    }).catch(error => {
      // couldn't find anything
      alert(`Couldn't find anything matching ${this.state.value}`);
    })
  }

  /***************** Render ******************/

  render() {
    return(
      <div id="search-container">
        <input
          value={this.state.value}
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
          placeholder="Block #, Transaction Hash, Address..."
        />
        <button onClick={this._handleSubmit}>Search</button>
      </div>
    );
  }
}

export default withRouter(withWeb3Access(Search));
