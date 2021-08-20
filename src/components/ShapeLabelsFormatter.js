/*
Code from plug-in of Annotorious open source project: https://github.com/recogito/recogito-client-plugins/tree/main/packages/annotorious-shape-labels
*/
import './ShapeLabels.css';

var ShapeLabelsFormatter = function(annotation) {
        const bodies = Array.isArray(annotation.body) ?
          annotation.body : [ annotation.body ];

        const firstComment = bodies.find(b => b.purpose == 'commenting');
        
        if (firstComment) {
          const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

          // Fill annotation dimensions
          foreignObject.setAttribute('width', '100%');
          foreignObject.setAttribute('height', '100%');

          foreignObject.innerHTML = `
            <div xmlns="http://www.w3.org/1999/xhtml" class="a9s-shape-label">
              ${firstComment.value}
            </div>`;

          return {
            element: foreignObject,
            className: firstComment.value
          };
        }
      };

export default ShapeLabelsFormatter;
