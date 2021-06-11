import React, { useState, useEffect } from 'react';
import './App.css';
import { OpenSeaDragonViewer } from './OpenSeaDragonViewer';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';


function Viewer() {
    const [images, setImages] = useState([]);
    const [manifest, setManifest] = useState();


  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch("https://miradortest.z13.web.core.windows.net/pictures3.json")
    let image = await response.json();
    console.log('image', image)
    setImages(image.groups)
  };

  const previewImage = async (slide) => {
    setManifest(slide.slide);
  };
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
      <OpenSeaDragonViewer image={manifest} />
      </div>
    </div>
  );
}

export default Viewer;
