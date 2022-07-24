import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import VideoQuestionModal from "../modal/VideoQuestionModal"
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Recorder() {
    const currentUserVideoRef = useRef(null);
    const recordedVideo = useRef(null);

    // let mediaStream = null;
    let mediaRecorder = null;
    let recordedMediaURL = null
    // const [recordedMediaURL, setrecordedMediaURL] = useState[""];

    const mediaStream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });

    /*녹화, 질문 버튼 관련 함수 */
    const start = () => {
        let recordedChunks = [];
        // 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출 
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
            mediaRecorder.stop();
        }
    }

    function download() {
        if (recordedMediaURL) {
            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = recordedMediaURL;
            link.download = 'video.mp4';
            link.click();
            document.body.removeChild(link);
        }
    }
    return (
        <div>
            <button onClick={() => { start(); }}>start</button>
            <button onClick={() => { finish(); }}>finish</button>
            <button onClick={() => { download(); }}>download</button>
        </div>
    )

}
export default Recorder;
