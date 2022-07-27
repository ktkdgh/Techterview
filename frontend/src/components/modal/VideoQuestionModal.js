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
        <div className="video-edit-modal" >
            <div className="video-edit-modal-content">
                <div className="video-edit-modal-body">
                    <div className="video-edit-thumbnail" ></div>
                    
                    <div className="video-edit-voice-filter-btn">
                    { RecordingCheck ? 
                        <table>
                        {getRecordingList.map((value, idx) => {
                            return(
                                <tr>
                                    <td> <input
                                        key={value.id}
                                        type="checkbox"
                                        onChange={(e) => onCheckedElement(e.target.checked, value.id)}
                                        checked={recordingCheckedList.includes(value.id) ? true : false}
                                        />
                                    </td>
                                    <td>
                                        {idx + 1} 
                                    </td>
                                    <td>
                                        {value.recording_title}
                                        </td>
                                </tr>
                            )
                        })}
                        </table> 
                         : <div style={{fontSize:"130%", marginTop: '20%'}}>녹화된 영상이 없습니다.</div> }
                    </div>
                </div>
                { RecordingCheck ? 
                <div className="video-edit-modal-footer">
                    <button className="btn-cancel" onClick={() => getRecordingSave()}>저장</button>
                </div> : 
                <div className="video-edit-modal-footer">
                    <button className="btn-cancel" onClick={() => window.location.href = '/'}>나가기 </button>
                </div>  }
            </div>
        </div>
    )
}

export default VideoQuestionModal