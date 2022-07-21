import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from "../modal/VideoQuestionModal"

function PeerjsAlone({ IncreaseAudioIndex, autoAudioPlay, SetQuestionIndex }) {
  const currentUserVideoRef = useRef(null);
  const recordedVideo = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  // let mediaStream = null;
  let mediaRecorder = null;
  let recordedMediaURL = null;

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
  // const call = () => {
  //   var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  //   getUserMedia({ video: true, audio: true }, (mediaStream) => {
  //     currentUserVideoRef.current.srcObject = mediaStream;
  //     currentUserVideoRef.current.play();
  //   })
  // }

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
            <button className='btn-yes' onClick={() => { call(); getHide(); getShow(); autoAudioPlay.play(); IncreaseAudioIndex(); }} > 시작하기</button>
          </div >
        </div >
      </div >



      <div class="training-others-main-body">
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
        <div class="training-others-main_controls">
          <div class="main_controls_block">

            <div
              class="training-others-main_controls_button"
              id="playPauseVideo"
              onclick="playStop()">
              <i class="fa fa-video-camera" size="lg" ></i>
              <span onClick={() => { start(); }}>Record</span>
            </div>
            <div class="training-others-main_controls_button">
              <i class="fa fa-pause"></i>
              <span onClick={() => { finish(); }}>Pause Record</span>
            </div>
            <div class="training-others-main_controls_button">
              <FontAwesomeIcon icon={faCloudArrowDown} />
              <span onClick={() => { download(); }}>Download</span>
            </div>

            {/* <div class="training-others-main_controls_button">
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
            <span class="video-next-btn" onClick={() => { autoAudioPlay.play();SetQuestionIndex(); IncreaseAudioIndex();}}>Next</span>
          </div> */}
          </div>
          <div class="training-others-main_controls_block">
            <div class="main_controls_button-leave-meeting" id="leave-meeting">

              <button class="video-end-btn" onClick={() => { setOpenModal(true); }}>End</button>
              {openModal && <VideoQuestionModal closeModal={setOpenModal} />}

            </div>
          </div>
          <div class="training-others-main_controls_button">

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