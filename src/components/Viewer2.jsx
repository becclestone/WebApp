import React, { useState, useEffect } from 'react';
import './App.css';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { OpenSeaDragonViewer2 } from './OpenSeaDragonViewer2'
import PhotoIcon from '@material-ui/icons/Photo';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {useStyles} from './ViewerStyle2.js';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NextIcon from '@material-ui/icons/ArrowRight';
import './Questions.css';

export default function Viewer2() {
	
  const [images, setImages] = useState([]);
  const [manifest, setManifest] = useState();
  const [imageId, setImageId] = useState();
  const [title, setTitle] = useState();
  const [state, setState] = useState();
  const [index, setIndex]= useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [showStart, setShowStart] = useState(true);
  const [showNext, setShowNext] = useState(false);	
  const [showEnd, setShowEnd] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [value, setValue] = useState();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
	
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
	    setIndex(indices[0].imageIndex);
	    setCurrentQuestion(indices[0].questionIndex);
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
    //setManifest(image.groups[0].slides[0].slide)
    console.log('imageindexinimages', index)
    setImageId(image.groups[0].slides[index].slide.source.Image.Url)
    console.log('IMAGEID', image.groups[0].slides[index].slide.source.Image.Url)
    //getQuestions(image.groups[0].slides[0].slide.source.Image.Url)
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
	  console.log('setQuestions', questions)
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
	
  const handleNext = () => {
	  if (index < images.length) {
		  console.log('index', index)
		  setManifest(images[index].slide)
		  setImageId(images[index].slide.source.Image.Url);
		  //getQuestions(imageId);
		  setShowNext(false);
		  setShowScore(true);
		  //saveIndex(index, currentQuestion);
	  } else {
		  setShowScore(false);
		  setShowEnd(true);
		  setShowNext(false);
		  //saveIndex(index, currentQuestion);
	  }
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
		  setShowStart(false);
		  setShowScore(true);
		  setManifest(images[index].slide);
		  getQuestions(imageId);
	  }
  };
	
  const handleAnswerOptionClick = (event) => {
    console.log("handleAnswerOptionClick");
    let answerObj = {
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
	    console.log('answers', answers)
	    saveIndex(index, currentQuestion+1);
	  } else {
	    setShowScore(false);
	    setShowNext(true);
	    saveIndex(index+1, 0);
	    setIndex(index+1);
	    setCurrentQuestion(0);
	  }
  }
};
			
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, open && classes.paperShift);
  return (
    <div className = {classes.root}>
      <CssBaseline />
      <AppBar position="absolute" 
              className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
           <Typography variant="h6" noWrap className={classes.title} align="left">
            <b>Brain Tissue Clinical Study</b>
          </Typography>
          <Typography>
            User:{' '}<b><span id="user"></span> </b>
            <span id='consolelog'></span>
            </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
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
				 <p></p> <b>Image {index +1} </b>  <p></p>
				</Typography>
                     <OpenSeaDragonViewer2 image={manifest} />
                   </Paper>
                 </Grid>
               </Grid>
             </Container>
</main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
	anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
      >
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
			{showScore == true &&
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Image {index +1}</span>/{images.length}
						</div>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions[index].QuestionJson.length}
						</div>
					</div>
					<div className='answer-section'>
					   <form onSubmit={handleSubmit}>
					   <FormControl component="fieldset" error={error} className={classes.formControl}>
				             <FormLabel component="legend">{questions[index].QuestionJson[currentQuestion].questionText}</FormLabel>
					     <RadioGroup aria-label="quiz" name={index} value={value} onChange={handleAnswerOptionClick}>
						{questions[index].QuestionJson[currentQuestion].answerOptions.map((answerOption) => (
      						  <FormControlLabel value={answerOption.answerText} control={<Radio color="primary" />} label={answerOption.answerText} />
						))}
						</RadioGroup>
						<FormHelperText>{helperText}</FormHelperText>
						<Button type="submit" variant="contained" color="primary" className={classes.button}>Submit Answer</Button>
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
			  		 </Typography>
			         </div>
			 }
		</div>	  
       
      
</List>
      </Drawer>
</div>
);
}
