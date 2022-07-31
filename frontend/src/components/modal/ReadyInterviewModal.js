
import React, { useEffect, useState, useRef } from 'react';
import { ModalProvider, ModalContext, ModalRoot } from 'react-multi-modal';
import alone from "../images/alone.png";
import '../css/ReadyInterviewModal.css';
import { GrPrevious, GrNext } from "react-icons/gr";


function ReadyInterviewModal() {
    const currentUserVideoRef = useRef(null); //recordRef

    const call = () => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
        })
    }

    function Home({ isOpen, hideModal }) {
        return (
            isOpen && (
                <div className='ready-home-body' >
                    <h2>응시 가이드 및 응시 환경 체크를 시작하겠습니다</h2>
                </div>
            )
        );
    }

    function Intro({ isOpen }) {
        return (
            isOpen && (
                <div>
                    <div className='ready-intro-body'>
                        <div>
                            <img src={alone} alt='alone' style={{ marginTop: 20, width: 500, height: 300 }} />
                        </div>
                        <div style={{ marginTop: 20 }} >
                            <h3>각 문제당 30초의 답변 준비 시간이 주어지게 됩니다.<br></br>
                                30초 이후에는 자동으로 녹화가 시작됩니다.
                            </h3>
                        </div>
                    </div>
                </div>
            )
        );
    }

    function Check({ isOpen }) {
        return (
            isOpen && (
                <div className='ready-check-body'>
                    <div className="video-user1" id="video-user1" >
                        <video muted style={{ zIndex: "0" }} id="aloneCurrentUserVideoRef" ref={currentUserVideoRef} ></video>
                        <div>
                            화면이 잘 나오는지 확인해 주세요
                        </div>
                    </div>
                </div>
            )
        );
    }

    function StartInterview({ isOpen }) {
        return (
            isOpen && (
                <div>
                    <div className='read-start-body' >
                        <h3>이제 면접을 시작하러 가볼까요?</h3>
                    </div>
                    <div  >
                        <button className='btn-yes'>시작하기</button>
                    </div>
                </div>
            )
        );
    }

    function showHomeModal(showModal) {
        showModal({
            component: Home,
        });
    }

    function showExampleTwoModal(showModal) {
        showModal({
            component: Intro,
        });
    }

    function showExampleThreeModal(showModal) {
        showModal({
            component: Check,
        });
    }
    function showExampleFourModal(showModal) {
        showModal({
            component: StartInterview,
        });
    }

    // function Button() {
    //     return <button className={styles.btn}>Module</button>;
    // }

    return (
        <ModalProvider>
            <ModalContext.Consumer>
                {({ showModal, hideModal }) => (
                    <div>
                        <div className='ready-buttons-nav'>
                            <button className='ready-buttons' onClick={() => showHomeModal(showModal)}>step1</button>
                            <button className='ready-buttons' onClick={() => showExampleTwoModal(showModal)}>step2</button>
                            <button className='ready-buttons' onClick={() => {
                                showExampleThreeModal(showModal);
                                call();
                            }}>step3</button>
                            <button className='ready-buttons' onClick={() => showExampleFourModal(showModal)}>step4</button>
                        </div>
                        {/* <button onClick={hideModal}>가리기</button> */}
                        <hr></hr>
                        <ModalRoot /> {/* 본문 내용들이 나오는 곳 */}
                        <hr></hr>
                        <div className='ready-footer'>
                            <GrPrevious />
                            <GrNext />
                        </div>
                    </div>
                )}
            </ModalContext.Consumer>
        </ModalProvider >
    );
}
export default ReadyInterviewModal