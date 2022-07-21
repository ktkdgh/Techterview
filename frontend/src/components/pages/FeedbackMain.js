import React, { Component, useEffect, useState } from 'react';
import FeedbackMenu from "../includes/FeedbackMenubar"
import { Link } from 'react-router-dom';
import api from "../shared/api";

function Feedback() {
    const [Array, SetArray] = useState([]);
    useEffect(() => {
        async function getFeedback() {
            const data = await api.get('/feedback/api/getfeedback')
                .then(res => {
                    const array = {
                        data: res.data,
                        header: ["순위", "제목", "작성자", "좋아요 수", "댓글 수"]
                    }
                    SetArray(array)
                });
    
        }
        getFeedback();
    
    }, []);

    console.log("Array : ", Array.data);
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
                            {/* {Array.header.map((value) => {
                                return(
                                    <th>{value}</th>
                                );
                            })} */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Array.data.map((value, idx) => {
                                return(
                                    <tr>
                                        <td> {idx + 1} </td>
                                        <td> { value.feedback_title } </td>
                                        <td> { value.feedback_title } </td>
                                        <td> { value.feedback_title } </td>
                                        <td> { value.feedback_title } </td>
                                        <td> { value.feedback_title } </td>
                                    </tr>
                                );
                            })} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Feedback;