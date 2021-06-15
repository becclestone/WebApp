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
//import ToggleButton from '@material-ui/core/ToggleButton';
import styled from 'styled-components';

function Viewer() {
    const [images, setImages] = useState([]);
    const [manifest, setManifest] = useState();
    const [active, setActive] = useState();

    setUserInfo();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch("https://miradortest.z13.web.core.windows.net/pictures3.json") //"/api/deepzoom/pictures3.json"
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

        document.getElementById("user").innerHTML = clientPrincipal.userDetails;
        console.log(clientPrincipal);
      }

      const Button = styled.button`
        background-color: grey;
        color: black;
        font-size: 18px;
        padding: 10px 40px;
        border-radius: 5px;
        margin: 10px 0px;
        cursor: pointer;
        &:disabled {
          color: white;
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
                <h3 key={index}>{group.name}</h3>
                  {group.slides.map((slide, index) => {
                    return (
                      <ButtonToggle
                        key={index}
                        active={active === slide}
                        onClick={() => { setActive(slide);
                          return previewImage(slide);
                        }}
                      >
                        {slide.name}
                    </ButtonToggle>
                    );
                  })}
                </div>
              );
            })}
      </div>
      <div>
          <Box m={3}>
          <Typography align="right">
            User:{' '}<b><span id="user"></span> </b>
            <span id='consolelog'></span>
            </Typography>
            </Box>
          <Box m={3} pt={2}>
            <OpenSeaDragonViewer image={manifest} />
          </Box>
      </div>
    </div>
  );
}

export default Viewer;
