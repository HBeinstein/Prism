//Color-picker
$("#color-picker").spectrum({
    color: "#00DDAA",
    showInitial: true,
    showInput: true,
    palette: ['#FF5951', '#87D4FE', '#00DDAA'],
    showPalette: true,
    showPaletteOnly: true,
    showSelectionPalette: true,
    preferredFormat: "hex"
});

// let currentColor;
// const colorPicker = document.getElementById('color-picker');

// colorPicker.addEventListener('change', function () {
//   currentColor = colorPicker.spectrum('get').toHexString();
//   console.log(currentColor); 
// });

//SketchAPI
const sketch = global.sketch;
const Gesture = global.Gesture;
const dom = sketch.dom;

function getCurrentColor() {
  return $('#color-picker').spectrum('get').toHexString();
} 

function setCurrentTool(tool, strokeOrFill) {
  sketch.setTool(tool);
  let color = getCurrentColor();
  if(strokeOrFill === "stroke") {
    sketch.configTool(tool, {stroke: color});
  } else {
    sketch.configTool(tool, {stroke: "none", fill: color});
  }
}

//SketchAPI Toolbar buttons
const $selectButton = dom.$('#select');
Gesture.on($selectButton, 'click', () => {
	sketch.setTool('select');
});

const $pencilButton = dom.$('#pencil');
Gesture.on($pencilButton, 'click', () => {
  setCurrentTool('pencil', 'stroke')
});

const $paintbrushButton = dom.$('#paintbrush');
Gesture.on($paintbrushButton, 'click', () => {
  setCurrentTool('paintbrush', 'stroke');
});

const $circleButton = dom.$('#circle');
Gesture.on($circleButton, 'click', () => {
  setCurrentTool('ellipse', 'fill');
});

const $ringButton = dom.$('#ring');
Gesture.on($ringButton, 'click', () => {
  setCurrentTool('ring', 'fill');
});

const $triangleButton = dom.$('#triangle');
Gesture.on($triangleButton, 'click', () => {
  setCurrentTool('triangle', 'fill');
});

const $squareButton = dom.$('#square');
Gesture.on($squareButton, 'click', () => {
  setCurrentTool('square', 'fill');
});

const $rectangleButton = dom.$('#rectangle');
Gesture.on($rectangleButton, 'click', () => {
  setCurrentTool('rectangle', 'fill');
})
