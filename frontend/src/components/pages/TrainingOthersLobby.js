import React, { Component, useState } from 'react';
import QuestionMenu from './QuestionListMenu';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import CreateRoomWith from '../modal/CreateRoomWith';


function OthersLobby() {
    const roomId = uuidv4();
    const [openModal, setOpenModal] = useState(false);


    return (
        <div>
            <div className='others-lobby-header2'>
                <QuestionMenu />
                <div>
                    {/* <Link to=
                        {{
                            pathname: `/training/others/${roomId}`,
                            state: { roomId: true }
                        }}>
                        <button className='others-lobby-enter-room-btn'>연결하기</button></Link> */}


                    <button className='others-lobby-enter-room-btn' onClick={() => { setOpenModal(true); }}  >방 만들기</button>
                    {openModal && <CreateRoomWith closeModal={setOpenModal} />}
                </div>
            </div>

            <div>
                <div Class="grid-container-box">
                    <div Class="grid-container">
                        <div Class="grid-item"><img className="video-thumbnail-second-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item-first-place"><img className="video-thumbnail-first-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item"><img className="video-thumbnail-third-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item">2</div>
                        <div Class="grid-item">1</div>
                        <div Class="grid-item">3</div>
                    </div>
                </div>
                <div Class="grid-container-box">
                    <div Class="grid-container">
                        <div Class="grid-item"><img className="video-thumbnail-second-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item-first-place"><img className="video-thumbnail-first-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item"><img className="video-thumbnail-third-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item">2</div>
                        <div Class="grid-item">1</div>
                        <div Class="grid-item">3</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OthersLobby

