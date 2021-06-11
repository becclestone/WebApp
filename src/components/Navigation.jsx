
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

function Navigation() {
  return (
   <AppBar position="static" colo="primary">
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="h6" color="inherit" align="center">
          Breast Tissue Clinical Study
        </Typography>
      </Toolbar>
    </Container>
   </AppBar>
  );
}

export default withRouter(Navigation);
