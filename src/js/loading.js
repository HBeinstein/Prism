const loadScreen = document.querySelector('#load-screen');
const appContainer = document.querySelector('#app-container');
const sketchContainer = document.querySelector('#sketch-canvas-container');
const kaleidoscopeContainer = document.querySelector('#kaleidoscope-canvas-container');
const kaleidoscopeToolbar = document.querySelector('#kaleidoscope-canvas-toolbar');
const sketchToolbar = document.querySelector('#sketch-toolbar');


function animate() {
  if(document.readyState !== 'complete') {
    setTimeout(animate, 3000);
  } else {
    loadScreen.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', animate);
