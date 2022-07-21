import React, { Component, useEffect } from 'react';
import FeedbackMenu from "../includes/FeedbackMenubar"
import { Link } from 'react-router-dom';
import axios from 'axios';

function Feedback() {
    useEffect(() => {
        async function getFeedback() {
            const data = await axios.get('https://3.35.82.134:8000/feedback/api/getfeedback')
                .then(res => {
                    console.log(res);
                });
    
        }
        getFeedback();
    
    }, []);

    return (
        <div>
            <FeedbackMenu />
            <div>
                <div class="grid-container-box">
                    <div class="grid-container">
                        <div class="grid-item"><img className="video-thumbnail-second-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div class="grid-item-first-place"><img className="video-thumbnail-first-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div class="grid-item"><img className="video-thumbnail-third-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">3</div>
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

export default Feedback;