import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  return (
    <div className="home">
       <a href="/.auth/login/aad?post_login_redirect_uri=https://jolly-dune-0aa7eb110.azurestaticapps.net/viewer">Login</a>
    </div>
  );
}

export default Home;
