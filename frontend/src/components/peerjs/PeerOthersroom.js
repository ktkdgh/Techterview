import Peer from 'peerjs';
import React, { useEffect, useState, useRef } from 'react';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal  from "../modal/VideoQuestionModal"
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { faShareFromSquare} from '@fortawesome/free-solid-svg-icons';
import api from '../shared/api';
import {socket} from '../../lib/socket'

function PeerOthersroom() {

  const url = window.location.pathname.split('/');
  const ROOM_ID = url[-1]
  console.log(ROOM_ID);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');


  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      const sockId = socket.id
      socket.emit("joinRoom", ROOM_ID, id, sockId);
      console.log(ROOM_ID, peer, socket);

    });

    socket.on("user-connected", (userId) => {
      console.log("remotePEer", userId)
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


let mediaRecorder = null;
let recordedMediaURL = null;
const recordedVideo = useRef(null);
const [openModal, setOpenModal] = useState(false);

 /*녹화, 질문 버튼 관련 함수 */
const start = () => {
  let recordedChunks = [];
  // 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출 
  // TypeError: Failed to construct 'MediaRecorder': parameter 1 is not of type 'MediaStream'.
  mediaRecorder = new MediaRecorder(currentUserVideoRef.current.srcObject);

  // 2. 전달받는 데이터를 처리하는 이벤트 핸들러 등록
  mediaRecorder.ondataavailable = function (e) {
    if (e.data && e.data.size > 0) {
      console.log('ondataavailable');
      recordedChunks.push(e.data);
    }
  };

  // 3. 녹화 중지 이벤트 핸들러 등록
  mediaRecorder.onstop = function () {
    // createObjectURL로 생성한 url을 사용하지 않으면 revokeObjectURL 함수로 지워줘야합니다.
    // 그렇지 않으면 메모리 누수 문제가 발생합니다.
    if (recordedMediaURL) {
      URL.revokeObjectURL(recordedMediaURL);
    }

    const blob = new Blob(recordedChunks, { type: 'video/webm;' });
    const fileName = uuid();
    const recordFile = new File([blob], fileName + ".webm", {
      type: blob.type,
    })
    recordedMediaURL = window.URL.createObjectURL(recordFile);
    recordedVideo.src = recordedMediaURL;
  };
  mediaRecorder.start();
}


function finish() {
  if (mediaRecorder) {
    // 5. 녹화 중지
    mediaRecorder.stop();
  }
}

function download() {
  if (recordedMediaURL) {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = recordedMediaURL;
    link.download = 'video.webm';
    link.click();
    document.body.removeChild(link);
  }
}


const { key } = useParams();
let data = [];
const [Questions, SetQuestions] = useState([]);
const [QuestionsIndex, SetQuestionsIndex] = useState(0);
const [AudioIndex, SetAudioIndex] = useState(0);

useEffect(() => {
    async function getQuestions() {
        const data = await api.get(`/training/alone/api/questions/${key}`).then(res => {
            console.log(res)
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
  <div className="training-others-main-body">
    
      <div className="training-others-inner-box" >
        <div className="training-others-main-controls-share-button" >
            <div className="main-controls-button-share-icon" id="leave-meeting">
              <FontAwesomeIcon icon={faShareFromSquare}  onClick={() => { copyToClipboard(); }} />
            </div> 
        </div>
        <div id="video-grid">
          <video ref={currentUserVideoRef} />
          <video ref={remoteVideoRef}  />
        </div>          
      </div>
    
      <div className="training-others-main-controls">
        <div className="main-controls-block">
          <div
            className="training-others-main-controls-button"
            id="playPauseVideo"
            onclick="playStop()">
          <i className="fa fa-video-camera" size="lg" ></i>
            <span onClick={() => { start(); }}>Record</span>
          </div>
          <div className="training-others-main-controls-button">
          <i className="fa fa-pause"></i>
            <span onClick={() => { finish(); }}>Pause Record</span>
          </div>
          <div className="training-others-main-controls-button">
          <FontAwesomeIcon icon={faCloudArrowDown} />
            <span onClick={() => { download(); }}>Download</span>
          </div>
          <div className="training-others-main-controls-button" onClick={() => {
                  audio.play()
                  SetQuestionsIndex(QuestionsIndex + 1)
                  SetAudioIndex(AudioIndex + 1)
              }}>
            <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />
              Next
          </div>

    </div>
        <div className="main-controls-button-leave-meeting" id="leave-meeting">
  
            <button className="video-end-btn" onClick={() => { setOpenModal(true); }}>End</button>
            {openModal && <VideoQuestionModal closeModal={setOpenModal} />}

          </div>
        </div> 

      </div>


  );

}

export default PeerOthersroom;


