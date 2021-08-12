import React, { useState, useEffect } from 'react';
import './App.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { OpenSeaDragonViewer } from './OpenSeaDragonViewer'
import PhotoIcon from '@material-ui/icons/Photo';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {useStyles} from './ViewerStyle.js';

export default function Viewer() {

  const [images, setImages] = useState([]);
    const [manifest, setManifest] = useState();
    const [title, setTitle] = useState();

    setUserInfo();

  useEffect(() => {
    getImages();
  }, []);
  const getImages = async () => {
    const response = await fetch("/api/profile", {
                              method: 'GET',
                              credentials: 'include',
                              headers: {'Access-Control-Allow-Credentials': 'true'}}); 
    let image = await response.json();
    console.log('image', image)
    setImages(image.groups)
  };
  const previewImage = async (slide) => {
    setManifest(slide.slide);
    setTitle(slide.name);
  };
    async function getUserInfo() {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
      }
      async function setUserInfo() {
        let  clientPrincipal =  await getUserInfo();
        document.getElementById("user").innerHTML = clientPrincipal.userDetails;
        console.log(clientPrincipal);
      }

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, open && classes.paperShift);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="left">
            <b>Brain Tissue Clinical Study</b>
          </Typography>
          <Typography>
            User:{' '}<b><span id="user"></span> </b>
            <span id='consolelog'></span>
            </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
<List>
       <div>
          {images.map((group, index) => {
              return (
                <div
                style={{
                  display:"flex",
                  flexDirection:'column'
                  }}
                >
                  <Divider />
                  <ListSubheader> {group.name} </ListSubheader>
                  {group.slides.map((slide, index) => {
                    return (
                      <ListItem button
                        key={index}
                        onClick={() => {
                          return previewImage(slide);
                        }}
                      >
                        <ListItemIcon>
                        <PhotoIcon />
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={slide.name} />
                      </ListItem>
                    );
                  })}
                </div>
              );
            })}
      </div>
</List>
      </Drawer>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
           <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Typography align="left">
                  Hold the <b>[SHIFT]</b> key while clicking and dragging the mouse to create a new annotation.
                  <p></p>
                </Typography>
                <Typography align="left">
                  To colour the annotation add one of following colours in first TAG as shown: <font color="red">RED</font>, <font color="darkorange">ORANGE</font>, <font color="gold">YELLOW</font>, 
                    <font color="green"> GREEN</font>, <font color="blue">BLUE</font>, <font color="indigo">PURPLE</font>, <font color="deeppink">PINK</font>, BLACK
                      <p></p>
              </Typography>
            <Typography align="left">
               Image: <b>{title}</b>
                <p></p>
             </Typography>
            <OpenSeaDragonViewer image={manifest} />
              </Paper>
              </Grid>
              </Grid>
               </Container>
      </main>
    </div>
);
}
