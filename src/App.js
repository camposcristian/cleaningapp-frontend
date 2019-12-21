import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App() {
  const [display, showCamera] = useState(false);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <input type="button" onClick={() => showCamera(!display)} value="Check-in"></input>
      {display &&
        <Camera
          onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
        />
      }
    </div>
  );
}

export default App;
