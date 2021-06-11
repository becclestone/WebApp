
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

function Navigation() {
  return (
   <AppBar position="static" centerTitle="true" style={{backgroundColor: '#333333'}}>
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="h4" color="inherit" align="center">
          Breast Tissue Clinical Study
        </Typography>
      </Toolbar>
    </Container>
   </AppBar>
  );
}

export default withRouter(Navigation);
