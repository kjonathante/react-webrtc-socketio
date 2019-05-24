import React from 'react';
import { subscribeToSomething, gotStream } from './client';

function App() {
  subscribeToSomething()

  const localVideo = React.createRef(); // Video element where stream will be placed.
  const remoteVideo = React.createRef(); // Video element where stream will be placed.

  const handleClick = () => {
    localVideo.current.setAttribute("autoplay", "");
    localVideo.current.setAttribute("muted", "");
    localVideo.current.setAttribute("playsinline", "");

    remoteVideo.current.setAttribute("autoplay", "");
    remoteVideo.current.setAttribute("playsinline", "");

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
      .then(mediaStream => { // Handles success by adding the MediaStream to the video element.
        localVideo.current.srcObject = mediaStream
        gotStream(mediaStream, remoteVideo)
      })
      .catch(function (e) {
        alert('getUserMedia() error: ' + e.name);
      });
  }

  return (
    <>
      <h1>Realtime communication with WebRTC</h1>
      <div id="videos">
        <video ref={localVideo} style={{width: "320px", maxWidth: "100%" }}></video>
        <video ref={remoteVideo} style={{width: "320px", maxWidth: "100%" }}></video>
      </div>
      <button onClick={handleClick}>Test</button>
    </>
  );
}

export default App;
