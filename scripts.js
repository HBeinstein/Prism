const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let w = canvas.width = window.innerHeight;
let h = canvas.height = window.innerHeight;
const {PI,sin,cos} = Math;

const segments = 6; //Edit # of mirrors

const offset = {x: 300, y: 50}; //Changes what part of image is shown --> Maybe use scroll bar control to edit this in app?

ctx.beginPath();
ctx.arc(370, 370, 350, 0, 360);
ctx.clip();

function animate() {
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
        ctx.rotate(i * mirrorAngle); //angle path depending on segment angle
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

  offset.x = (offset.x + 0.75) % img.width;
  offset.y = (offset.y + 0.25) % img.height; //Moves image before re-rendering/animation

  requestAnimationFrame(animate);
}

const img = new Image();
img.src = "./IMG/sample2.jpg";

// img.onload = function() {
  const pattern = ctx.createPattern(img, 'repeat');
// };

animate();

