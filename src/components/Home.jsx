import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  return (
    <div className="home">
       <a href="/.auth/login/aad?post_login_redirect_uri=https://medimages.cloudbits.ca/osdimage.html">Login</a>
    </div>
  );
}

export default Home;
