
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
    <Button variant="contained" href="viewer">Doctor A</Button>
    </p>
    </div>
    </div>
</Box>
  );
}

export default Doctor;
