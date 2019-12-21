import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Camera from 'react-html5-camera-photo';
// import ImagePreview from './ImagePreview';
import 'react-html5-camera-photo/build/css/index.css';
import { useSwipeable, Swipeable } from 'react-swipeable';
import {Swipe} from "./Components";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAWIT6Rcn0gjptOAmICLfqrC3JO4US-KOg",
  authDomain: "cleaningapp-2cf36.firebaseapp.com",
  databaseURL: "https://cleaningapp-2cf36.firebaseio.com",
  projectId: "cleaningapp-2cf36",
  storageBucket: "cleaningapp-2cf36.appspot.com",
  messagingSenderId: "83093851217",
  appId: "1:83093851217:web:987d6ce307fcc653d3fc70"
});

const db = firebaseApp.firestore();


function App() {
  const [display, showCamera] = useState();
  // const [dataUri, setDataUri] = useState('');

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    db.collection("activities").add({
      type: "checkin",
      photo: dataUri,
      locationId: 1,
      geostam: [21, 21]
    }).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    // setDataUri(dataUri);
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => showCamera(!display),
    onSwipedRight: () => console.log("Right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
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
      <div {...handlers}>
        <Swipe>
            <span>Swipe to left....</span>
        </Swipe>
      </div>
      <input type="button" onClick={() => showCamera(!display)} value="Check-in"></input>
      {
        display &&
        <Camera onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }} />
        // (display && !dataUri)
        //   ? <Camera onTakePhotoAnimationDone={(dataUri) => { handleTakePhoto(dataUri); }}
        //   />
        //   : <ImagePreview dataUri={dataUri}
        //     isFullscreen={isFullscreen}
        //   />
      }
    </div>
  );
}

export default App;

