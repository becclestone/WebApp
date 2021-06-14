import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Home.css';
import { Button, Box } from "@material-ui/core";

function Home() {
  return (
    <Box pt={3}>
    <div class ="container">
    <div class="center">
    <Button variant="contained" href="/.auth/login/aad?post_login_redirect_uri=https://gray-dune-0f8914010.azurestaticapps.net/viewer">Login</Button>
          <p>Try to open this <a href="viewer">View OpenSeaDragon</a></p>
    </div>
    </div>
</Box>
  );
}

export default Home;
