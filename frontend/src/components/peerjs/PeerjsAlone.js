import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';
import { v1 as uuid } from 'uuid';
import jwt from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from "../modal/VideoQuestionModal"
import { useParams } from 'react-router-dom';
import { uploadFile } from 'react-s3';
import api from "../shared/api";
import CountDown from './CountDown';
import NoCountDown from './NoCountDown';
import ReadyInterviewModal from "../modal/ReadyInterviewModal";

window.Buffer = window.Buffer || require("buffer").Buffer;

function PeerjsAlone() {

  const Token = sessionStorage.getItem('Authorization')
  const QuestionList = JSON.parse(sessionStorage.getItem('QuestionList'))
  const userInfo = jwt(Token)

  const currentUserVideoRef = useRef(null); //recordRef
  const [openModal, setOpenModal] = useState(false);

  const { key } = useParams();
  const [Questions, SetQuestions] = useState([]);
  const [QuestionsIndex, SetQuestionsIndex] = useState(0);
  const [AudioIndex, SetAudioIndex] = useState(0);

  const [mediaRecorder, setMediaRecoder] = useState(null);
  const [countDown, setCountDown] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      if (key === '15') {
        SetQuestions(QuestionList)
      } else {
        await api.get(`/api/training/alone/questions/${key}`)
          .then(res => {
            SetQuestions(res.data);
          });
      }
    }
    getQuestions();
  }, []);

  const getQuestion = () => {
    if (Questions.length !== 0  && QuestionsIndex < Questions.length) {
      if (Questions && Questions.length !== 0) {
        if (QuestionsIndex !== -1) {
          const q = Questions[QuestionsIndex];
          if (q && q.length !== 0) {
            return q.questions_name;
          }
        }
      }
    } else if (Questions.length !== 0) {
      return "면접이 종료되었습니다 나가기 버튼을 눌러주세요!"
    }
  };



  const getQuestionAudio = () => {
    if (Questions && Questions.length !== 0) {
      if (QuestionsIndex !== -1) {
        const q = Questions[AudioIndex];
        if (q && q.length !== 0) {
          return q.questions_url;
        }
      }
    }
  };

  let recordedMediaURL = null;
  const [recordedChunks, setRecordedChunks] = useState([]);

  const mediaStream = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });

  const call = () => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
    })
  }


  const start = () => {
    let mediaRecorder = new MediaRecorder(currentUserVideoRef.current.srcObject, {
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
        type: blob.type
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
            id: userInfo.id,
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

  let audio = new Audio(getQuestionAudio());

  function goToHome() {
    window.location.replace(`/`)
  }

  return (
    <div>
      <div className='training-alone-start-modal' id='training-alone-start-modal' style={{ zIndex: "1" }}>
        <div className='training-alone-start-modal-content'>
          <div className='training-alone-start-modal-body'>
            <ReadyInterviewModal onStart={() => {
              call(); setCountDown(true); getHide(); getShow();  SetAudioIndex(AudioIndex + 1); audio.play();
              setTimeout(() => {
              }, 1500);
            }} />

          </div>
          <div className='training-alone-start-modal-footer'>
          </div >
        </div >
      </div >

      <div id="alone-wrapper" >

        <div className="alone-video-controls-button-container ">
          <div className="training-navigation-bar" >
            <div className="navigation-bar-logo" onClick={() => { goToHome() }}> TECHTERVIEW </div>
          </div>
          <div id="alone-video-container" >

            <div className="training-alone-main-controls">
              <div className="main-controls-block">
                <div id='alone-questions' style={{ display: "none" }}>{getQuestion()}</div>

                <div id="training-alone-main-controls-button" className="training-alone-main-controls-button" onClick={() => {
                  audio.play();
                  setCountDown(true);
                  SetQuestionsIndex(QuestionsIndex + 1);
                  SetAudioIndex(AudioIndex + 1);
                  finish();
                  setTimeout(() => {
                  }, 500);
                  hideNext();
                }}>
                  <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight}  style={{ display: "none" }}/>
                </div>
              </div>
            </div>

            <div className="video-timer-container">
              <div className="video-user1" id="video-user1" style={{ display: "none" }}>
                {countDown === true ?  <CountDown start={start} setCountDown={setCountDown} showNext={showNext}></CountDown> : <NoCountDown start={start}></NoCountDown>}

                <div className="button-wrapper">
                  <button id="answer-btn" onClick={() => { start(); setCountDown(false); showNext() }}>
                    답변 하기
                  </button>
                </div>
              </div>
              <div className="video-user2" id="video-user2"><video style={{ zIndex: "0" }} id="aloneCurrentUserVideoRef" muted ref={currentUserVideoRef} ></video></div>
              <div className="training-navigation-right">
                <div className="main-controls-button-leave-meeting" id="leave-meeting">
                  <button className="video-end-btn" onClick={() => { setOpenModal(true); hideVideoTimer() }}>나가기</button>
                  {openModal && <VideoQuestionModal />}
                </div >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getHide() {
  document.getElementById("training-alone-start-modal").style.display = "none"

}
function hideVideoTimer() {
  document.getElementById("video-user1").style.display = "none"
  document.getElementById("video-user2").style.display = "none"

}
function hideNext() {
  document.getElementById("faArrowAltIcon").style.display = "none"
  document.getElementById("answer-btn").style.display = ""
}

function showNext() {
  document.getElementById("faArrowAltIcon").style.display = ""
  document.getElementById("answer-btn").style.display = "none"
}

function getShow() {
  document.getElementById("video-user1").style.display = ""
  document.getElementById("alone-questions").style.display = ""
  document.getElementById("training-alone-main-controls-button").style.display = ""

}

export default PeerjsAlone;