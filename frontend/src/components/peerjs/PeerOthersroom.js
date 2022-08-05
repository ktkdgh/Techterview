import React, { useEffect, useState, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InterviewerEndModal from "../modal/InterviewerEndModal"
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import api from '../shared/api';
import { socket } from '../../lib/socket'
import { peer } from '../../lib/peer'
import { uploadFile } from 'react-s3';
import jwt from 'jwt-decode'
import VideoQuestionModal from '../modal/VideoQuestionModal';
import Recognition from '../shared/stt'

const keyWordList = []
const tailList = []
let tempIndex = 0
let tempCheck = "";
let lengthCheck = 0;

function PeerOthersroom() {
  if (!(!!sessionStorage.getItem('Authorization'))) {
    sessionStorage.setItem('url', window.location.href)
    window.location.href = '/login'
  }

  const Token = sessionStorage.getItem('Authorization')
  const userInfo = jwt(Token)

  const url = new URL(window.location.href).pathname.split('/')
  const ROOM_ID = url.slice(-1).pop()
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [interview, Setinterview] = useState(0);
  const [CheckInterview, SetCheckInterview] = useState(false);
  const [mediaRecorder, setMediaRecoder] = useState(null);
  const [recordingMemberId, SetrecordingMemberId] = useState(null);

  const { key } = useParams();
  const [Questions, SetQuestions] = useState([]);
  const [QuestionsIndex, SetQuestionsIndex] = useState(0);
  const [QuestionString, SetQuestionString] = useState("");

  useEffect(() => {
    async function getQuestions() {
      await api.get(`/api/training/alone/questions/${key}`)
        .then(res => {
          SetQuestions(res.data);
          for (let value of res.data) {
            keyWordList.push(value.questions_keyword)
            tailList.push(value.questions_tail)
          }
        });
    } getQuestions();
  }, []);



  const getQuestion = () => {
    if (Questions && Questions.length !== 0) {
      if (QuestionsIndex !== -1) {
        const q = Questions[QuestionsIndex];
        if (q && q.length !== 0) {
          return q.questions_name;
        }
      }
    }
  };

  useEffect(() => {
    peer.on("open", (id) => {
      const sockId = socket.id
      socket.emit("joinRoom", ROOM_ID, id, sockId, userInfo);
    });

    socket.on('sttSoket', (msg) => {
      let keyWordArray = keyWordList[tempIndex].split(',');
      let tailArray = tailList[tempIndex].split(',');
      let msgReplace = msg.replace(/ /g, '');
      let keywordsTemp = "";
      
      if (lengthCheck !== keyWordList[tempIndex].split(',').length){
        for (let value of keyWordArray) {
          if (msgReplace.indexOf(value) !== -1) {
            let msgStart = msgReplace.indexOf(value);
            let msgEnd = msgReplace.indexOf(value.slice(-1), msgStart);
            keywordsTemp = msgReplace.slice(msgStart, msgEnd + 1);
        
            if (keywordsTemp.length !== value.length || tempCheck === keywordsTemp) {
              keywordsTemp = "";
              continue;
            }  
            break;
          }
        }
      } else {
        SetQuestionString("꼬리질문이 끝났습니다. 답변이 끝나면 다음 질문을 진행해주세요!")
      }

      if (keywordsTemp) {
        for (let value of tailArray) {
          let valueReplace = value.replace(/ /g, '');
          if (valueReplace.indexOf(keywordsTemp) !== -1) {
            SetQuestionString(value);
            lengthCheck++;
            break;
          }
        }
        tempCheck = keywordsTemp;
      }
    });

    socket.on("user-connected", (userId, user2Info, roomInfo) => {
      if (roomInfo.checkedInterview === "1") {
        socket.emit("recordingMemberId", roomInfo.memberId, ROOM_ID)
      } else {
        SetrecordingMemberId(user2Info.id)
      }
      setRemotePeerIdValue(userId);
    });

    socket.on("getRoominfo", (roomInfo) => {
      if (interview === 0) {
        Setinterview(roomInfo.checkedInterview)
      }
      SetCheckInterview(roomInfo.memberId === userInfo.id)
    })

    socket.on("recordingId", (recordingId) => {
      SetrecordingMemberId(recordingId)
    })

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

  const [openModal, setOpenModal] = useState(false);
  let recordedMediaURL = null;
  const [recordedChunks, setRecordedChunks] = useState([]);

  const call = () => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
    })
  }

  const start = () => {
    let mediaRecorder = new MediaRecorder(remoteVideoRef.current.srcObject, {
      mimeType: 'video/webm; codecs=vp8'
    });
    mediaRecorder.start(); 

    mediaRecorder.ondataavailable = function (e) {
      recordedChunks.push(e.data);
    };
    setMediaRecoder(mediaRecorder);
  }


  function finish() {
    mediaRecorder.onstop = function () {
      if (recordedMediaURL) {
        URL.revokeObjectURL(recordedMediaURL);
      }

      const blob = new Blob(recordedChunks, { type: 'video/mp4;' });
      const fileName = uuid();
      const recordFile = new File([blob], fileName + ".mp4", {
        type: blob.type,
      })

      recordedMediaURL = window.URL.createObjectURL(recordFile);

      const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      };

      uploadFile(recordFile, config)
        .then(recordFile => {
          api.post('/api/training/alone/recordingCreate', {
            id: recordingMemberId,
            title: (Questions[QuestionsIndex]).questions_name,
            recording_url: recordFile.location
          })
            .then(res => {
              console.log(res.data);
            })
        })
        .catch(err => console.error(err))
      recordedChunks.pop()

    };
    mediaRecorder.stop();
  }

  function goToHome() {
    window.location.replace(`/`)
  }

  function BasicExample() {
    return (
      <Spinner animation="border" role="status" style={{ width: "10rem", height: "10rem" }} className="loading-spinner"></Spinner>
    );
  }

  if (interview === 0) {
    return (
      <div className="auth-loader-wrapper">
        <div className="auth-loader">
          <div><BasicExample ></BasicExample></div>
          <div className="display-3">로딩중 ..........</div>
        </div>
      </div>
    );
  }

  return (
    <div className="training-others-main-body">
      <div id="training-others-wrapper" >
          <div className="training-others-inner-box" >
            <div className="training-navigation-bar" >
              <div className="navigation-bar-logo" onClick={() => { goToHome() }}> TECHTERVIEW </div>
              <div className="main-controls-button-share-icon" id="copy-link">
              {interview === '1' && CheckInterview ? "": 
                interview === '2' && CheckInterview ? 
                <div className="explanation">
                    <FontAwesomeIcon id="question-mark-icon"icon={faCircleQuestion}  />
                    <div id="explanation-text" className="explanation-text">
                    <i className="fa fa-video-camera" size="lg" style={{color:"white", width:"50px", paddingLeft:"19px"}}  ></i>
                      카메라 버튼을 클릭하면 면접자의 화면이 녹화됩니다. <br></br>
                    <FontAwesomeIcon id="faArrowAltIcon" style={{color:"white", width:"50px"}} icon={faArrowAltCircleRight} />화살표 버튼을 클릭하면 다음 문제로 넘어갑니다. 
                    </div>
                </div>
              :
              interview === '1' ?                
              <div className="explanation">
              <FontAwesomeIcon id="question-mark-icon"icon={faCircleQuestion}  />
              <div id="explanation-text" className="explanation-text">
              <i className="fa fa-video-camera" size="lg" style={{color:"white", width:"50px", paddingLeft:"19px"}}  ></i>
                카메라 버튼을 클릭하면 면접자의 화면이 녹화됩니다. <br></br>
              <FontAwesomeIcon id="faArrowAltIcon" style={{color:"white", width:"50px"}} icon={faArrowAltCircleRight} />화살표 버튼을 클릭하면 다음 문제로 넘어갑니다. 
              </div>
          </div> : ""}
                    <FontAwesomeIcon icon={faShareFromSquare} onClick={() => { copyToClipboard(); }} />
                  </div>
            </div>
              <div className="others-question-video-container">
                <div className="training-others-main-controls">
                  {interview === '1' && CheckInterview ? <div className="main-controls-block">
                  <div id="other-questions" >면접관 안내에 따라 면접을 진행해주시기 바랍니다.</div>
                  <br /><Recognition /><br /><br /><br /></div> :
                    interview === '2' && CheckInterview ?
                      <div className="main-controls-block">
                        <div id='alone-questions' > {QuestionString ? QuestionString : getQuestion()} </div>
                        <div
                          className="training-alone-main-controls-button"
                          id="startRecord"
                          onClick={() => { start(); getHide(); }}>
                          <i className="fa fa-video-camera" size="lg" ></i>
                          <span></span>
                        </div>
                        <div className="training-alone-main-controls-button" onClick={() => {
                          SetQuestionString("")
                          tempIndex++;
                          tempCheck = "";
                          lengthCheck = 0;
                          SetQuestionsIndex(QuestionsIndex + 1)
                          finish();
                          setTimeout(() => {
                            start();
                          }, 500);
                        }}>
                          <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />

                        </div>
                      </div> :
                      interview === '1' ?
                        <div className="main-controls-block" >
                          <div id='alone-questions' >{QuestionString ? QuestionString : getQuestion()} </div>
                          <div
                            className="training-alone-main-controls-button"
                            id="startRecord"
                            onClick={() => { start(); getHide(); }}>
                            <i className="fa fa-video-camera" size="lg" ></i>
                            <span></span>
                          </div>
                          <div className="training-alone-main-controls-button" onClick={() => {
                            SetQuestionString("")
                            tempIndex++;
                            tempCheck = "";
                            lengthCheck = 0;
                            SetQuestionsIndex(QuestionsIndex + 1)
                            finish();
                            setTimeout(() => {
                              start();
                            }, 500);
                          }}>
                            <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />
                          </div>
                        </div> :  
                        <div className="main-controls-block">
                          <div id='alone-questions' >면접관 안내에 따라 면접을 진행해주시기 바랍니다.</div>
                        <br /><Recognition /><br /><br /><br /></div> }
                      </div >
              <div id="others-video-container">
                <div className="video-user1" id="video-user1" style={{ zIndex: 0 }}><video id="currentUserVideo" muted ref={currentUserVideoRef} /></div>
                <div className="video-user2" id="video-user2" style={{ zIndex: 0 }}><video id="remoteUserVideo" ref={remoteVideoRef} /></div>
              </div>
            </div>
                <div className="training-navigation-right">
                  <div className="main-controls-button-leave-meeting" id="leave-meeting">
                    <button className="video-end-btn" onClick={() => { setOpenModal(true); hideVideoTimer() }}>나가기</button>
                    {interview === '1' && CheckInterview ? <div> {openModal && <VideoQuestionModal />} </div> :
                      interview === '2' && CheckInterview ? <div> {openModal && <InterviewerEndModal closeModal={setOpenModal} />}  </div> :
                        interview === '1' ? <div> {openModal && <InterviewerEndModal closeModal={setOpenModal} />}  </div> : <div> {openModal && <VideoQuestionModal />} </div>}
                  </div >
                </div>
          </div >
        </div>   
    </div >
  );

  function getHide() {
    document.getElementById("startRecord").style.display = "none"

  }

  function hideVideoTimer() {
    document.getElementById("video-user1").style.display = "none"
    document.getElementById("video-user2").style.display = "none"

  }
}

export default PeerOthersroom;