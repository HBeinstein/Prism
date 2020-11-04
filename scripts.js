const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let w = canvas.width = window.innerHeight;
let h = canvas.height = window.innerHeight;
const {PI,sin,cos} = Math;

const segments = 6;

const offset = {x: 300, y: 50};

ctx.beginPath();
ctx.arc(370, 370, 350, 0, 360);
ctx.clip();

function animate() {
  const radius = w/2 + h/2;
  const mirrorAngle = (PI*2) / segments;
  
  const x = [ -1,
  -1/*radius * sin(0)*/,
  radius * sin(mirrorAngle),
  radius * sin(mirrorAngle/2)
];
  const y = [ -1,
  radius/*radius * cos(0)*/,
  radius * cos(mirrorAngle),
  radius * cos(mirrorAngle/2)
];
  
for(let i=0; i<segments; i++) {
      //Non-mirrored segment
      ctx.translate(w/2, h/2); //move to center of canvas
      ctx.rotate(i * mirrorAngle); //angle path depending on segment angle
      ctx.translate(offset.x, offset.y); 
      ctx.beginPath();
      ctx.moveTo(x[0]-offset.x, y[0]-offset.y);
      ctx.lineTo(x[1]-offset.x, y[1]-offset.y);
      ctx.lineTo(x[2]-offset.x, y[2]-offset.y);
      ctx.lineTo(x[0]-offset.x, y[0]-offset.y);
      ctx.fillStyle = pattern;
      ctx.fill();
      ctx.resetTransform();

      //Mirrored segment
      ctx.translate(w/2, h/2);
      ctx.rotate((i-1) * mirrorAngle);
      ctx.scale(-1, 1);
      ctx.translate(offset.x, offset.y);
      ctx.beginPath();
      ctx.moveTo(x[0]-offset.x, y[0]-offset.y);
      ctx.lineTo(x[1]-offset.x, y[1]-offset.y);
      ctx.lineTo(x[3]-offset.x, y[3]-offset.y);
      ctx.lineTo(x[0]-offset.x, y[0]-offset.y);
      ctx.fillStyle = pattern;
      ctx.fill();
      ctx.resetTransform();
}

offset.x = (offset.x + 0.75) % img.width;
offset.y = (offset.y + 0.25) % img.height;

requestAnimationFrame(animate);
}

const img = new Image();
img.src = "https://media.istockphoto.com/vectors/modern-trendy-abstract-shapes-in-pastel-colors-scandinavian-clean-vector-id1190577091?b=1&k=6&m=1190577091&s=612x612&w=0&h=tTQpM21MUcoH0maJlKYZY60Ov7BZH9ksXyorRU5XJWM=";

// img.onload = function() {
  const pattern = ctx.createPattern(img, 'repeat');
// };
animate();
