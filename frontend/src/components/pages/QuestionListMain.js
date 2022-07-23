import React, { Component, useEffect, useState } from 'react';
import QuestionMenuNavBar from '../includes/QuestionListMenubar';
import api from "../shared/api";

// import * as Icon from 'react-bootstrap-icons';


function Question() {
    const [LengthCheck, SetLengthCheck] = useState("");
    const [QuestionArray, SetQuestionArray] = useState([]);
    const [selectedPath, setSelectedPath] = useState('');
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        console.log('select url ', `/api/questionList/getQuestionList${selectedPath}`);
        async function getQuestion() {
            await api.get(`/api/questionList/getQuestionList${selectedPath}`)
                .then(res => {
                    SetLengthCheck((res.data).length)
                    SetQuestionArray(res.data)
                });
        }
        getQuestion();
    }, [selectedPath]);


    console.log(QuestionArray);

    // const YMDFormat = (num) => {
    //     if (!num) return "";
    //     let firstNum = num.slice(0, 10);
    //     let secondNum = num.slice(11, 16);
    //     return firstNum + " " + secondNum
    // }
    

    const selectMenu = (path) => {
        setSelectedPath(path);
    }

    return (
        <div>
            <div className='others-lobby-header2'>
                <QuestionMenuNavBar selectMenu={(id) => selectMenu(id)} />
                <div>
                    {openModal && <QuestionMenuNavBar closeModal={setOpenModal} />}
                </div>
            </div>

            <div>
                <div Class="grid-container-box">
                    <div Class="grid-container">
                        <div Class="grid-item"><img className="video-thumbnail-second-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item"><img className="video-thumbnail-first-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item"><img className="video-thumbnail-third-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item">2</div>
                        <div Class="grid-item">1</div>
                        <div Class="grid-item">3</div>
                    </div>
                </div>
                <div Class="grid-container-box">
                    <div Class="grid-container">
                        <div Class="grid-item"><img className="video-thumbnail-second-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item"><img className="video-thumbnail-first-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item"><img className="video-thumbnail-third-place" src={require("../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                        <div Class="grid-item">2</div>
                        <div Class="grid-item">1</div>
                        <div Class="grid-item">3</div>
                    </div>
                </div>
                {
                QuestionArray?.map((value, idx) => 
                    <div>
                       {idx+1} 
                        {value.name} 
                    </div>
                )
            }
            </div>
        </div>
    )
}



export default Question