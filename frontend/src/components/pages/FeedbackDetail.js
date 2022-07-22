import React, { useEffect, useState } from 'react';
import FeedbackMenu from "../includes/FeedbackMenubar";
import jwt from "jwt-decode";
import api from "../shared/api"
// import {Link} from 'react-router-dom'; 

function FeedbackDetail() {
    let [DetailFeedback, SetDetailFeedback] = useState([]);
    let [LikeStatus, SetLikeStatus] = useState("");
    let feedbackId = new URL(window.location.href).pathname.split('/')[3]
    const Token = sessionStorage.getItem('Authorization')
    const userInfo = jwt(Token)
    
    useEffect(() => {
        async function getFeedDetail(){
            api.get(`/api/feedback/getDetail/${feedbackId}/${userInfo.id}`)
                .then(res => {
                    SetDetailFeedback(res.data);
                    SetLikeStatus(res.data.userLikeCheck);
                });
        }
        getFeedDetail();
    },[])

    const upLikeCnt = async() => {
        await api.post(`/api/feedback/${userInfo.id}/${feedbackId}`)
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <div>
        <FeedbackMenu />

        <div>
            <div className="feedbackdetail-title">   
                <span className="feedbackdetail-title-left"> {DetailFeedback.title}</span>
                <span className='feedbackdetail-title-right'>{DetailFeedback.name}</span>
                { LikeStatus ? 123 : 789}
                <button style={{ color: 'red', backgroundColor: 'black'}} onClick={()=> { upLikeCnt(); }}>좋아요  </button> ^_^ { DetailFeedback.likes } 
            </div>
            <div class="feedbackdetail-video-grid-container-box">
                <div class="feedbackdetail-video-grid-box">
                    <div class="grid-item">url : {DetailFeedback.recordingUrl}   </div>        
                    {/* <div class="grid-item"><img className="video-thumbnail-second-place"  src={require("../images/video_thumbnail.png")} alt={"video thumbnail"}/>   </div>         */}
                </div>
            </div>
            <div className='feedback-table'>
                댓글 수 : {DetailFeedback.replys}
                <table>
                    <thead>
                        <tr>
                        <th>작성자</th><th>제목</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>abc234</td><td>정말 도움이 많이 됐습니다</td>
                        </tr>
                        <tr>
                        <td>dddd</td><td>너무 잘생겼어요 좋아요!!!</td>
                        </tr>
                        <tr>
                        <td>999d9s</td><td>제가 생각한 답변이랑 많이 다른 것 같네요</td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>
        </div>
        )
}
export default FeedbackDetail
