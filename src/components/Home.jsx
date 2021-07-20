import React from "react";
import './Home.css';
import { Button, Grid, Paper } from "@material-ui/core";
import logo from './login.png';
import { ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    textAlign: 'center'
  },
  fixedHeight: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <ResponsiveContainer maxWidth="lg" className={classes.container}>
    <Grid container spacing={3} alignItems="center">
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={fixedHeightPaper}>
        <Typography align="center">
      <p> [INSERT TEXT HERE] </p>
      <p></p>
      <p><b>Please Login to Your Microsoft Azure Account Below:</b></p>
      <p></p>
      <img className="photo" src={logo} />
        <p> </p>
        <p>
    <Button variant="contained" href="/.auth/login/aad?post_login_redirect_uri=https://gray-dune-0f8914010.azurestaticapps.net/viewer">Login</Button>
          <p></p>
          <p>Try to open this <a href="viewer">View OpenSeaDragon</a></p>
            </p>
    </Typography>
    </Paper>
    </Grid>
    </Grid>
    </ResponsiveContainer>
  );
}

export default Home;
