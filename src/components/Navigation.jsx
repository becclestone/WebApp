
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

function Navigation() {
  return (
       <AppBar
          title="Breast Tissue Clinical Study" 
          position="static"   
          centerTitle="true" 
          style={
            {
            backgroundColor: '#333333'
            }
          }
           titleStyle = {
             {
               color:"#FFFFFF"
             }
           }
       />
  );
}

export default withRouter(Navigation);
