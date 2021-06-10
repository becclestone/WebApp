
import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Breast Tissue Clinical Study
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
