// libraries
import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
// app files
import { Main } from "@aragon/ui";
import App from "./components/App";
import { Web3Context } from "@src/context/web3";

// setup web3 websocket
const ENDPOINT = "wss://mainnet.infura.io/ws";
const web3 = new Web3(new Web3.providers.WebsocketProvider(ENDPOINT));

// render app when dom loaded
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Web3Context.Provider value={web3}>
      <Main>
        <App />
      </Main>
    </Web3Context.Provider>,
    document.getElementById("app")
  );
});
