//SketchAPI
const sketch = global.sketch;
const Gesture = global.Gesture;
const dom = sketch.dom;

//Color-picker
// TODO: Create an additional color picker so the stroke and fill can be set separately
// We use the move event handler here to update the sketch layers when the color is changed.
// The move event handler is specific to the spectrum library.
$("#color-picker").spectrum({
    color: "#00DDAA",
    showInitial: true,
    showInput: true,
    palette: [
      ['#FF5951', '#87D4FE', '#00DDAA']
    ],
    showPalette: true,
    showPaletteOnly: true,
    preferredFormat: "hex",
    move: function(color) {
      sketch.doc.configLayers({
        stroke: color.toHexString()
      })
    }
});

// let currentColor;
// const colorPicker = document.getElementById('color-picker');

// colorPicker.addEventListener('change', function () {
//   currentColor = colorPicker.spectrum('get').toHexString();
//   console.log(currentColor);
// });

// bindSketchEvents() needs to be called at boot
bindSketchEvents()

/**
 * bindSketchEvents()
 *
 * Since we're not using the app loader, sketch.doc.on isn't ready right away
 * so we need to check for sketch.doc.on and if it doesn't exist, we wait for
 * 250ms and try again. Once sketch.doc.on is defined then we can setup the
 * event handler to update the kaleidoscope when history events occur.
 */
function bindSketchEvents() {
  const doc = sketch.doc
  if (typeof doc.on !== "undefined") {
    doc.setBackground('white')
    doc.on('change', async packet => {
      if (packet.op === "HISTORY_STORE") {
        await updateKaleidoscope()
      }
    })
  } else {
    setTimeout(bindSketchEvents, 250)
  }
}

/**
 * updateKaleidoscope()
 *
 * Saves the sketchCanvas and then creates a new pattern using the kaleidoscope
 * canvas context.
 */
async function updateKaleidoscope() {
  const sketchCanvas = await sketch.save.canvas()
  const canvas = document.querySelector("#canvas")
  const ctx = canvas.getContext('2d')
  pattern = ctx.createPattern(sketchCanvas, 'repeat')
}

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
