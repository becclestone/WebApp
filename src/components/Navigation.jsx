import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

function Navigation() {
  return (
  <div className = "headerBar">
   <AppBar position="static" centerTitle="true" style={{align: 'center'}}>
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="h4" color="inherit" style={{align:"center"}}>
          Breast Tissue Clinical Study
        </Typography>
      </Toolbar>
    </Container>
   </AppBar>
  </div>
  );
}

export default withRouter(Navigation);
