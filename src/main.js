import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import board from './board.svg'
import { setupCounter } from './counter.js'
import { setupMouseMoveAndClick } from './script.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello SVG Chinese Chess Board!</h1>
    <div id="svg-container">
      <object id="svg-object" type="image/svg+xml" data="${board}"></object>
    </div>
      <button id="reset-button">Reset</button>
  </div>
`;

document.getElementById('reset-button').addEventListener('click', function() {
   document.getElementById('svg-object').data = board;
});

// setupCounter(document.querySelector('#counter'))
setupMouseMoveAndClick(document)
