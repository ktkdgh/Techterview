import React, {Component} from 'react';
import FeedbackMenu from "../includes/FeedbackMenubar"
// import {Link} from 'react-router-dom';



class FeedbackDetail extends Component {
    render() {
        return (
        <div>
        <FeedbackMenu />

        <div>
            <div className="feedbackdetail-title">   
                <span className="feedbackdetail-title-left">우리 회사에 지원한 동기</span>
                <span className='feedbackdetail-title-right'>ㅅㅇㅅ</span>
            </div>
            <div class="feedbackdetail-video-grid-container-box">
                <div class="feedbackdetail-video-grid-box">
                    <div class="grid-item"><img className="video-thumbnail-second-place"  src={require("../images/video_thumbnail.png")} alt={"video thumbnail"}/>   </div>        
                    <div class="grid-item">1</div>
                </div>
            </div>
            <div className='feedback-table'>
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
}
export default FeedbackDetail
