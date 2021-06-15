
import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Home.css';
import { Button, Box } from "@material-ui/core";

function Doctor() {
  return (
    <Box pt={4}>
    <div class ="container">
    <div class="center">
      <p> [INSERT TEXT HERE] </p>
      <p> </p>
        <p>
    <Button variant="contained" href="/.auth/login/aad?post_login_redirect_uri=https://gray-dune-0f8914010.azurestaticapps.net/viewer">Doctor A</Button>
    </div>
    </div>
</Box>
  );
}

export default Doctor;
