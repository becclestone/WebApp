import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Home.css';

function Home() {
  return (
<div class="container">
  <div class="vertical-center">
    <p>
    <a href="/.auth/login/aad?post_login_redirect_uri=https://gray-dune-0f8914010.azurestaticapps.net/viewer">Login</a>
          <p>Try to open this <a href="viewer">View OpenSeaDragon</a> </p>
    </p>
  </div>
</div

  );
}

export default Home;
