import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';
import { v1 as uuid } from 'uuid';
import jwt from "jwt-decode";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from "../modal/VideoQuestionModal"
import { useParams } from 'react-router-dom';
import { uploadFile } from 'react-s3';
import api from "../shared/api";

window.Buffer = window.Buffer || require("buffer").Buffer;

function PeerjsAlone() {
  const Token = sessionStorage.getItem('Authorization')
  const QuestionList = sessionStorage.getItem('QuestionList')
  const userInfo = jwt(Token)

  const currentUserVideoRef = useRef(null); //recordRef
  const [openModal, setOpenModal] = useState(false);
  const [RecordingUrl, SetRecordingUrl] = useState('');
  const { key } = useParams();
  const [Questions, SetQuestions] = useState([]);
  const [QuestionsIndex, SetQuestionsIndex] = useState(0);
  const [AudioIndex, SetAudioIndex] = useState(0);

  const [isFinish, setIsFinish] = useState(false);
  const [mediaRecorder, setMediaRecoder] = useState(null);


  useEffect(() => {
    async function getQuestions() {
      const data = await api.get(`/api/training/alone/questions/${key}`)
        .then(res => {
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
  // let mediaStream = null;
  // let mediaRecorder = null;
  let recordedMediaURL = null;
  const [copy, setCopy] = useState();
  // let recordedChunks = [];
  const [recordedChunks, setRecordedChunks] = useState([]);

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
    console.log("녹화 시작합니다 ~~~");
    // let recordedChunks = [];

    // 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출 
    // let mediaRecorder2 = new MediaRecorder(currentUserVideoRef.current.srcObject, {
    //   mimeType: 'video/webm; codecs=vp8'
    // });
    let mediaRecorder = new MediaRecorder(currentUserVideoRef.current.srcObject, {
      mimeType: 'video/webm; codecs=vp8'
    });
    mediaRecorder.start(); // 함수 마지막에 있던것을 올리니깐 start 정상작동
    console.log("녹화 중일까!!!?");

    // 2. 전달받는 데이터를 처리하는 이벤트 핸들러 등록
    mediaRecorder.ondataavailable = function (e) {
      console.log("e.data:", e.data);
      recordedChunks.push(e.data);
      // setCopy(recordedChunks);

      // // setIsFinish(true);
      // setCopy(recordedChunks);
      // console.log("set copy", copy);
    };

    setMediaRecoder(mediaRecorder);
  }

  function finish() {

    mediaRecorder.onstop = function () {
      // createObjectURL로 생성한 url을 사용하지 않으면 revokeObjectURL 함수로 지워줘야합니다.
      // 그렇지 않으면 메모리 누수 문제가 발생합니다.
      if (recordedMediaURL) {
        URL.revokeObjectURL(recordedMediaURL);
      }

      console.log("finish copy!!!!:", copy);
      console.log("recordedchunks", recordedChunks);
      // recordedChunks = copy
      const blob = new Blob(recordedChunks, { type: 'video/mp4;' });
      const fileName = uuid();
      const recordFile = new File([blob], fileName + ".mp4", {
        type: blob.type
      })
      console.log("finish blob", blob);
      recordedMediaURL = window.URL.createObjectURL(recordFile);
      // aws s3 upload 설정 
      const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        // dirName: process.env.REACT_APP_DIR_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      };
      console.log("recordedchunks22", recordedChunks);
      // uploadFile(recordFile, config)
      //   .then(recordFile => console.log(recordFile))
      //   .catch(err => console.error(err))

      uploadFile(recordFile, config)
        .then(recordFile => {
          api.post('/api/training/alone/recordingCreate', {
            id: userInfo.id,
            title: (Questions[QuestionsIndex])[0],
            recording_url: recordFile.location
          })
            .then(res => {
              console.log(res.data);
            })
          console.log(recordFile);
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
      <div className='training-alone-start-modal' id='training-alone-start-modal' >
        <div className='training-alone-start-modal-content'>
          <div className='training-alone-start-modal-body'>
            시작 버튼을 클릭하시면 면접이 시작됩니다.<br />
            답변을 완료하신 후 다음 버튼을 클릭하시면 그 다음 문제로 넘어가집니다.
            면접을 완료한 후 종료 버튼을 클릭해주시기 바랍니다.
          </div>
          <div className='training-alone-start-modal-footer'>
            <button className='btn-yes' onClick={() => {
              call(); getHide(); getShow(); SetAudioIndex(AudioIndex + 1); audio.play();
              setTimeout(() => {
                start();
              }, 1200);
            }} > 시작하기</button>
          </div >
        </div >
      </div >


      <div className="training-navigation-bar" >
        <div className="navigation-bar-logo" onClick={() => { goToHome() }}> TECHTERVIEW </div>

        <div className="training-navigation-right">
          <div className="main-controls-button-leave-meeting" id="leave-meeting">
            <button className="video-end-btn" onClick={() => { setOpenModal(true); }}>End</button>
            {openModal && <VideoQuestionModal closeModal={setOpenModal} />}
          </div >
        </div>
      </div>


      <div id='alone-questions' style={{ color: 'black', fontSize: '32px', textAlign: "center", display: "none" }}>{getQuestion()}</div>
      <div id="alone-wrapper">
        <div className="alone-video-controls-button-container ">
          <div id="alone-video-container" >
            <div className="video-user1" id="video-user1" style={{ display: "none" }}>
              <video autoPlay muted loop id='interviewer' src='/videos/sample1.mp4' type='video/mp4' className='interviewer'></video>
            </div>
            <div className="video-user2"><video id="aloneCurrentUserVideoRef" muted ref={currentUserVideoRef}></video></div>
          </div>
          <div class="training-alone-main-controls">
            <div class="main-controls-block">
              <>
                <button onClick={() => { start(); }}>start</button>
                {/* <button onClick={() => { download(); }}>download</button> */}
              </>
              <div class="training-alone-main-controls-button" onClick={() => {
                audio.play()
                SetQuestionsIndex(QuestionsIndex + 1)
                SetAudioIndex(AudioIndex + 1)
                finish();
                setTimeout(() => {
                  start();
                }, 500);
              }}>
                <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />
                Next
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
function getShow() {
  document.getElementById("video-user1").style.display = ""
  document.getElementById("alone-questions").style.display = ""
}

export default PeerjsAlone;