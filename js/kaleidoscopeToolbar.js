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