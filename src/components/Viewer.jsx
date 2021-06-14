import React, { useState, useEffect } from 'react';
import './App.css';
import { OpenSeaDragonViewer } from './OpenSeaDragonViewer';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Viewer() {
    const [images, setImages] = useState([]);
    const [manifest, setManifest] = useState();


  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch("/api/deepzoom/pictures3.json")
    let image = await response.json();
    console.log('image', image)
    setImages(image.groups)
  };

  const previewImage = async (slide) => {
    setManifest(slide.slide);
  };
  
    async function getUserInfo() {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload; 
        return clientPrincipal;
      }

      async function setUserInfo() {
        let  clientPrincipal =  await getUserInfo();

        document.getElementById("user").innerHTML = clientPrincipal.userDetails + ' at ' + clientPrincipal.identityProvider;
        console.log(clientPrincipal);
      }
    
  return (
    <div className="viewer"
         style={{
       display: "flex",
       justifyContent:'space-between'
       }}
    >
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
                      <ListItemText
                        disableTypography
                        primary={<Typography align="center">{slide.name}</Typography>} />
                    </ListItem>
                    );
                  })}
                </div>
              );
            })}
      </div>
      <div>   
            User: &nbsp <b><div id="user"  ></div> </b>
            <span id='consolelog'></span>
          <Box m={3} pt={3}>
            <OpenSeaDragonViewer image={manifest} />
          </Box>
      </div>
    </div>
  );
}

export default Viewer;
