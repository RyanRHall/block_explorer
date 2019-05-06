// libraries
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { FaUndoAlt, FaHome } from 'react-icons/fa';
// styles

class NavButtons extends React.Component {

  /************* Private Methods *************/

  _handleGoBack() {
    this.props.history.goBack();
  }

  /***************** Render ******************/

  render() {
    return(
      <div id="nav-button-container">
        <Link to="/"><div><FaHome /></div></Link>
        <div><FaUndoAlt onClick={this._handleGoBack.bind(this)}/></div>
      </div>
    );
  }
}

export default withRouter(NavButtons);
