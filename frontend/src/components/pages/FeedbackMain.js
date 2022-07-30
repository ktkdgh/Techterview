import React, { Component, useEffect, useState } from 'react';
import FeedbackMenu from "../includes/FeedbackMenubar"
// import { Link } from 'react-router-dom';
import api from "../shared/api";
import '../css/FeedBack.css'
import '../../../src/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function Feedback() {
    const [MainLengthCheck, SetMainLengthCheck] = useState("");
    const [FeedArray, SetFeedArray] = useState([]);

    useEffect(() => {
        async function getFeedback() {
            await api.get('/api/feedback/category/main')
                .then(res => {
                    SetMainLengthCheck((res.data).length)
                    SetFeedArray(res.data)
                });
        }
        getFeedback();
    }, []);

    const YMDFormat = (num) => {
        if (!num) return "";
        let firstNum = num.slice(0, 10);
        let secondNum = num.slice(11, 16);
        return firstNum + " " + secondNum
    }

    const selectFeedMenu = (path) => {
        getCategoryFeed(path);
    }

    const getCategoryFeed = async (path) => {
        if (!!path.split('/')[2]) {
            await api.get(`/api/feedback/category${path}`)
                .then(res => {
                    SetMainLengthCheck((res.data).length)
                    SetFeedArray(res.data)
                })
        }
    }

    return (
        <div className='feedback-wrapper'>
            {/* <div className="others-lobby-header2" > */}
            <div className='left-menu'>
                <FeedbackMenu selectFeedMenu={(id) => selectFeedMenu(id)} />
            </div>
            {MainLengthCheck ?
                <div className="feedback-main-body">
                    <div className='feedback-main-table'>
                            <div className='feedback-main-head'>
                                <div className='feedback-main-greed-container'>
                                    <div>순위</div>
                                    <div>제목</div>
                                    <div>작성자</div>
                                    <div>좋아요 수</div>
                                    <div>댓글 수</div>
                                    <div>등록일</div>
                                </div>
                            </div>

                            <div className='feedback-container'>

                                {FeedArray.map((value, idx) => {
                                    return (
        
                                            <div className= 'feedback-main-greed-container' id="feedback-main-greed-row" key={idx}>
                                                <div> {idx + 1} </div>
                                                <a href={`/feedback/detail/${value.id}`}><div> {value.feedback_title}</div></a>
                                                <div> {value.user_name} </div>
                                                <div> {value.like_cnt} </div>
                                                <div> {value.reply_cnt} </div>
                                                <div> {YMDFormat(value.createdAt)}</div>
                                            </div>
                                    )
                                })}

                            </div>
                  </div>
                </div> : <div className="feedback-no-video-wrapper">
                    <div className="exclamation-circle"> <FontAwesomeIcon icon={faExclamationCircle} /></div>
                   <div className="feedback-no-video"> 관련된 영상이 없습니다.</div>
                </div>}
        </div >
    )
}

export default Feedback;