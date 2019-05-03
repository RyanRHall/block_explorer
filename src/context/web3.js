import React from "react";

export const Web3Context = React.createContext();

// hoc giving child access to web3 prop
export const withWeb3Access = Component => props => (
  <Web3Context.Consumer>
      {web3Context => <Component {...props} web3={web3Context} />}
  </Web3Context.Consumer>
);
