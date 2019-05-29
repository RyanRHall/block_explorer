// libraries
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

class NavButtons extends React.Component {

  /***************** Render ******************/

  render() {
    return(
      <div id="nav-button-container">
        <Link to="/"><div><FaHome /></div></Link>
      </div>
    );
  }
}

export default withRouter(NavButtons);
