const loadScreen = document.querySelector('#load-screen');
const appContainer = document.querySelector('#app-container');


function animate() {
  console.log('hi');
  if(document.readyState !== 'complete') {
    setTimeout(animate, 3000);
  } else {
    console.log('done');
    loadScreen.style.display = 'none';
    appContainer.style.visibility = 'visible';
  }
}

window.addEventListener('DOMContentLoaded', animate);
