import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
}));

function Navigation() {
  const classes = useStyles();

  return (
  <div className = {classes.root}>
   <AppBar position="static" style={{backgroundColor: '#333333'}}>
      <Toolbar className = {classes.title}>
        <Typography variant="h4" color="inherit">
          Breast Tissue Clinical Study
        </Typography>
      </Toolbar>
   </AppBar>
  </div>
  );
}

export default withRouter(Navigation);
