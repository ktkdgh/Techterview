import React, { Component, useState,useEffect } from 'react';
import QuestionMenuNavBar from '../includes/QuestionListMenubar';
import CreateRoomWith from '../modal/CreateRoomWith';
import "../css/TrainingOthersLobby.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import {socket} from '../../lib/socket'
function OthersLobby() {
    const [openModal, setOpenModal] = useState(false);
    const [roomInfo, setRoomInfo] = useState([]);

    useEffect(() => {
        console.log(socket)
        socket.emit('enterWaitRoom') 
        socket.on('roomInfo', info => {
            setRoomInfo(info);
        }) 
        return () => {
            socket.off('roomInfo')
        }
    },[])

    socket.on('roomsUpdated', info =>{
        setRoomInfo(info)
    })

    useEffect(() => {
        socket.on('RoomIsFull', () => {
            alert('방 인원이 초과되었습니다. 다른 방을 이용해주시기 바랍니다.');
        }) 
        return () => {
            socket.off("RoomIsFull")
        }
    },[])

    // room.sendNum,room.roomId
    function handleClick(a,b,c) {
        socket.emit('checkUserNum',socket.id,b)
            // console.log('room is full')
            socket.on('allowEnter', () => {
                window.location.replace(`/training/with/${a}/${b}`)
                ;
            }) 
            return () => {
                socket.off('allowEnter')
            }
            
        }  
    


    return (
        <div className='Wrapper'>
            <div className="techterview-banner-container"><img className="techterview-banner-image" src={require("../images/techterviewbanner.png")} alt={"next button"} />   </div>
                <div>
                    <div className='others-lobby-enter-room-btn-container'> <button className='others-lobby-enter-room-btn' onClick={() => { setOpenModal(true)  }}  >방 만들기</button></div>
                        {openModal && <CreateRoomWith closeModal={setOpenModal}  />} 

                        {!openModal &&
                        <div id="interview-room-body" className="interview-room-body">
                            {roomInfo.length != 0  ? 
                            <div className="interview-room-container-box">
                                { roomInfo.map((room) => {if (room ){
                                    return(
                                        <div className="interview-room" onClick={()=> handleClick(room.sendNum, room.roomId)} >
                                            <div className="interview-room-name" >{room.roomName}</div>
                                            <div className="category-people-count-container">
                                                <div className="interview-room-category-container">
                                                    <div className='interview-room-category'>
                                                        <div className="interview-room-category0">{room?.checkedTitle} </div>
                                                    </div>
                                                    <div className='interview-room-category'>
                                                        <div className="interview-room-category1">{room?.checkedValue}</div>
                                                    </div>
                                                        <div className='interview-room-category'>
                                                            <div className="interview-room-category2">{room.checkedInterview == 1 ? "면접관 필요!": "면접자 필요!"}</div>
                                                        </div>
                                                </div>
                                                <div className='room-people-count'>
                                                    <FontAwesomeIcon id="faUser" icon={faUser} />
                                                    <div> 1/2 </div>
                                                </div>
                                            </div>    
                                        </div>
                                    );}
                                })}
                            </div> : "없어요"}
                        </div> 
                        }  
            </div>
        </div>
    )
}
export default OthersLobby