// import $ from 'jquery';
// import {updateSegments, updateKaleidoscopeView, updateSpeed} from './scripts.js';
// //Kaleidoscope Toolbar

// //Segments slider
// export let segments = document.getElementById('mirror-slider').value;
// const segmentSlider = document.getElementById('mirror-slider');
// segmentSlider.addEventListener('input', updateSegments);

// //View slider
// let viewVal = document.getElementById('view-slider').value;
// const viewSlider = document.getElementById('view-slider');
// viewSlider.style.display = 'none';
// viewSlider.addEventListener('input', updateKaleidoscopeView);

// //Animation speed slider
// export let animationSpeed = document.getElementById('speed-slider').value;
// const speedSlider = document.getElementById('speed-slider');
// speedSlider.addEventListener('input', updateSpeed);

// // Play/pause button
// function updatePlayButtonView() {
//   animating = !animating;
//   console.log(animating);
//   if(animating) {
//     viewSlider.style.display = 'none';
//     speedSlider.style.display = 'inline';
//     pauseButton.style.display = 'inline';
//     playButton.style.display = 'none';
//   } else {
//     viewSlider.style.display = 'inline';
//     speedSlider.style.display = 'none';
//     playButton.style.display = 'inline';
//     pauseButton.style.display = 'none';
//   }
//   updateRender();
// };

// let pauseButton = document.getElementById('pause-button')
// pauseButton.addEventListener('click', updatePlayButtonView);
// let playButton = document.getElementById('play-button')
// playButton.addEventListener('click', updatePlayButtonView);

// // export default kaleidoscopeToolbar;
