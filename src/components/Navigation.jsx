
import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="nav navbar-nav navbar-center">
          <h2>Breast Tissue Clinical Study</h2>
          </ul>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
