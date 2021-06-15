import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

const mystyle = {
//  display: 'flex',
//  align: 'center',
  textalign: 'center',
  backgroundColor: '#333333',
//  justifycontent: 'center',
//  alignself: 'center',
//  flexgrow: 1
};

function Navigation() {
  return (
  <div className = "headerBar">
   <AppBar position="static" centerTitle="true" style={mystyle}>
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
