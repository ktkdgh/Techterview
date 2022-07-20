import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';
import uuid from 'react-uuid';

// function PeerjsAlone() {
//   const currentUserVideoRef = useRef(null);
//   const call = () => {
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//     getUserMedia({ video: true, audio: true }, (mediaStream) => {
//       currentUserVideoRef.current.srcObject = mediaStream;
//       currentUserVideoRef.current.play();
//     });
//   }
function PeerjsAlone() {
  const currentUserVideoRef = useRef(null);
  const recordedVideo = useRef(null);

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
            <button className='btn-yes' onClick={() => { call(); getHide(); getShow(); }} > 시작하기</button>
          </div >
        </div >
      </div >
      <div class='video-container'>
        <div>
          <video autoPlay muted loop id='interviewer' src='/videos/sample1.mp4' type='video/mp4' className='VideoBox' style={{ width: '100%', height: '480px', display: 'none' }} ></video>
        </div>
        <div>
          <video muted ref={currentUserVideoRef} />
          <button onClick={() => { start(); }} >1</button>
          <button onClick={() => { finish(); }} >2</button>
          <button onClick={() => { download(); }} >3</button>
        </div>
      </div >
    </div >
  );
}

function getHide() {
  document.getElementById("training-alone-start-modal").style.display = "none"
}
function getShow() {
  document.getElementById("interviewer").style.display = "none"
}


export default PeerjsAlone;