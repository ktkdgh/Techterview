
import React, { useEffect, useState, useRef } from 'react';
import { ModalProvider, ModalContext, ModalRoot } from 'react-multi-modal';
import alone from "../images/alone.png";
import '../css/ReadyInterviewModal.css';
import { GrPrevious, GrNext } from "react-icons/gr";




function ReadyInterviewWithModal({ onStart }) {
    const currentUserVideoRef = useRef(null); //recordRef

    const call = () => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
        })
    }

    function Home({ isOpen, modal }) {
        return (
            isOpen && (
                <div className='ready-home-body' >
                    <div>
                    </div>
                    <div className='ready-home-body-contents'>
                        <h2>면접 가이드 및 응시 환경 체크를 시작하겠습니다</h2>
                    </div>
                    <div className='ready-next' onClick={() => showExampleTwoModal(modal)}>
                        <button>
                            <GrNext size="54" />
                        </button>
                    </div>
                </div >
            )
        );
    }

    function Intro({ isOpen, modal }) {
        return (
            isOpen && (
                <div>
                    <div className='ready-intro-body'>
                        <div className='ready-prev' onClick={() => showHomeModal(modal)}>
                            <button>
                                <GrPrevious size="54" />
                            </button>
                        </div>

                        <div>
                            <img src={alone} alt='alone' style={{ marginTop: 20, width: 400, height: 200 }} />
                            <div style={{ marginTop: 40 }} >
                                <h4>면접자가 질문에 답변을 하게되면<br></br>
                                    자동으로 꼬리질문이 생성되게 됩니다.
                                </h4>
                            </div>
                        </div>

                        <div className='ready-next' onClick={() => {
                            showExampleThreeModal(modal)
                            call()
                        }} >
                            <button>
                                <GrNext size="54" />
                            </button>
                        </div>
                    </div>
                </div >
            )
        );
    }

    function Check({ isOpen, modal }) {
        return (
            isOpen && (
                <div className='ready-check-body'>
                    <div className='ready-prev' onClick={() => showExampleTwoModal(modal)}>
                        <button>
                            <GrPrevious size="54" />
                        </button>
                    </div>
                    <div>
                        <h4>면접시작 전 카메라와 음성을 <br></br>
                            확인해주세요</h4>
                    </div>
                    <div className="ready-video-user" id="ready-video-user" >
                        <video muted style={{ zIndex: "0" }} id="aloneCurrentUserVideoRef" ref={currentUserVideoRef} ></video>
                    </div>
                    <div className='ready-next' onClick={() => showExampleFourModal(modal)}>
                        <button>
                            <GrNext size="54" />
                        </button>
                    </div>
                </div>
            )
        );
    }

    function StartInterview({ isOpen, modal }) {
        return (
            isOpen && (
                <div>
                    <div className='ready-start-body' >
                        <div className='ready-prev' onClick={() => { showExampleThreeModal(modal); call(); }} >
                            <button>
                                <GrPrevious size="54" />
                            </button>
                        </div>
                        <div  >
                            <h3>이제 면접을 시작하러 가볼까요?</h3>
                        </div>
                        <div></div>
                    </div>
                    <div onClick={onStart}>
                        <button className='btn-yes'>시작하기</button>
                    </div>
                </div>
            )
        );
    }

    function showHomeModal(showModal) {
        showModal({
            component: Home,
            modalProps: {
                modal: showModal
            }
        });
    }

    function showExampleTwoModal(showModal) {
        showModal({
            component: Intro,
            modalProps: {
                modal: showModal
            }
        });
    }

    function showExampleThreeModal(showModal) {
        showModal({
            component: Check,
            modalProps: {
                modal: showModal
            }
        });
    }
    function showExampleFourModal(showModal) {
        showModal({
            component: StartInterview,
            modalProps: {
                modal: showModal
            }
        });
    }

    // function Button() {
    //     return <button className={styles.btn}>Module</button>;
    // }

    return (
        <ModalProvider>
            <ModalContext.Consumer>
                {({ showModal, hideModal }) => (
                    <div className='ready-buttons-parent'>
                        <div className='ready-buttons-nav'>
                            <button className='ready-buttons' onClick={() => showHomeModal(showModal)}>시험 가이드 보기</button>
                        </div>
                        <ModalRoot /> {/* 본문 내용들이 나오는 곳 */}
                    </div>
                )
                }
            </ModalContext.Consumer >
        </ModalProvider >
    );
}

function getHide() {
    document.getElementById("training-alone-start-modal").style.display = "none"

}

function getShow() {
    document.getElementById("video-user1").style.display = ""
    document.getElementById("alone-questions").style.display = ""
    document.getElementById("training-alone-main-controls-button").style.display = ""

}

export default ReadyInterviewWithModal