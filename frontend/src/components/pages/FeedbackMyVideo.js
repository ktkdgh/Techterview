import React, { useCallback, useEffect, useState } from 'react';
import VideoDeleteModal from '../modal/VideoDeleteModal';
import FeedbackCreateModal from '../modal/FeedbackCreateModal'
import MyVideoPreviewModal from '../modal/MyVideoPreviewModal'
import MyVideoMenubar from "../includes/MyVideoMenubar"
import '../css/FeedBack.css'
import api from '../shared/api';
import jwt from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function MyVideo() {
    const [openModal, setOpenModal] = useState(false);
    const [openFeedbackCreateModal, SetopenFeedbackCreateModal] = useState(false);
    const [openMyVideoPreviewModal, SetopenMyVideoPreviewModal] = useState(false);
    const [RecordingLengthCheck, SetRecordingLengthCheck] = useState("");
    const [RecordingList, SetRecordingList] = useState([]);
    const [StatusCheck, SetStatusCheck] = useState(false);
    const [checkedList, setCheckedLists] = useState([]);
    const [priviewUrl, SetpriviewUrl] = useState("");

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
        if (path.split('/')[2] === '16') {
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

    const onCheckedElement = useCallback(
        (checked, id) => {
            if (checked) {
                setCheckedLists([...checkedList, id]);
            } else {
                setCheckedLists(checkedList.filter((el) => el !== id));
            }
        }, [checkedList]);


    return (
        <div className='feedback-wrapper'>
            <div className='left-menu' >
                <MyVideoMenubar selectMyVideoMenu={(id) => selectMyVideoMenu(id)} />
            </div>
            <div className="feedback-my-video-body">
            {StatusCheck ? "" :
                <div className="video-edit-btn">
                    <button className="video-delete-btn" onClick={() => { setOpenModal(true) }} >영상 삭제</button>
                    <button className="video-delete-btn" onClick={() => { SetopenFeedbackCreateModal(true) }} >피드백 등록</button>
                    {openModal && <VideoDeleteModal closeModal={setOpenModal} checkedList={checkedList} />}
                    {openFeedbackCreateModal && <FeedbackCreateModal closeModal={SetopenFeedbackCreateModal} checkedList={checkedList} />}
                </div> }

                {RecordingLengthCheck ?
                    <div className='feedback-table'>
                        <table>
                            <thead >
                                {StatusCheck ?
                                    <tr className="my-video-row-head" >
                                        <th >번호</th><th>제목</th><th>작성자</th><th>좋아요 수</th><th>댓글 수</th><th>등록일</th>
                                    </tr> :
                                    <tr className="my-video-recent-head" >
                                        <th></th><th >번호</th><th>제목</th><th>작성자</th><th>등록일</th>
                                    </tr>
                                }
                            </thead>
                            {StatusCheck ?
                                <tbody>
                                    {RecordingList.map((value, idx) => {
                                        return (
                                            <tr className="my-video-row" key={idx}>
                                                <td> {idx + 1} </td>
                                                <td><a href={`/feedback/detail/${value.id}`}> {value.feedback_title} </a> </td>
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
                                        return (
                                            <tr className="my-video-recent" key={idx}>
                                                <td> <input
                                                    key={value.id}
                                                    type="checkbox"
                                                    onChange={(e) => onCheckedElement(e.target.checked, value.id)}
                                                    checked={checkedList.includes(value.id) ? true : false}
                                                /></td>
                                                <td> {idx + 1} </td>
                                                <td > <div className="feedback-my-video-title" onClick={() => { SetopenMyVideoPreviewModal(true); SetpriviewUrl(value.recordingUrl) }}>{value.title}</div> </td>
                                                {openMyVideoPreviewModal && <MyVideoPreviewModal closeModal={SetopenMyVideoPreviewModal} videoUrl={priviewUrl} />}
                                                <td> {value.name} </td>
                                                <td> {YMDFormat(value.createdAt)} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            }
                        </table>
                    </div> : 
                    <div className="feedback-no-video-wrapper">
                    <div className="exclamation-circle"> <FontAwesomeIcon icon={faExclamationCircle} /></div>
                    <div className="feedback-no-video"> 저장된 영상이 없습니다.</div>
                </div>}
            </div>
        </div>
    )
}
export default MyVideo