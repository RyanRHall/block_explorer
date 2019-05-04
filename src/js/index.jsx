// libraries
import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { BrowserRouter as Router } from 'react-router-dom';
// app files
import App from "./components/App";
import { Web3Context } from "@src/js/context/web3";

// setup web3 websocket
const ENDPOINT = "wss://mainnet.infura.io/ws";
const web3 = new Web3(new Web3.providers.WebsocketProvider(ENDPOINT));

// wrap app
const WrappedApp = (
  <Web3Context.Provider value={web3}>
    <Router>
      <App />
    </Router>
  </Web3Context.Provider>
);

// render app when dom loaded
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");
  ReactDOM.render(WrappedApp, container);
});
