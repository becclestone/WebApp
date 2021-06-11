import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  return (
<style>
.container {
  height: 200px;
  position: relative;
  border: 3px solid green;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>

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
