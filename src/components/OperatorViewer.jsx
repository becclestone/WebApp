/*
Image list format was modified slightly from an online tutorial found here: https://medium.com/wesionary-team/getting-started-with-openseadragon-in-react-9461ec3bf841
Page layout with header bar and drawer came from free template from Material-UI: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
*/
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemText, ListSubheader, Typography, Divider, IconButton, Container, Grid, Paper, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PhotoIcon from '@material-ui/icons/Photo';
import { OperatorOSDViewer } from './OperatorOSDViewer'
import {useStyles} from './OperatorViewerStyle.js';
import './App.css';

export default function OperatorViewer() {

	const [images, setImages] = useState([]);
	const [manifest, setManifest] = useState();
	const [title, setTitle] = useState();
	const [open, setOpen] = useState(true);

	useEffect(() => {
	  setUserInfo();
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

	const handleDrawerOpen = () => {
	  setOpen(true);
	};

	const handleDrawerClose = () => {
	  setOpen(false);
	};

	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, open && classes.paperShift);

	return (
		<div className={classes.root}>
	    		<CssBaseline />
	    		<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
	      			<Toolbar className={classes.toolbar}>
					<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
		  			className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
						<MenuIcon />
					</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="left">
		  				<b>PARS Histology Imaging</b>
						</Typography>
						<Typography>
		  				User:{' '}<b><span id="user"></span> </b>
		  				<span id='consolelog'></span>
						</Typography>
	      			</Toolbar>
	    		</AppBar>
	    		<Drawer variant="permanent" classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}} open={open}>
	      			<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
		  			<ChevronLeftIcon />
					</IconButton>
	      			</div>
	      			<List>
					<div>
					{images.map((group, index) => {
						return (
					      		<div style={{ display:"flex", flexDirection:'column'}}>
		      					<Divider />
							<ListSubheader> {group.name} </ListSubheader>
								{group.slides.map((slide, index) => {
			  						return (
			    							//<ListItem button key={index} onClick={() => {
											//return previewImage(slide);}}>
			      							//<ListItemIcon>
										//<PhotoIcon />
			      							//</ListItemIcon>
										<ListItem button key={index} onClick={() => {
											return previewImage(slide);}}>
			      							<ListItemText disableTypography primary={slide.name} />
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
									<p></p>
		     							Image: <b>{title}</b>
		      							<p></p>
		   							</Typography>
		  							<OperatorOSDViewer image={manifest} />
									<Typography align="left">
									Hold the <b>[SHIFT]</b> key while clicking and dragging the mouse to create a new annotation.
									<p></p>
		      							</Typography>
		      							<Typography align="left">
									To colour the annotation, add one of following colours in the first TAG as shown: <font color="red">RED</font>, <font color="darkorange">ORANGE</font>, <font color="gold">YELLOW</font>, 
			  						<font color="green"> GREEN</font>, <font color="blue">BLUE</font>, <font color="indigo">PURPLE</font>, <font color="deeppink">PINK</font>, BLACK
		    							</Typography>
		    						</Paper>
		    					</Grid>
		    				</Grid>
		     			</Container>
	    		</main>
	  			</div>
);
}
