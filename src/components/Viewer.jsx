import React, { useState, useEffect } from 'react';
import './App.css';
import { OpenSeaDragonViewer } from './OpenSeaDragonViewer';

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
       <div class="demoheading" style="display: flex;">
            User: &nbsp <b><div id="user"  ></div> </b>
            <span id='consolelog'></span>
         </div>
         <div class="demoheading">   
            <p class="instructions">Click the annotation to edit. Hold <strong>SHIFT</strong> while clicking and dragging the mouse to create a new annotation.</p>
            <!-- The toolbar mounts itself into a DIV on your page -->
            <div id="my-toolbar-container"></div> 
        </div>
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
                  <h3 key={index}>{group.name}</h3>
                  {group.slides.map((slide, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          return previewImage(slide);
                        }}
                      >
                        {slide.name}
                      </button>
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
