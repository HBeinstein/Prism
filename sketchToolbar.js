//Toolbar
const sketch = global.sketch;
const Gesture = global.Gesture;
const dom = sketch.dom;

const $selectButton = dom.$('#select');
Gesture.on($selectButton, 'click', () => {
	sketch.setTool('select');
});

const $pencilButton = dom.$('#pencil');
Gesture.on($pencilButton, 'click', () => {
	sketch.setTool('pencil');
});

const $paintbrushButton = dom.$('#paintbrush');
Gesture.on($paintbrushButton, 'click', () => {
  sketch.setTool('paintbrush');
  sketch.configTool('paintbrush', {stroke: '#87D4FE'});
});

const $circleButton = dom.$('#circle');
Gesture.on($circleButton, 'click', () => {
  sketch.setTool('ellipse');
  sketch.configTool('ellipse', {stroke: 'none', fill: '#00DDAA'});
});

const $ringButton = dom.$('#ring');
Gesture.on($ringButton, 'click', () => {
  sketch.setTool('ring');
  sketch.configTool('ring', {stroke: 'none', fill: '#8DE1D2'});
});

const $triangleButton = dom.$('#triangle');
Gesture.on($triangleButton, 'click', () => {
  sketch.setTool('triangle');
  sketch.configTool('triangle', {stroke: 'none', fill: '#87D4FE'});
});

const $squareButton = dom.$('#square');
Gesture.on($squareButton, 'click', () => {
  sketch.setTool('square');
  sketch.configTool('square', {stroke: 'none', fill: '#9DA0F0'});
});

const $rectangleButton = dom.$('#rectangle');
Gesture.on($rectangleButton, 'click', () => {
  sketch.setTool('rectangle');
  sketch.configTool('rectangle', {stroke: 'none', fill: '#FF5951'});
});

//Color-picker
$(".color-picker").spectrum({
    color: "#f00",
});