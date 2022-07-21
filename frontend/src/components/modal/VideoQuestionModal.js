import React, { Component } from 'react';


function VideoQuestionModal ({closeModal}){
    return (
        <div className="video-edit-modal" >
            <div className="video-edit-modal-content">
                <div className="video-edit-modal-body">
                    <div className="video-edit-thumbnail" >
                    </div>
                    <div className="video-edit-voice-filter-btn">
                        <div className="video-question-list">ArrowFunction이 무엇인가요</div>
                        <div className="video-question-list">JavaScript Event Loop 에 대해 설명해주세요</div>
                        <div className="video-question-list">최근 겪은 오류에 대해 설명해주세요</div>

                        <div className="video-edit-face-choice-body"> </div>
                        <div className="video-edit-voice-choice-body"> </div>

                    </div>
                </div>
                <div className="video-edit-modal-footer">
                    <button onClick={() => closeModal(false)} className="btn-yes">저장</button>
                    <button className="btn-cancel">취소</button>
                </div>
            </div>
        </div>
    )
}

export default VideoQuestionModal