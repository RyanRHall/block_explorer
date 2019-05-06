// libraries
import React from "react";
// styles
require("@src/styles/block_age");

class BlockHeight extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    this.state = {
      age: 0
    }
  }

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this._startTicker();
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.latestBlock.number !== this.props.latestBlock.number) {
      this._stopTicker();
      await this.setState({ age: 0 });
      this._startTicker();
    }
  }

  componentWillUnmount() {
    this._stopTicker();
  }

  /************* Private Methods *************/

  _startTicker() {
    this.intervalID = setInterval(() => {
      this.setState({ age: this.state.age + 1 });
    }, 1000);
  }

  _stopTicker() {
    clearInterval(this.intervalID);
  }

  /***************** Render ******************/

  _renderClassName() {
    if (this.state.age < 12) {
      return "time-green";
    } else if (this.state.age < 18) {
      return "time-yellow";
    } else {
      return "time-red";
    }
  }

  render() {
    return(
      <div className={`metric-container ${this._renderClassName()}`}>
          <span>Block Age:</span>
          <span>{`${this.state.age} s`}</span>
      </div>
    )
  }
}

export default BlockHeight;
