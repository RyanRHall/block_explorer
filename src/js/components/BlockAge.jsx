// libraries
import React from "react";

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

  render() {
    return(
      `${this.state.age} s`
    )
  }
}

export default BlockHeight;
