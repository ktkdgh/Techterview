import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';
import { v1 as uuid } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from "../modal/VideoQuestionModal"
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { uploadFile } from 'react-s3';

window.Buffer = window.Buffer || require("buffer").Buffer;

function PeerjsAlone() {
  const currentUserVideoRef = useRef(null); //recordRef
  const recordedVideo = useRef(null); // stopRef

  // const [videoUrl, setVideoUrl] = useState("");
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
    // TypeError: Failed to construct 'MediaRecorder': parameter 1 is not of type 'MediaStream'.
    mediaRecorder = new MediaRecorder(currentUserVideoRef.current.srcObject, {
      mimeType: 'video/webm; codecs=vp8'
    });
    mediaRecorder.start(); // 함수 마지막에 있던것을 올리니깐 start 정상작동

    console.log("start check");
    console.log("mediaRecorder start:", mediaRecorder); // 첫 start 여기까지 출력

    // 2. 전달받는 데이터를 처리하는 이벤트 핸들러 등록
    mediaRecorder.ondataavailable = function (e) {
      console.log('ondataavailable');
      recordedChunks.push(e.data);
    };

    // 초기 start 누르고 난 뒤 이후, 나머지는 동일하게 작동, 이제부터 밑으로는 크게 변화함

    //on.stop  원래 지점 잠시이동
    // 3. 녹화 중지 이벤트 핸들러 등록 /
    // mediaRecorder.onstop = function () {
    //   // createObjectURL로 생성한 url을 사용하지 않으면 revokeObjectURL 함수로 지워줘야합니다.
    //   // 그렇지 않으면 메모리 누수 문제가 발생합니다.
    //   console.log('mediaRecorder.onstop:', mediaRecorder);
    //   if (recordedMediaURL) {
    //     URL.revokeObjectURL(recordedMediaURL);
    //   }

    //   const blob = new Blob(recordedChunks, { type: 'video/mp4;' });
    //   const fileName = uuid();
    //   const recordFile = new File([blob], fileName + ".mp4", {
    //     type: blob.type,
    //   })
    //   console.log("recordFile:", recordFile);

    //   recordedMediaURL = window.URL.createObjectURL(recordFile);
    //   // recordedVideo.src = recordedMediaURL; // 사용되지 않는 코드로 판별

    //   console.log("before record");
    //   // 녹화 관련 설정 
    //   const config = {
    //     bucketName: process.env.REACT_APP_S3_BUCKET,
    //     dirName: process.env.REACT_APP_DIR_NAME,
    //     region: process.env.REACT_APP_REGION,
    //     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    //     secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    //   };
    //   console.log("recording");

    //   uploadFile(recordFile, config)
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err))
    //   console.log("recored");
    // };
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
      // recordedVideo.src = recordedMediaURL; // 사용되지 않는 코드로 판별

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

      // console.log("document.createElement('a');", document)


      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = recordedMediaURL;
      link.download = 'video.mp4';
      link.click();



      // const link = document.createElement('a');
      // document.body.appendChild(link);
      // link.href = recordedMediaURL;
      // link.download = 'video.mp4';
      // link.click();
      // document.body.removeChild(link);

    };
    mediaRecorder.stop();
  }

  // function download() {
  //   if (recordedMediaURL) {
  //   }
  // }

  // 녹화 관련 설정 

  // const config = {
  //   bucketName: "techterview",
  //   dirName: "test",
  //   region: "ap-northeast-2",
  //   accessKeyId: "AKIAU6F7Y3ACUVNPW6XG",
  //   secretAccessKey: "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",
  // };

  // uploadFile(recordFile, config)
  //   .then(data => console.log(data))
  //   .catch(err => console.error(err))


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
    // call();
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
    <div>
      <div className='training-alone-start-modal' id='training-alone-start-modal'>
        <div className='training-alone-start-modal-content'>
          <div className='training-alone-start-modal-body'>
            시작 버튼을 클릭하시면 면접이 시작됩니다.<br />
            답변을 완료하신 후 다음 버튼을 클릭하시면 그 다음 문제로 넘어가집니다.
            면접을 완료한 후 종료 버튼을 클릭해주시기 바랍니다.
          </div>
          <div className='training-alone-start-modal-footer'>
            <button className='btn-yes' onClick={() => { call(); getHide(); getShow(); SetAudioIndex(AudioIndex + 1); audio.play(); }} > 시작하기</button>
          </div >
        </div >
      </div >


      <div id='alone-questions' style={{ color: 'white', fontSize: '32px', textAlign: "center", display: "none" }}>{getQuestion()}</div>





      <div class="training-alone-main-body">
        <div class="traing-inner-box">
          <div class='video-container'>
            <div>
              <video autoPlay muted loop id='interviewer' src='/videos/sample1.mp4' type='video/mp4' className='VideoBox' style={{ width: '100%', height: '480px', display: 'none' }} ></video>
            </div>
            <div>
              <video muted ref={currentUserVideoRef}></video>
            </div>
          </div>
        </div>
        <div class="training-alone-main-controls">
          <div class="main-controls-block">
            {/* <div
              class="training-alone-main-controls-button"
              id="playPauseVideo">
              <i class="fa fa-video-camera" size="lg" ></i>
              <span onClick={() => { start(); }}>Record</span>
            </div>
            <div class="training-alone-main-controls-button">
              <i class="fa fa-pause"></i>
              <span onClick={() => { finish(); }}>Pause Record</span>
            </div>
            <div class="training-alone-main-controls-button">
              <FontAwesomeIcon icon={faCloudArrowDown} />
              <span onClick={() => { download(); }}>Download</span>
            </div> */}
            <>
              <button onClick={() => { start(); }}>start</button>
              {/* <button onClick={() => {  finish();}}>finish</button> */}
              {/* <button onClick={() => { download(); }}>download</button> */}
            </>
            <div class="training-alone-main-controls-button" onClick={() => {
              audio.play()
              SetQuestionsIndex(QuestionsIndex + 1)
              SetAudioIndex(AudioIndex + 1)
              finish();
            }}>
              <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />
              Next
            </div>

          </div>
          <div class="training-alone-main-controls-block">
            <div class="main-controls-button-leave-meeting" id="leave-meeting">

              <button class="video-end-btn" onClick={() => { setOpenModal(true); }}>End</button>
              {openModal && <VideoQuestionModal closeModal={setOpenModal} />}

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
  document.getElementById("interviewer").style.display = ""
  document.getElementById("alone-questions").style.display = ""


}




export default PeerjsAlone;