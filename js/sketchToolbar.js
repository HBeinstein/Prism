// Functions that update color and tool
function getCurrentColor() {
  return {fill: $('#fill-color-picker').spectrum('get').toHexString(), stroke: $('#stroke-color-picker').spectrum('get').toHexString()};
} 

function setCurrentTool(tool) {
  sketch.setTool(tool);
  let color = getCurrentColor();
  sketch.configTool(tool, {stroke: color.stroke, fill: color.fill});
}

//SketchAPI
const sketch = global.sketch;
const Gesture = global.Gesture;
const dom = sketch.dom;
const palette = [
  ['#E484B7', '#FF96C9', '#FAC2D3', '#FED4F5', '#7A30F8', '#8A7FFE', '#D3C3FC', '#ECE1FD', '#FFB200', '#FFD215', '#FFE031', '#FFCC56', '#F94E1E', '#FF5402', '#FD6D01', '#FBA53E', '#009663', '#D2F16F', '#E9F777', '#E3F17F', '#F0433E', '#F74742', '#FF4141', '#FE7A53', '#271CA1', '#384CFF', '#1894E1', '#2981FF', '#5CBBE1', '#85DCDC', '#A7E7D9', '#B2EAB1', 'rgba(0,0,0,0)']
];

//SketchAPI Toolbar buttons
const $selectButton = dom.$('#select');
Gesture.on($selectButton, 'click', () => {
	sketch.setTool('select');
});

const $pencilButton = dom.$('#pencil');
Gesture.on($pencilButton, 'click', () => {
  setCurrentTool('pencil')
});

const $paintbrushButton = dom.$('#paintbrush');
Gesture.on($paintbrushButton, 'click', () => {
  setCurrentTool('paintbrush');
});

const $circleButton = dom.$('#circle');
Gesture.on($circleButton, 'click', () => {
  setCurrentTool('ellipse');
});

const $ringButton = dom.$('#ring');
Gesture.on($ringButton, 'click', () => {
  setCurrentTool('ring');
});

const $triangleButton = dom.$('#triangle');
Gesture.on($triangleButton, 'click', () => {
  setCurrentTool('triangle');
});

const $squareButton = dom.$('#square');
Gesture.on($squareButton, 'click', () => {
  setCurrentTool('square');
});

const $rectangleButton = dom.$('#rectangle');
Gesture.on($rectangleButton, 'click', () => {
  setCurrentTool('rectangle');
})

//Color-picker
$("#fill-color-picker").spectrum({
  color: "#E484B7",
  showInitial: true,
  showInput: true,
  palette: palette,
  showPalette: true,
  showPaletteOnly: true,
  preferredFormat: "hex",
  move: function(color) {
    sketch.doc.configLayers({
      fill: color.toHexString()
    })
  }
});

$("#stroke-color-picker").spectrum({
  color: 0,
  showInitial: true,
  showInput: true,
  palette: palette,
  showPalette: true,
  showPaletteOnly: true,
  preferredFormat: "hex",
  move: function(color) {
    sketch.doc.configLayers({
      stroke: color.toHexString()
    })
  }
});