/*
Code modified from the open source Annotorious ColorFormatter plug-in https://recogito.github.io/guides/editor-widgets/
*/
import './ColorSelector.css';
import './ShapeLabels.css';
/** A matching formatter that sets the color according to the 'highlighting' body value **/
var ColorFormatter = function(annotation) {
  const bodies = Array.isArray(annotation.body) ?
          annotation.body : [ annotation.body ];

        const firstTag = bodies.find(b => b.purpose == 'tagging');
  
      if(firstTag) 
         return firstTag.value;
     
}
export default ColorFormatter;
