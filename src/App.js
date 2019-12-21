import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Camera from 'react-html5-camera-photo';
// import ImagePreview from './ImagePreview';
import 'react-html5-camera-photo/build/css/index.css';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { Swipe } from "./Components";
import Countdown from 'react-countdown-now';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
  databaseURL:process.env.REACT_APP_DATABASE_URL, 
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

const db = firebaseApp.firestore();

function App() {
  const [display, showCamera] = useState();
  const [dataUri, setDataUri] = useState('');

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    db.collection("activities").add({
      type: "checkin",
      photo: dataUri,
      locationId: 1,
      geostamp: [21, 21],
      timestamp: new Date()
    }).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    setDataUri(dataUri);
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

      {
        display && !dataUri &&
        <Camera onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }} />
        // (display && !dataUri)
        //   ? <Camera onTakePhotoAnimationDone={(dataUri) => { handleTakePhoto(dataUri); }}
        //   />
        //   : <ImagePreview dataUri={dataUri}
        //     isFullscreen={isFullscreen}
        //   />
      }
      {
        dataUri &&
        <Countdown date={Date.now() + 2 * 60 * 60 * 1000}>
          <span>You are good to go!</span>;
        </Countdown>
      }

    </div>
  );
}

export default App;

