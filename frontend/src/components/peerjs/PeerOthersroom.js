import Peer from 'peerjs';
import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from "../modal/VideoQuestionModal"
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import uuid from 'react-uuid';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';


import { uploadFile } from 'react-s3';

//함께하기에서는 버퍼 문제가 없는듯
// window.Buffer = window.Buffer || require("buffer").Buffer; 

function PeerOthersroom() {

  const socket = io.connect('http://localhost:8001')
  const url = window.location.pathname.split('/');
  const ROOM_ID = url[5]
  // console.log(ROOM_ID);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');


  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      socket.emit("join-room", ROOM_ID, id);
      // console.log(ROOM_ID, peer);
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



  const [flag, setFlag] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  // let mediaStream = null;
  let mediaRecorder = null;
  let recordedMediaURL = null;
  let recordedChunks = [];

  const mediaStream = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });

  /* 화면 노출 */
  const call = () => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
    })
  }


  /*녹화, 질문 버튼 관련 함수 */
  const start = () => {
    // let recordedChunks = [];

    // 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출 
    mediaRecorder = new MediaRecorder(currentUserVideoRef.current.srcObject, {
      mimeType: 'video/webm; codecs=vp8'
    });
    mediaRecorder.start(); // 함수 마지막에 있던것을 올리니깐 start 정상작동

    console.log("start check");
    console.log("mediaRecorder start:", mediaRecorder); // 첫 start 여기까지 출력

    // 2. 전달받는 데이터를 처리하는 이벤트 핸들러 등록
    mediaRecorder.ondataavailable = function (e) {
      console.log('ondataavailable');
      console.log("e.data:", e.data);
      recordedChunks.push(e.data);
    };
  }


  function finish() {
    mediaRecorder.onstop = function () {
      // createObjectURL로 생성한 url을 사용하지 않으면 revokeObjectURL 함수로 지워줘야합니다.
      // 그렇지 않으면 메모리 누수 문제가 발생합니다.
      console.log('mediaRecorder.onstop:', mediaRecorder);
      if (recordedMediaURL) {
        URL.revokeObjectURL(recordedMediaURL);
      }

      const blob = new Blob(recordedChunks, { type: 'video/mp4;' });
      const fileName = uuid();
      const recordFile = new File([blob], fileName + ".mp4", {
        type: blob.type,
      })
      console.log("recordFile:", recordFile);

      recordedMediaURL = window.URL.createObjectURL(recordFile);

      // aws s3 upload 설정 
      const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        dirName: process.env.REACT_APP_DIR_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      };

      console.log("data:", data);
      console.log("recordFile:", recordFile);

      uploadFile(recordFile, config)
        .then(recordFile => console.log(recordFile))
        .catch(err => console.error(err))

      //로컬 다운로드 기능
      // const link = document.createElement('a');
      // document.body.appendChild(link);
      // link.href = recordedMediaURL;
      // link.download = 'video.mp4';
      // link.click();

    };
    mediaRecorder.stop();
  }


  const { key } = useParams();
  let data = [];
  const [Questions, SetQuestions] = useState([]);
  const [QuestionsIndex, SetQuestionsIndex] = useState(0);
  const [AudioIndex, SetAudioIndex] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      const data = await axios.get(`http://localhost:8000/training/alone/api/questions/${key}`).then(res => {
        // console.log(res)
        SetQuestions(res.data);
      });

    }
    getQuestions();

  }, []);

  const getQuestion = () => {
    if (Questions && Questions.length !== 0) {
      if (QuestionsIndex !== -1) {
        const q = Questions[QuestionsIndex];
        if (q && q.length !== 0) {
          return q[0];
        }
      }
    }
  };
  const getQuestionAudio = () => {
    if (Questions && Questions.length !== 0) {
      if (QuestionsIndex !== -1) {
        const q = Questions[AudioIndex];
        if (q && q.length !== 0) {
          return q[1];
        }
      }
    }
  };

  let audio = new Audio(getQuestionAudio());




  return (
    <div class="training-others-main-body">
      <div class="training-others-inner-box" >
        <div class="training-others-main-controls-share-button" >
          <div class="main-controls-button-share-icon" id="leave-meeting">
            <FontAwesomeIcon icon={faShareFromSquare} onClick={() => { copyToClipboard(); }} />
          </div>
        </div>
        <div id="video-grid">
          <video muted ref={currentUserVideoRef} />
          <video muted ref={remoteVideoRef} />
        </div>
      </div>

      <div class="training-others-main-controls">
        <div class="main-controls-block">
          {/* <div
            class="training-others-main-controls-button"
            id="playPauseVideo"
            onClick="playStop()">
            <i class="fa fa-video-camera" size="lg" ></i>
            <span onClick={() => { start(); }}>Record</span>
          </div>
          <div class="training-others-main-controls-button">
            <i class="fa fa-pause"></i>
            <span onClick={() => { finish(); }}>Pause Record</span>
          </div> */}
          <button onClick={() => { start(); }}>start</button>
          <button onClick={() => { finish(); }}>finish</button>

          <div class="training-others-main-controls-button">
            <FontAwesomeIcon icon={faCloudArrowDown} />
          </div>
          <div class="training-others-main-controls-button" onClick={() => {
            audio.play()
            SetQuestionsIndex(QuestionsIndex + 1)
            SetAudioIndex(AudioIndex + 1)
          }}>
            <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />
            Next
          </div>

        </div>
        <div class="training-others-main-controls-block">
          <div class="main-controls-button-leave-meeting" id="leave-meeting">

            <button class="video-end-btn" onClick={() => { setOpenModal(true); }}>End</button>
            {openModal && <VideoQuestionModal closeModal={setOpenModal} />}

          </div >
        </div >

      </div >

    </div >
  );

}

export default PeerOthersroom;