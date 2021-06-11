import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  return (
    <div className="home">
       <a href="/.auth/login/aad?post_login_redirect_uri=https://gray-dune-0f8914010.azurestaticapps.net/viewer">Login</a>
       <p></p>
       <a href="https://gray-dune-0f8914010.azurestaticapps.net/viewer">Try OpenSeaDragon Viewer</a>
    </div>
  );
}

export default Home;
