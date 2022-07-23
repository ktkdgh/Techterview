import React, { Component } from 'react';
// import * as Icon from 'react-bootstrap-icons';
import QuestionMenu from './QuestionListMenu';
import '../css/Question.css'



function QuestionList() {

    return (
        <div className='Wrapper'>
            <div className='left-menu' >
                <QuestionMenu />
            </div>
            <div className='Main-body'>
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
                </div>
            </div>
        </div>
    )
}
export default QuestionList

