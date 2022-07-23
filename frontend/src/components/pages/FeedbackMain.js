import React, { Component, useEffect, useState } from 'react';
import FeedbackMenu from "../includes/FeedbackMenubar"
// import { Link } from 'react-router-dom';
import api from "../shared/api";

function Feedback() {
    const [MainLengthCheck, SetMainLengthCheck] = useState("");
    const [FeedArray, SetFeedArray] = useState([]);
    useEffect(() => {
        async function getFeedback() {
            await api.get('/api/feedback/getMain')
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
    
    return (
        <div>
            <FeedbackMenu />
            { MainLengthCheck ?
            <div>
                {/* <div class="grid-container-box">
                    <div class="grid-container">
                        <div class="grid-item"><img className="video-thumbnail-second-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div class="grid-item-first-place"><img className="video-thumbnail-first-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div class="grid-item"><img className="video-thumbnail-third-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">3</div>
                    </div>
                </div> */}
                <div className='feedback-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>좋아요 수</th>
                                <th>댓글 수</th>
                                <th>등록일</th>
                            </tr>
                        </thead>
                        <tbody>
                            { FeedArray.map((value, idx) => {
                                return(
                                    <tr>
                                        <td> {idx + 1} </td>
                                        <a href= {`/feedback/detail/${value.id}`}><td> { value.feedback_title } </td></a>
                                        <td> { value.user_name } </td>
                                        <td> { value.like_cnt } </td>
                                        <td> { value.reply_cnt } </td>
                                        <td> { YMDFormat(value.createdAt) } </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>: "아무것도 없어용~ 이것도 아이콘 넣어서 이쁘게 꾸미면 될 것 같아요 ~"}
        </div>
    )
}

export default Feedback;