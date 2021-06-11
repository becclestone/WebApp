
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/styles/MuiThemeProvider";

function Navigation() {
  return (
    <div>
      <MuiThemeProvider>
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
           showMenuIconButton={false}
       />
      </MuiThemeProvider>
    </div>
  );
}

export default withRouter(Navigation);
