import $ from 'jquery';
import "spectrum-colorpicker";

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

//SketchAPI Toolbar 
//Select Tool
const $selectButton = dom.$('#select-tool-button');
Gesture.on($selectButton, 'click', () => {
	sketch.setTool('select');
});

//Vector Tool
const $pathButton = dom.$('#path');
Gesture.on($pathButton, 'click', () => {
  setCurrentTool('path')
});

const $polylineButton = dom.$('#polyline');
Gesture.on($polylineButton, 'click', () => {
  setCurrentTool('polyline')
});

//Brush Tool
const $pencilButton = dom.$('#pencil');
Gesture.on($pencilButton, 'click', () => {
  setCurrentTool('pencil')
});

const $penButton = dom.$('#pen');
Gesture.on($penButton, 'click', () => {
  setCurrentTool('pen');
});

const $crayonButton = dom.$('#crayon');
Gesture.on($crayonButton, 'click', () => {
  setCurrentTool('crayon');
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
  setCurrentTool('rectangle');
});

const $burstButton = dom.$('#burst');
Gesture.on($burstButton, 'click', () => {
  setCurrentTool('burst');
});

const $starButton = dom.$('#star');
Gesture.on($starButton, 'click', () => {
  setCurrentTool('star');
});

const $pieButton = dom.$('#pie');
Gesture.on($pieButton, 'click', () => {
  setCurrentTool('pie');
});

const $polygonButton = dom.$('#polygon');
Gesture.on($polygonButton, 'click', () => {
  setCurrentTool('regularPolygon');
});

//Sketch toolbar expandable menu
const selectToolButton = document.querySelector('#select-tool-button');

const vectorToolButton = document.querySelector('#vector-tool-button');
const vectorToolContent = document.querySelector('.vector-tool-sub-category');

const brushToolButton = document.querySelector('#brush-tool-button');
const brushToolContent = document.querySelector('.brush-tool-sub-category');

const shapeToolButton = document.querySelector('#shape-tool-button');
const shapeToolContent = document.querySelector('.shape-tool-sub-category');

//Select tool hide other menus
selectToolButton.addEventListener('click', function() {
  brushToolContent.style.display = 'none';
  shapeToolContent.style.display = 'none';
  vectorToolContent.style.display = 'none';
});

//Vector tool show/hide
vectorToolButton.addEventListener('click', function() {
  brushToolContent.style.display = 'none';
  shapeToolContent.style.display = 'none';
  vectorToolContent.style.display = (vectorToolContent.style.display === 'inline-block') ? 'none' : 'inline-block';  
  vectorToolContent.style.position = 'absolute';
  vectorToolContent.style.left = '40px';
});

//Brush tool show/hide
brushToolButton.addEventListener('click', function() {
  vectorToolContent.style.display = 'none';
  shapeToolContent.style.display = 'none';
  brushToolContent.style.display = (brushToolContent.style.display === 'inline-block') ? 'none' : 'inline-block';  
  brushToolContent.style.position = 'absolute';
  brushToolContent.style.left = '40px';
});

//Shape tool show/hide
shapeToolButton.addEventListener('click', function() {
  brushToolContent.style.display = 'none';
  vectorToolContent.style.display = 'none';
  shapeToolContent.style.display = (shapeToolContent.style.display === 'inline-block') ? 'none' : 'inline-block';  
  shapeToolContent.style.position = 'absolute';
  shapeToolContent.style.left = '40px';
});

//Color-picker
$("#fill-color-picker").spectrum({
  color: "#E484B7",
  showInitial: true,
  showInput: true,
  palette: palette,
  // allowEmpty: true,
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
  // allowEmpty: true,
  showPalette: true,
  showPaletteOnly: true,
  preferredFormat: "hex",
  move: function(color) {
    sketch.doc.configLayers({
      stroke: color.toHexString()
    })
  }
});
