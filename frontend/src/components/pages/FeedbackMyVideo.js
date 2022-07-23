import React, { Component, useState } from 'react';
import VideoDeleteModal from '../modal/VideoDeleteModal';
import VideoFaceVoiceEditModal from '../modal/VideoFaceVoiceEditModal'
import FeedbackMenu from "../includes/FeedbackMenubar"
import { Link } from 'react-router-dom';
import '../css/FeedBack.css'

function MyVideo() {
    const [openModal, setOpenModal] = useState(false);
    const [openVideoFaceVoiceEditModal, setOpenVideoFaceVoiceEditModal] = useState(false)


    return (
        <div className='Wrapper'>
            <div className='left-menu' >
                <FeedbackMenu />
            </div>
            <div>
                <div className="my-video-title">나의 녹화 영상 목록</div>
                <div class="grid-container-box">
                    <div class="video-edit-btn">
                        <button className="add-face-filter-voice-btn" onClick={() => { setOpenVideoFaceVoiceEditModal(true); }} >영상 필터 및 목소리 변조</button>
                        <button className="video-delete-btn" onClick={() => { setOpenModal(true); }} >영상 삭제</button>
                        {openVideoFaceVoiceEditModal && <VideoFaceVoiceEditModal closeModal={setOpenVideoFaceVoiceEditModal} />}

                        {openModal && <VideoDeleteModal closeModal={setOpenModal} />}
                    </div>
                </div>
                <div className='feedback-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>순위</th><th>제목</th><th>작성자</th><th>좋아요 수</th><th>댓글 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>4</td><Link to="/feedback/detail"><td>회사 지원 동기</td></Link><td>abd3</td><td>44</td><td>33</td>
                            </tr>
                            <tr>
                                <td>5</td><td>다른 사람보다 뛰어난 점</td><td>Dolor</td><td>32</td><td>22</td>
                            </tr>
                            <tr>
                                <td>6</td><td>ARP 매커니즘에 대해서</td><td>Dolor</td><td>34</td><td>55</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyVideo
