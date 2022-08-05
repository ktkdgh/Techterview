import React, { useEffect, useState, useRef } from 'react';
import { ModalProvider, ModalContext, ModalRoot } from 'react-multi-modal';
import alone from "../images/aloneImage.png";
import '../css/ReadyInterviewModal.css';
import { GrPrevious, GrNext } from "react-icons/gr";

function ReadyInterviewModal({ onStart }) {
    const currentUserVideoRef = useRef(null); 

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
                <div>
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
                    <div onClick={()=>{setTimeout(() => {onStart()}, 600);}}>
                        <button className='btn-yes-start'>바로시작</button>
                    </div>
                </div>
            )
        );
    }

    function Intro({ isOpen, modal }) {
        return (
            isOpen && (
                <div>
                    <div className='ready-intro-body' style={{ marginBottom: 400 }}>
                        <div className='ready-prev' onClick={() => showHomeModal(modal)}>
                            <button>
                                <GrPrevious size="54" />
                            </button>
                        </div>

                        <div>
                            <img src={alone} alt='alone' style={{ width: 650, height: 450 }} />
                            <div style={{ marginTop: 5 }} >
                                <h4>
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
                    <div className="ready-check-text">
                        <h4>면접 시작전 카메라와 음성을 <br></br>
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
                    <div onClick={()=>{setTimeout(() => {onStart()}, 600);}}>
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

    function Test({ showHomeModal, showModal }) {
        useEffect(() => {
            showHomeModal(showModal)
        }, [])
        return <></>

    }

    return (
        <ModalProvider>

            <ModalContext.Consumer>
                {({ showModal }) => (
                    <div className='ready-buttons-parent'>
                        <div className='ready-buttons-nav'>
                            <h2>혼자하기 가이드🧑🏻‍💻</h2>
                            <Test showHomeModal={showHomeModal} showModal={showModal} />
                        </div>
                        <ModalRoot />
                    </div>
                )}
            </ModalContext.Consumer >
        </ModalProvider >
    );
}
export default ReadyInterviewModal