import React, { Component, useEffect, useState } from 'react';
import VideoDeleteModal from '../modal/VideoDeleteModal';
import VideoFaceVoiceEditModal from '../modal/VideoFaceVoiceEditModal'
import MyVideoMenubar from "../includes/MyVideoMenubar"
import { Link } from 'react-router-dom';
import '../css/FeedBack.css'
import api from '../shared/api';
import jwt from 'jwt-decode';

function MyVideo() {
    const [openModal, setOpenModal] = useState(false);
    const [openVideoFaceVoiceEditModal, setOpenVideoFaceVoiceEditModal] = useState(false);
    const [RecordingLengthCheck, SetRecordingLengthCheck] = useState("");
    const [RecordingList, SetRecordingList] = useState([]);
    const [StatusCheck, SetStatusCheck] = useState(false);

    const Token = sessionStorage.getItem('Authorization')
    const userInfo = jwt(Token)

    useEffect(() => {
        async function getRecording() {
            await api.get(`/api/feedback/recording/15/${userInfo.id}`)
                .then(res => {
                    SetStatusCheck(false)
                    SetRecordingLengthCheck((res.data).length)
                    SetRecordingList(res.data)
                });
        }
        getRecording();
    }, []);

    const selectMyVideoMenu = (path) => {
        SetStatusCheck(false)
        if (path.split('/')[2] == 16) {
            SetStatusCheck(true)
        }
        getMyRecording(path);

    }

    const getMyRecording = async (path) => {
        await api.get(`/api/feedback${path}/${userInfo.id}`)
            .then(res => {
                SetRecordingList(res.data)
                SetRecordingLengthCheck(res.data.length)
            })
    }

    const YMDFormat = (num) => {
        if (!num) return "";
        let firstNum = num.slice(0, 10);
        let secondNum = num.slice(11, 16);
        return firstNum + " " + secondNum
    }

    return (
        <div className='Wrapper'>
            <div className='left-menu' >
                <MyVideoMenubar selectMyVideoMenu={(id) => selectMyVideoMenu(id)} />
            </div>
            <div>
                <div className="my-video-title">My 영상</div>
                {StatusCheck ? "" :
                    <div class="grid-container-box">
                        <div class="video-edit-btn">
                            <button className="add-face-filter-voice-btn" onClick={() => { setOpenVideoFaceVoiceEditModal(true); }} >영상 필터 및 목소리 변조</button>
                            <button className="video-delete-btn" onClick={() => { setOpenModal(true); }} >영상 삭제</button>
                            {openVideoFaceVoiceEditModal && <VideoFaceVoiceEditModal closeModal={setOpenVideoFaceVoiceEditModal} />}

                            {openModal && <VideoDeleteModal closeModal={setOpenModal} />}
                        </div>
                    </div>
                }

                {RecordingLengthCheck ?
                    <div className='feedback-table'>
                        <table>
                            <thead>
                                {StatusCheck ?
                                    <tr>
                                        <th>번호</th><th>제목</th><th>작성자</th><th>좋아요 수</th><th>댓글 수</th><th>등록일</th>
                                    </tr> :
                                    <tr>
                                        <th>번호</th><th>제목</th><th>작성자</th><th>등록일</th>
                                    </tr>
                                }
                            </thead>
                            {StatusCheck ?
                                <tbody>
                                    {RecordingList.map((value, idx) => {
                                        return (
                                            <tr>
                                                <td> {idx + 1} </td>
                                                <a href={`/feedback/detail/${value.id}`}><td> {value.feedback_title} </td></a>
                                                <td> {value.user_name} </td>
                                                <td> {value.like_cnt} </td>
                                                <td> {value.reply_cnt} </td>
                                                <td> {YMDFormat(value.createdAt)} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody> :
                                <tbody>
                                    {RecordingList.map((value, idx) => {
                                        console.log(value);
                                        return (
                                            <tr>
                                                <td> {idx + 1} </td>
                                                <td> {value.title} </td>
                                                <td> {value.name} </td>
                                                <td> {YMDFormat(value.createdAt)} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            }
                        </table>
                    </div> : "아무것도 없어용"}
            </div>
        </div>
    )
}

export default MyVideo
