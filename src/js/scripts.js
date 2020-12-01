
import "./../styles/styles.scss";
import "./loading.js";
import $ from 'jquery';
import "spectrum-colorpicker";
import './../styles/spectrum.css';
import "./sketchToolbar.js";
import "./kaleidoscopeToolbar.js";
import './../assets/IMG/logo.png';
import './../assets/IMG/sample2.jpg';
import './../assets/IMG/default-img-2.png';


// KALEIDOSCOPE TOOLBAR
//Segments slider
let segments = document.getElementById('mirror-slider').value;
const segmentSlider = document.getElementById('mirror-slider');
segmentSlider.addEventListener('input', updateSegments);

//View slider
let viewVal = document.getElementById('view-slider').value;
const viewSlider = document.getElementById('view-slider');
viewSlider.style.display = 'none';
viewSlider.addEventListener('input', updateKaleidoscopeView);

//Animation speed slider
export let animationSpeed = document.getElementById('speed-slider').value;
const speedSlider = document.getElementById('speed-slider');
speedSlider.addEventListener('input', updateSpeed);

// Play/pause button
function updatePlayButtonView() {
  animating = !animating;
  console.log(animating);
  if(animating) {
    viewSlider.style.display = 'none';
    speedSlider.style.display = 'inline';
    pauseButton.style.display = 'inline';
    playButton.style.display = 'none';
  } else {
    viewSlider.style.display = 'inline';
    speedSlider.style.display = 'none';
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
  }
  updateRender();
};

let pauseButton = document.getElementById('pause-button')
pauseButton.addEventListener('click', updatePlayButtonView);
let playButton = document.getElementById('play-button')
playButton.addEventListener('click', updatePlayButtonView);



//KALEIDSCOPE CANVAS

//Function to update kaleidoscope rendering
function updateRender() {
  const radius = w/2 + h/2;
  const mirrorAngle = (PI*2) / segments;

  const x1 = -1; 
  const x2 = -1;
  const x3 = radius * sin(mirrorAngle);
  const x4 = radius * sin(mirrorAngle/2);

  const y1 = -1;
  const y2 = radius;
  const y3 = radius * cos(mirrorAngle);
  const y4 = radius * cos(mirrorAngle/2);
    
  for(let i=0; i<segments; i++) {
    //Non-mirrored segment
    ctx.translate(w/2, h/2);
    ctx.rotate(i * mirrorAngle); //angle path depending on segment angle, multiplied by segment #
    ctx.translate(offset.x, offset.y); 
    ctx.beginPath();
    ctx.moveTo(x1-offset.x, y1-offset.y); //Draw triangle
    ctx.lineTo(x2-offset.x, y2-offset.y);
    ctx.lineTo(x3-offset.x, y3-offset.y);
    ctx.lineTo(x1-offset.x, y1-offset.y);
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.resetTransform();

    //Mirrored segment
    ctx.translate(w/2, h/2); //move to center of canvas
    ctx.rotate((i-1) * mirrorAngle); 
    ctx.scale(-1, 1);
    ctx.translate(offset.x, offset.y);
    ctx.beginPath();
    ctx.moveTo(x1-offset.x, y1-offset.y);
    ctx.lineTo(x2-offset.x, y2-offset.y);
    ctx.lineTo(x4-offset.x, y4-offset.y);
    ctx.lineTo(x1-offset.x, y1-offset.y);
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.resetTransform();
  }

  if(animating) {
    offset.x = (offset.x + 0.75 + animationSpeed) % img.width;
    offset.y = (offset.y + 0.25 + animationSpeed) % img.height; 
    requestAnimationFrame(updateRender);
  }
}

//Updates kaleidoscope segments when slider is moved
export function updateSegments() {
  segments = document.getElementById('mirror-slider').value;
  if(!animating) {
    updateRender();
  }
};

//Updates kaleidoscope view when slider is moved. Only available when animation is paused.
export function updateKaleidoscopeView() { 
  if(!animating){
    viewVal = document.getElementById('view-slider').value;
    offset.x = viewVal;
    offset.y = viewVal;
    updateRender();
  }
};

//Updates kaleidoscope animation speed when slider is moved. Only available when animation is playing.
export function updateSpeed() {
  if(animating) {
    animationSpeed = parseInt(document.getElementById('speed-slider').value);
  }
};

//Defines and draws initial kaleidoscope canvas
const canvas = document.getElementById('canvas');
const $canvasContainer = document.querySelector('#kaleidoscope-canvas-container');
const canvasDimensions = $canvasContainer.clientWidth;
const ctx = canvas.getContext('2d');
let w = canvas.width = canvasDimensions;
let h = canvas.height = canvasDimensions;
const {PI,sin,cos} = Math;
const offset = {
  x: .5, 
  y: .5
};

let animating = true;
const kaleidoscopeSize = canvasDimensions / 2
ctx.beginPath();

ctx.arc(kaleidoscopeSize, kaleidoscopeSize, kaleidoscopeSize * 0.8, 0, 2 * PI);
ctx.clip();

const img = new Image();
img.src = "./default-img-2.png"; 
let pattern;
img.onload = function() {
  pattern = ctx.createPattern(img, 'repeat');
  console.log(img.width, img.height);
  updateRender();
}

//SKETCH API & KAlEIDOSCOPE INTERACTIONS
bindSketchEvents() 

function bindSketchEvents() {
  const doc = sketch.doc;
  if (typeof doc.on !== "undefined") {
    doc.setBackground('#FFFFFF');
    doc.addLayer({
      type: "image",
      src: './default-img-2.png'
    });
    doc.on('change', async packet => {
      console.log(packet)
      if (packet.op === "HISTORY_STORE") {
        await updateKaleidoscope()
      }
    })

  } else {
    setTimeout(bindSketchEvents, 250)
  }
}



async function updateKaleidoscope() {
  const sketchCanvas = await sketch.save.canvas();
  // sketchCanvas.width = 600;
  // sketchCanvas.height= 600;
  console.log(sketchCanvas.width, sketchCanvas.height);
  pattern = ctx.createPattern(sketchCanvas, 'repeat');
}

//Hide sketch canvas
const hideBtn = document.querySelector('#hide-btn');
const showBtn = document.querySelector('#show-btn');
const sketchCanvasContainer = document.querySelector('#sketch-canvas-container');
const kaleidoscopeCanvasContainer = document.querySelector('#kaleidoscope-canvas-container');
const sketchToolbar = document.querySelector('#sketch-toolbar');

hideBtn.addEventListener('click', function() {
  // sketchCanvasContainer.className = 'sketchCanvasTransition';
  sketchCanvasContainer.style.display = 'none';
  sketchToolbar.style.display = 'none';
  kaleidoscopeCanvasContainer.style.gridColumn = '2 / span 2';
  showBtn.style.display = 'block';
  hideBtn.style.display = 'none';

  const styles = {
    width: '50%',
    height: '50%',
    top: '25%',
    left: '25%'
  }
  Object.assign(canvas.style, styles);
});

//Show Sketch canvas
showBtn.addEventListener('click', function() {
  sketchCanvasContainer.style.display = 'block';
  sketchToolbar.style.display = 'block';
  kaleidoscopeCanvasContainer.style.gridColumn = '3';

  const styles = {
    width: '100%',
    height: '100%',
    top: '0',
    left: '0'
  }
  Object.assign(canvas.style, styles);

  showBtn.style.display = 'none';
  hideBtn.style.display = 'block';
});
