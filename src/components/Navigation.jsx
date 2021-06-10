
import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'100vh', color:'white'}}>
          <h1>Breast Tissue Clinical Study</h1>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
