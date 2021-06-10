
import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="nav navbar-nav navbar-center">
          <li><a href="#">Breast Tissue Clinical Study</a></li>
          </ul>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
