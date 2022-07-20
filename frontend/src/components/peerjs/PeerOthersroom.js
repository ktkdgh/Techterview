import Peer from 'peerjs';
import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';


function PeerOthersroom() {

  const socket = io.connect('http://localhost:8001')
  const url = window.location.pathname.split('/');
  const ROOM_ID = url[5]
  console.log(ROOM_ID);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');


  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      socket.emit("join-room", ROOM_ID, id);
      console.log(ROOM_ID, peer);
    });

    socket.on("user-connected", (userId) => {
      setRemotePeerIdValue(userId);
    });

    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        call.answer(mediaStream)
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    })

    peerInstance.current = peer;
  }, [])


  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  getUserMedia({ video: true, audio: true }, (mediaStream) => {

    currentUserVideoRef.current.srcObject = mediaStream;
    currentUserVideoRef.current.play();

    const call = peerInstance.current.call(remotePeerIdValue, mediaStream)

    call.on('stream', (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream
      remoteVideoRef.current.play();

    })
  })
  const copyToClipboard = () => {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
    alert("URL Copied.");
  };

  return (
    <div class="training-others-main-body">
      <div class="traing-inner-box" >
        <div id="video-grid"></div>
        <video muted ref={currentUserVideoRef} />
        <video muted ref={remoteVideoRef} />
        <div id="video-grid"></div>
      </div>
      <div class="training-others-main_controls">
        <div class="main_controls_block">
          <div
            class="training-others-main_controls_button"
            id="muteButton"
            onclick="muteUnmute()">
            <i class="fa fa-microphone" size="lg"></i>
            <span>Mute</span>
          </div>
          <div
            class="training-others-main_controls_button"
            id="playPauseVideo"
            onclick="playStop()"
          >
            <i class="fa fa-pause"></i>
            <span>Pause Video</span>
          </div>

          <div class="training-others-main_controls_button">
            <i class="fa fa-comment" size="lg"></i>
            <span>Record</span>
          </div>
        </div>
        <div class="training-others-main_controls_block">
          <div class="main_controls_button leaveMeeting" id="leave-meeting">
            <i class="fa fa-times" size="6x"></i>
            <span class="">Leave Meeting</span>
          </div>
        </div>
        <div class="training-others-main_controls_button">
          <div class="main_controls_button leaveMeeting" id="leave-meeting">

            <i class="fa fa-video-camera" size="lg" ></i>
            <input type="button" value="Copy Url" onClick={() => { copyToClipboard(); }} />
            <br />
          </div>
        </div>
      </div>
    </div>
  );

}

export default PeerOthersroom;