import React, { useEffect, useState, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InterviewerEndModal from "../modal/InterviewerEndModal"
import { faArrowAltCircleRight, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import api from '../shared/api';
import { socket } from '../../lib/socket'
import { peer } from '../../lib/peer'
import { uploadFile } from 'react-s3';
import jwt from 'jwt-decode'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from '../modal/VideoQuestionModal';
import Recognition from '../shared/stt'


const temp = []
let tempIndex = 0
let templist = ['계층에 대해 자세히 설명해주세요!', '란 무엇이고 어떻게 동작하나요?' ]
let i = 0;

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
  const [Actions, SetActions] = useState([]);
  const [QuestionString, SetQuestionString] = useState("");

  useEffect(() => {
    async function getQuestions() {
      await api.get(`/api/training/alone/questions/${key}`)
        .then(res => {
          SetQuestions(res.data);
          for (let value of res.data) {
            SetActions(Actions => [...Actions, value.questions_keyword])
            temp.push(value.questions_keyword)
          }
        });
    }
    getQuestions();
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

  const getAction = () => {
    if (Actions && Actions.length !== 0) {
      if (QuestionsIndex !== -1) {
        const q = Actions[QuestionsIndex];
        if (q && q.length !== 0) {
          return q;
        }
      }
    }
  }


  useEffect(() => {
    peer.on("open", (id) => {
      const sockId = socket.id
      socket.emit("joinRoom", ROOM_ID, id, sockId, userInfo);
    });

    socket.on('sttSoket', (msg) => {
      console.log('sttSoket: ', msg);
      let tempArray = temp[tempIndex].split(',')
      let keywordsTemp
      for (let value of tempArray) {
        if (msg.indexOf(value) !== -1) {
          let msgStart = msg.indexOf(value);
          let msgEnd = msg.indexOf(value.slice(-1), msgStart);
          keywordsTemp = msg.slice(msgStart, msgEnd+1);
          temp[tempIndex] = temp[tempIndex].replace(keywordsTemp, "/")
          console.log("temp[tempIndex] : ", temp[tempIndex]);
          if (temp[tempIndex].indexOf(value)){
            console.log(temp[tempIndex].match(value));
          }
          break;
        }
      }
      if (keywordsTemp){
        if (templist.length < i) {
          i = templist.length -1
        }
        SetQuestionString(`${keywordsTemp}` + templist[i]);
        i++;
        keywordsTemp = "";
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
    // 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출 
    let mediaRecorder = new MediaRecorder(remoteVideoRef.current.srcObject, {
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
    setMediaRecoder(mediaRecorder);
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
                    <FontAwesomeIcon icon={faShareFromSquare} onClick={() => { copyToClipboard(); }} />
                  </div>

            </div>





              <div className="others-question-video-container">
                <div className="training-others-main-controls">

                  {interview === '1' && CheckInterview ? <div className="main-controls-block"><br /><Recognition /><br /><br /><br /></div> :
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
                          i = 0;
                          SetQuestionsIndex(QuestionsIndex + 1)
                          finish();
                          setTimeout(() => {
                            start();
                          }, 500);
                        }}>
                          <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />

                        </div>
                        <div className="training-alone-main-controls-button">
                          <FontAwesomeIcon id="faCommentDots" icon={faCommentDots} onClick={() => { getShow() }} />
                        </div>
                        <div className="ballon" id="ballon" style={{ display: "none" }}> {getAction()} </div>
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
                            i = 0;
                            SetQuestionsIndex(QuestionsIndex + 1)
                            finish();
                            setTimeout(() => {
                              start();
                            }, 500);
                          }}>
                            <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />

                          </div>
                          <div className="training-alone-main-controls-button" >
                            <FontAwesomeIcon id="faCommentDots" icon={faCommentDots} onClick={() => { getShow() }} />
                          </div>
                          <div className="ballon" id="ballon" style={{ display: "none" }}> {getAction()} </div>
                        </div> : <div className="main-controls-block" id="main-controls-interviewee"><Recognition /></div>}
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
  function getShow() {
    document.getElementById("ballon").style.display = ""
  }

  function hideVideoTimer() {
    document.getElementById("video-user1").style.display = "none"
    document.getElementById("video-user2").style.display = "none"

  }
}

export default PeerOthersroom;


