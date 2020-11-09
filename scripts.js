function updateRender() {
  const radius = w/2 + h/2;
  const mirrorAngle = (PI*2) / segments;

  const x1 = -1; 
  const x2 = -1;
  const x3 = radius * sin(mirrorAngle);
  const x4 = radius * sin(mirrorAngle/2);

  y1 = -1;
  y2 = radius;
  y3 = radius * cos(mirrorAngle);
  y4 = radius * cos(mirrorAngle/2);
    
  for(let i=0; i<segments; i++) {
    //Non-mirrored segment
    ctx.translate(w/2, h/2); //move to center of canvas
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
    ctx.translate(w/2, h/2);
    ctx.rotate((i-1) * mirrorAngle);
    ctx.scale(-1, 1);
    ctx.translate(offset.x, offset.y);
    ctx.beginPath();
    ctx.moveTo(x1-offset.x, y1-offset.y); //Draw mirrored triangle
    ctx.lineTo(x2-offset.x, y2-offset.y);
    ctx.lineTo(x4-offset.x, y4-offset.y);
    ctx.lineTo(x1-offset.x, y1-offset.y);
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.resetTransform();
  }

  if(animating) {
    offset.x = (offset.x + 0.75 + animationSpeed) % img.width;
    offset.y = (offset.y + 0.25 + animationSpeed) % img.height; //Moves image before re-rendering/animation, CHANGE THIS TO CHANGE SPEED OF ANIMATION
    requestAnimationFrame(updateRender);
  }
}

function updateSegments() {
  segments = document.getElementById('mirror-slider').value;
  if(!animating) {
    updateRender();
  }
};

function updateKaleidoscopeView() { //only shows when animation paused
  if(!animating){
    viewVal = document.getElementById('view-slider').value;
    offset.x = viewVal;
    offset.y = viewVal;
    updateRender();
  }
};

function updateSpeed() {
  if(animating) {
    animationSpeed = parseInt(document.getElementById('speed-slider').value);
  }
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerHeight;
let h = canvas.height = window.innerHeight;
const {PI,sin,cos} = Math;

let animating = true;
const animateButton = document.getElementById('animate-button').onclick = function() {
  animating = !animating;
  if(animating) {
    viewSlider.style.display = 'none';
    speedSlider.style.display = 'inline';
  } else {
    viewSlider.style.display = 'inline';
    speedSlider.style.display = 'none';
  }
  updateRender();
};

//Kaleidoscope Toolbar
let segments = document.getElementById('mirror-slider').value;
const segmentSlider = document.getElementById('mirror-slider');
segmentSlider.addEventListener('input', updateSegments);

let viewVal = document.getElementById('view-slider').value;
const viewSlider = document.getElementById('view-slider');
viewSlider.style.display = 'none';
const offset = {
  x: 500, 
  y: 200
};
viewSlider.addEventListener('input', updateKaleidoscopeView);

let animationSpeed = document.getElementById('speed-slider').value;
const speedSlider = document.getElementById('speed-slider');
speedSlider.addEventListener('input', updateSpeed);

ctx.beginPath();
ctx.arc(370, 370, 350, 0, 360);
ctx.clip();

const img = new Image();
img.src = "./assets/IMG/sample2.jpg"; 
let pattern;
img.onload = function() {
  pattern = ctx.createPattern(img, 'repeat');
  updateRender();
}



