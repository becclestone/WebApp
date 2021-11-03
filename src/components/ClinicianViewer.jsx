/*
Questions set-up code was modified from an online tutorialfound here: https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
Radio button set-up with error message was modified from the Show Error example from Material-UI open source website: https://material-ui.com/components/radio-buttons/
Page layout with header bar and drawer came from free template from Material-UI: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
*/
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, IconButton, Container, Grid, Paper } from '@material-ui/core';
import { FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ClinicianOSDViewer } from './ClinicianOSDViewer'
import {useStyles} from './ClinicianViewerStyle.js';
import './Questions.css';
import './App.css';
import clsx from 'clsx';

export default function ClinicianViewer() {
	
	const [images, setImages] = useState([]);
	const [manifest, setManifest] = useState();
	const [imageId, setImageId] = useState();
	const [index, setIndex]= useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questions, setQuestions] = useState();
	const [open, setOpen] = useState(true);
	const [showStart, setShowStart] = useState(true);
	const [showQuestions, setShowQuestions] = useState(false);
	const [showNext, setShowNext] = useState(false);	
	const [showEnd, setShowEnd] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState();
	const [value, setValue] = useState();
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState('');
	const [displayIndex, setDisplayIndex] = useState(1);
	const [title, setTitle] = useState();
	const classes = useStyles();
	const theme = useTheme();

	setUserInfo();

	useEffect(() => {
	getIndex();
	getImages();
	}, []);

	useEffect(() => {
	getQuestions();
	}, []);

	const getQuestions = () => {
	console.log('imageindex', index)
	console.log('currQues', currentQuestion)
	fetch("/api/questions", {
		    method: 'GET',
		    credentials: 'include',
		    headers: {'Access-Control-Allow-Credentials': 'true'}})
	.then((response) => response.json())
	.then(
	       (result) => {
		    let questionsList = result;
		    if (questionsList) {
			console.log('questions', questionsList)
			setQuestions(questionsList);
			console.log('setFetchQuestions', questions)
		    }
	       },
	       (error) => {
		       console.log(error)
	       }
	       )
	  }

	const getIndex = async () => {
	    console.log('geting index')
	    const response = await fetch("/api/progress", {
				method: 'GET',
				credentials: 'include',
				headers: {'Access-Control-Allow-Credentials': 'true'}});
	    let indices = await response.json();
	    console.log('fetchindices', indices)
	    //setIndex(indices[0].imageIndex);
		setIndex(0);
	    //setCurrentQuestion(indices[0].questionIndex);
		setCurrentQuestion(0);
	};
	
	const getImages = async () => {
	const response = await fetch("/api/profile", {
			      method: 'GET',
			      credentials: 'include',
			      headers: {'Access-Control-Allow-Credentials': 'true'}}); 
	let image = await response.json();
	console.log('image', image)
	console.log('groups', image.groups)
	console.log('slides', image.groups[0].slides)
	setImages(image.groups[0].slides)
	};

	const saveIndex = (imageIndex, questionIndex) => {
	let indexObj = [{ imageIndex :imageIndex, 
		     questionIndex: questionIndex}];
	if (!indexObj)
	return;
	var json = JSON.stringify(indexObj); 
	console.log('json', json);
	fetch("/api/progress", { 
	  method: 'POST',
	  credentials: 'include',
	  headers: {'Access-Control-Allow-Credentials': 'true',
		    'Content-Type': 'application/json'},
	  body: json } )
	.then((response) => response.json())
	.then(
	    (result) => {
	      console.log(result);
	    },
	    // Note: it's important to handle errors here
	    // instead of a catch() block so that we don't swallow
	    // exceptions from actual bugs in components.
	    (error) => {
	      console.log(error);
	    }
	  )
	}
	
	const saveRemoteAnswers =  (answerObj) => {
	console.log("saving");
	var answer = [{answerObj}];
	var json = JSON.stringify(answer); 
	console.log('answerjson', json);
	var encodedId = btoa(imageId);

	fetch("/api/answers/" + encodedId + currentQuestion, { 
	  method: 'POST',
	  credentials: 'include',
	  headers: {'Access-Control-Allow-Credentials': 'true',
		    'Content-Type': 'application/json'},
	  body: json } )
	.then((response) => response.json())
	.then(
	    (result) => {
	      console.log(result);
	    },
	    // Note: it's important to handle errors here
	    // instead of a catch() block so that we don't swallow
	    // exceptions from actual bugs in components.
	    (error) => {
	      console.log(error);
	    }
	  )
	}

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
	  console.log('setQuestions', questions)
	};
	const handleDrawerClose = () => {
	setOpen(false);
	};

	const handleStart = () => {
	  console.log("handleStart");
	  if (index >= images.length) {
		setShowStart(false);
		setShowEnd(true);
	  }
	  else {
		  console.log('imgaeindex', index)
		  console.log('currQues', currentQuestion)
		  setImageId(images[index].slide.source.Image.Url);
		  setTitle(images[index].name);
		  setShowStart(false);
		  setShowQuestions(true);
		  setManifest(images[index].slide);
		  getQuestions();
		  setDisplayIndex(index+1);
	  }
	};

	const handleNext = () => {
	  if (index < images.length) {
		  console.log('index', index)
		  setManifest(images[index].slide);
		  setImageId(images[index].slide.source.Image.Url);
		  setTitle(images[index].name);
		  setShowNext(false);
		  setShowQuestions(true);
	  } else {
		  setShowQuestions(false);
		  setShowEnd(true);
		  setShowNext(false);
	  }
	};

	const handleAnswerOptionClick = (event) => {
	console.log("handleAnswerOptionClick");
	let answerObj = {
	imageTitle: title,
	questionsText: questions[index].QuestionJson[currentQuestion].questionText,
	answersText: event.target.value
	}
	setValue(answerObj.answersText);
	setSelectedAnswer(answerObj);
	};

	const handleSubmit = (event) => {
	event.preventDefault();
	const nextQuestion = currentQuestion + 1;
	if (value == null) {
	  setHelperText('Please select an answer.');
	  setError(true);
	} else {
	  setHelperText('');
	  setError(false);
	  saveRemoteAnswers(selectedAnswer);
	  setValue(null);
	  if (nextQuestion < questions[index].QuestionJson.length) {
	    setCurrentQuestion(nextQuestion);
	    saveIndex(index, currentQuestion+1);
	  } else {
	    setManifest(null);
	    console.log('new image',index);
	    setShowQuestions(false);
	    setShowNext(true);
	    saveIndex(index+1, 0);
	    setIndex(index+1);
	    console.log(displayIndex);
	    if (index < images.length-1) {
		setDisplayIndex(displayIndex+1);
	    }
	    setCurrentQuestion(0);
	  }
	}
	};

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, open && classes.paperShift);
	
	return (
	<div className = {classes.root}>
	<CssBaseline />
	<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
		<Toolbar className={classes.toolbar}>
	   		<Typography variant="h6" noWrap className={classes.title} align="left">
	    		<b>PARS Histology Imaging</b>
	  		</Typography>
	  		<Typography>
	    		User:{' '}<b><span id="user"></span> </b>
	    		<span id='consolelog'></span>
	    		</Typography>
	  			<IconButton edge="end" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
	    			className={clsx(open && classes.hide)}>
	    			<MenuIcon />
	  			</IconButton>
		</Toolbar>
	</AppBar>
	<main className={classes.content}>
		<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3} alignItems="center">
					<Grid item xs={12} md={12} lg={12}>
						<Paper className={fixedHeightPaper}>
							<Typography variant="h6" align="left">
				 			<p></p> <b>Image {displayIndex}/{images.length}</b>  <p></p>
							</Typography>
		     					<ClinicianOSDViewer image={manifest} />
		   				</Paper>
		 			</Grid>
	       			</Grid>
	     		</Container>
	</main>
	<Drawer className={classes.drawer} variant="persistent" anchor="right" classes={{paper: classes.drawerPaper}} open={open}>
		<div className={classes.drawerHeader}>
	  		<IconButton onClick={handleDrawerClose}>
	    			{theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
	  		</IconButton>
		</div>
		<List>
			<div className='app'>
				{showNext == true &&
			 		<div className='question-section'>
			 			<Button variant="contained" color="primary" className={classes.button} onClick={handleNext}>Next Image</Button>
				</div>}
				{showQuestions == true &&
					<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Image {index+1}</span>/{images.length}
						</div>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions[index].QuestionJson.length}
						</div>
					</div>
					<div className="answer-section">
						<form onSubmit={handleSubmit}>
							<FormControl component="fieldset" error={error}>
								<FormLabel component="legend">{questions[index].QuestionJson[currentQuestion].questionText}</FormLabel>
									<RadioGroup style={{width:'290px', paddingLeft:'5px'}} aria-label="quiz" name={index} value={value} onChange={handleAnswerOptionClick}>
						 			{questions[index].QuestionJson[currentQuestion].answerOptions.map((answerOption) => (
										<FormControlLabel value={answerOption.answerText} control={<Radio color="primary"/>} label={answerOption.answerText} />
						 			))}
					       				</RadioGroup>
								<FormHelperText>{helperText}</FormHelperText>
									<Button style={{width:'299px'}} type="submit" variant="contained" color="primary" className={classes.button}>Submit Answer</Button>
					    		</FormControl>
					    	</form>

					</div>
					</>}
				{showStart == true &&
					<div className='question-section'>
						<Button variant="contained" color="primary" className={classes.button} onClick={handleStart}>Start</Button>
					</div>}
			 	{showEnd == true &&
				 	<div className='question-section'>
					 	<Typography variant="h6">
					 	<b>END</b>
					 	<p>Your answers have been saved.</p>
					 	<p>Please close your browser window.</p>
					 	</Typography>
				 	</div>}
			</div>	  
		</List>
	</Drawer>
	</div>
);
}
