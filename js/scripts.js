//KALEIDSCOPE CANVAS

//Function to update kaleidoscope rendering
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
function updateSegments() {
  segments = document.getElementById('mirror-slider').value;
  if(!animating) {
    updateRender();
  }
};

//Updates kaleidoscope view when slider is moved. Only available when animation is paused.
function updateKaleidoscopeView() { 
  if(!animating){
    viewVal = document.getElementById('view-slider').value;
    offset.x = viewVal;
    offset.y = viewVal;
    updateRender();
  }
};

//Updates kaleidoscope animation speed when slider is moved. Only available when animation is playing.
function updateSpeed() {
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

let animating = true;

const kaleidoscopeSize = canvasDimensions / 2
ctx.beginPath();

ctx.arc(kaleidoscopeSize, kaleidoscopeSize, kaleidoscopeSize * 0.8, 0, 2 * PI);
ctx.clip();

const img = new Image();
img.src = "./assets/IMG/sample2.jpg"; 
let pattern;
img.onload = function() {
  pattern = ctx.createPattern(img, 'repeat');
  updateRender();
}

//SKETCH API & KAlEIDOSCOPE INTERACTIONS
//Connects SketchAPI to Kaleidoscope rendering. BindSketchEvents() needs to be called at boot. 
bindSketchEvents()

function bindSketchEvents() {
  const doc = sketch.doc;

  // const docWidth = doc.pixelWidth;
  console.log(doc);
  if (typeof doc.on !== "undefined") {
    doc.setBackground('#C1E7FF')
    //ADD DEFAULT SCENE HERE
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
  const sketchCanvas = await sketch.save.canvas()
  const canvas = document.querySelector("#canvas")
  const ctx = canvas.getContext('2d')
  pattern = ctx.createPattern(sketchCanvas, 'repeat')
}

//Resize function
function onResize() {

}