import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board.js'
import Pen from './Pen.js'
import FloatingButton from './FloatingButton.js'
import Pointer from './Pointer.js'
import _ from 'lodash'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )}
// Initialise application
function Draw() {
  return (
  Board.init('board');
  Pen.init(Board.ctx);
  FloatingButton.init();
  FloatingButton.onClick = Board.clearMemory.bind(Board);
  Pointer.onEmpty = _.debounce(Board.storeMemory.bind(Board), 1500);

  // Attach event listener
  var pointerDown = function pointerDown(e) {
    // Initialise pointer
    var pointer = new Pointer(e.pointerId);
    pointer.set(Board.getPointerPos(e));

    // Get function type
    Pen.setFuncType(e);
    if (Pen.funcType === Pen.funcTypes.menu) Board.clearMemory();
    else drawOnCanvas(e, pointer, Pen);
  }
  var pointerMove = function pointerMove(e) {
    if (Pen.funcType && (Pen.funcType.indexOf(Pen.funcTypes.draw) !== -1)) {

      var pointer = Pointer.get(e.pointerId);
      drawOnCanvas(e, pointer, Pen);
    }
  }
  var pointerCancel = function pointerLeave(e) {
    Pointer.destruct(e.pointerId);
  }
  Board.dom.addEventListener('pointerdown', pointerDown);
  Board.dom.addEventListener('pointermove', pointerMove);
  Board.dom.addEventListener('pointerup', pointerCancel);
  Board.dom.addEventListener('pointerleave', pointerCancel);
  )
  }


export default App;



// Draw method
function drawOnCanvas(e, pointerObj, Pen) {
  if (pointerObj) {
    pointerObj.set(Board.getPointerPos(e));
    Pen.setPen(Board.ctx, e);

    if (pointerObj.pos0.x < 0) {
      pointerObj.pos0.x = pointerObj.pos1.x - 1;
      pointerObj.pos0.y = pointerObj.pos1.y - 1;
    }
    Board.ctx.beginPath();
    Board.ctx.moveTo(pointerObj.pos0.x, pointerObj.pos0.y)
    Board.ctx.lineTo(pointerObj.pos1.x, pointerObj.pos1.y);
    Board.ctx.closePath();
    Board.ctx.stroke();
    console.log(pointerObj.pos0.x, pointerObj.pos1.x)

    const data = { username: 'example' };
    console.log(JSON.stringify(data))
    fetch('http://localhost:5000/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'localhost:5000'
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    pointerObj.pos0.x = pointerObj.pos1.x;
    pointerObj.pos0.y = pointerObj.pos1.y;
  }
}
