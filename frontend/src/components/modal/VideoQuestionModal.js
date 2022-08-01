import React, { Component, useCallback, useEffect, useState } from 'react';
import api from '../shared/api';
import jwt from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function VideoQuestionModal() {
    const Token = sessionStorage.getItem('Authorization')
    const userInfo = jwt(Token)
    const [RecordingCheck, SetRecordingCheck] = useState(0);
    const [getRecordingList, SetgetRecordingList] = useState([]);
    const [recordingCheckedList, setrecordingCheckedList] = useState([]);

    useEffect(() => {
        const getRecordingCheck = async () => {
            api.post('/api/training/alone/getrecording', {
                memberId : userInfo.id
            })
                .then(res => {
                    SetgetRecordingList(res.data);
                    SetRecordingCheck(res.data.length);
                });
        };
        getRecordingCheck()
    }, [])

    const onCheckedElement = useCallback(
        (checked, id) => {
        if (checked) {
            setrecordingCheckedList([...recordingCheckedList, id]);
        } else {
            setrecordingCheckedList(recordingCheckedList.filter((el) => el !== id));
        }
    },[recordingCheckedList]);
    
    const getRecordingSave = async () => {
        await api.post('/api/training/alone/saverecording', {
            saveList: recordingCheckedList
        })
            .then(res => {
                window.location.href = '/feedback/myvideo';
            })
    };

    return (
        <div className="video-save-modal" >
            <div className="video-save-modal-content">
                <div className="video-save-modal-body">
                    <div className="video-edit-thumbnail" ></div>
                    
                    <div className="video-edit-voice-filter-btn">
                    { RecordingCheck ? 
                        <table className="video-save-modal-table">
                        {getRecordingList.map((value, idx) => {
                            return(
                                <div className="video-save-modal-row" key={idx}>
                                    <div> <input
                                        key={value.id}
                                        type="checkbox"
                                        onChange={(e) => onCheckedElement(e.target.checked, value.id)}
                                        checked={recordingCheckedList.includes(value.id) ? true : false}
                                        />
                                    </div>
                                    <div>
                                        {idx + 1} 
                                    </div>
                                    <div>
                                        {value.recording_title}
                                        </div>
                                </div>
                            )
                        })}
                        </table> 
                         : <div style={{fontSize:"130%", marginTop: '70%'}}>녹화된 영상이 없습니다.</div> }
                    </div>
                </div>
                { RecordingCheck ? 
                <div className="video-save-modal-footer">
                    <button className="video-save-btn" onClick={() => getRecordingSave()}>저장</button>
                </div> : 
                <div className="video-save-no-video-footer">
                    <button className="video-save-cancel-btn" onClick={() => window.location.href = '/'}>나가기 </button>
                </div>  }
            </div>
        </div>
    )
}

export default VideoQuestionModal