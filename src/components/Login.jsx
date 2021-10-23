import React from "react";
import {useStyles} from './LoginStyle.js';
import { Button, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import logo from './login.png';
import { ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import logo2 from './illumisonics.png';

export default function Login() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <ResponsiveContainer maxWidth="lg" className={classes.container}>
    <Grid container spacing={3} alignItems="center">
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={fixedHeightPaper}>
        <Typography align="center">
      <img src={logo2} />
      <p> Clinical Validation Study </p>
      <p></p>
      <p><b>Please Login to Your Microsoft Azure Account Below:</b></p>
      <p></p>
      <p>
        <Button variant="contained" href="/.auth/login/aad?post_login_redirect_uri=https://www.parsmicroscopy.com/redirectpage">Login</Button>
      </p>
    </Typography>
    </Paper>
    </Grid>
    </Grid>
    </ResponsiveContainer>
  );
}
