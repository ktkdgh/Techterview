import Peer from 'peerjs';
import React, { useEffect, useState, useRef } from 'react';
import "../css/TrainingAloneStartModal.css"
function PeerjsAlone({closeModal}) {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
  
    useEffect(() => {
      const peer = new Peer();
  
      peer.on('open', (id) => {
        setPeerId(id)
      });
  
      peer.on('call', (call) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream)
          call.on('stream', function(remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream
            remoteVideoRef.current.play();
          });
        });
      })
  
      peerInstance.current = peer;
    }, [])
  
    const call = (remotePeerId) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
  
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
  
        const call = peerInstance.current.call(remotePeerId, mediaStream)
  
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    }
    
    return (
        <div>
            <div className="training-alone-start-modal" id="training-alone-start-modal">
                <div className="training-alone-start-modal-content"> 
                    <div className="training-alone-start-modal-body">
                        시작 버튼을 클릭하시면 면접이 시작됩니다.<br/>
                        답변을 완료하신 후 다음 버튼을 클릭하시면 그 다음 문제로 넘어가집니다.
                        면접을 완료한 후 종료 버튼을 클릭해주시기 바랍니다. 
                    </div>
                    <div className="training-alone-start-modal-footer">
                        <button className="btn-yes" onClick={() => {call(remotePeerIdValue); getHide() ; getShow()}} > 시작하기</button>
                    </div>
                </div>
            </div>
        <div>


        </div>
        <div class="video-container">
            <div>
            <video autoPlay muted id="interviewer"  src="/videos/sample1.mp4" loop type="video/mp4" className='VideoBox' style={{ width:" 100%", height: "480px" ,display: "none"}}></video>
                </div>
            <div>
            <video ref={currentUserVideoRef} />
            </div>
        </div>

        <div >
          <video ref={remoteVideoRef}  />
        </div>
      </div>
    );
  }

function getHide(){
    document.getElementById("training-alone-start-modal").style.display = "none"
}

function getShow(){
    
    document.getElementById("interviewer").style.display= ""
    // document.getElementById("interviewer").addEventListener("canplay")
}

// const video = document.getElementById("interviewer");
// video.addEventListener("canplay", function() {
//   setTimeout(function() {
//     video.play();
//   }, 5000);
// });

export default PeerjsAlone;
