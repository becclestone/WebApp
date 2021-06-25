import React, { useState, useEffect } from 'react';
import './App.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { OpenSeaDragonViewer } from './OpenSeaDragonViewer';
import styled from 'styled-components';
import PhotoIcon from '@material-ui/icons/Photo';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ResponsiveContainer } from 'recharts';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  },
  fixedHeight: {
    height: "75vh",
  },
}));

export default function Viewer() {
  
  const [images, setImages] = useState([]);
    const [manifest, setManifest] = useState();
    const [active, setActive] = useState();
    const [title, setTitle] = useState();
    
    setUserInfo();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch("/api/deepzoom/https://webappimages.blob.core.windows.net/dzi/pictures3.json", {
                              credentials: 'include',
                              // headers: {'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': 'https://gray-dune-0f8914010.azurestaticapps.net/viewer'}}); //api/deepzoom/pictures3.json""https://miradortest.z13.web.core.windows.net/pictures3.json
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

      const Button = styled.button`
        background-color: black;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
        border-radius: 0px;
        margin: 0px 0px;
        cursor: pointer;
        &:disabled {
          color: grey;
          opacity: 0.7;
          cursor: default;
        }
      `;

      const ButtonToggle = styled(Button)`
        opacity: 0.6;
        ${({ active }) =>
          active &&
          `
          opacity: 1;
        `}
      `;

  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Breast Tissue Clinical Study
          </Typography>
          <Typography align="right">
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
        <ResponsiveContainer maxWidth="lg" className={classes.container}>
           <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
            <Typography align="left">
               Image: <b>{title}</b>
                <p></p>
             </Typography>
            <OpenSeaDragonViewer image={manifest} />
              </Paper>
              </Grid>
              </Grid>
               </ResponsiveContainer>
      </main>
    </div>
);
}
