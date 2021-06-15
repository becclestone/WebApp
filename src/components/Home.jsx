import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Home.css';
import { Button, Box } from "@material-ui/core";
import logo from './login.png';

function Home() {
  return (
    <Box pt={4}>
    <div class ="container">
    <div class="center">
      <p> [INSERT TEXT HERE] </p>
      <p></p>
      <p><b>Please Login to Microsoft Azure Account Below:</b></p>
      <p></p>
      <img className="photo" src={logo} />
        <p> </p>
        <p>
    <Button variant="contained" href="/.auth/login/aad?post_login_redirect_uri=https://gray-dune-0f8914010.azurestaticapps.net/viewer">Login</Button>
          <p></p>
          <p>Try to open this <a href="viewer">View OpenSeaDragon</a></p>
            </p>
    </div>
    </div>
</Box>
  );
}

export default Home;
