import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title:{
    textAlign: 'center',
    display:'block'
}
}));

function Navigation() {
  const classes = useStyles();

  return (
  <div className = {classes.root}>
   <AppBar position="static" style={{backgroundColor: '#333333'}}>
      <Toolbar className = {classes.title}>
        <Typography variant="h4" color="inherit" style={{align:"center"}}>
          Breast Tissue Clinical Study
        </Typography>
      </Toolbar>
   </AppBar>
  </div>
  );
}

export default withRouter(Navigation);
