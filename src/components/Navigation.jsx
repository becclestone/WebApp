
import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
        <div style={{display: 'flex', alignItems:'center', color:'white'}}>
          <h1>Breast Tissue Clinical Study</h1>
        </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
