import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TrainingAlone() {
    const { key } = useParams();
    let data = [];
    const [Questions, SetQuestions] = useState([]);
    const [QuestionsIndex, SetQuestionsIndex] = useState(-1);

    // const getQuestions = async () => {
    //     const { data } = await axios.get(`http://localhost:8000/training/alone/api/questions/${key}`);
    //     SetQuestions(data);
    // };

    useEffect(() => {
        async function getQuestions() {
            const data = await axios.get(`http://localhost:8000/training/alone/api/questions/${key}`).then(res => {
                console.log(res)
                SetQuestions(res.data);
            });

        }
        getQuestions();
        // const getQuestions = async () => {
        //     // const { data } = await axios.get(`http://localhost:8000/training/alone/api/questions/${key}`).then(res => SetQuestions(res.data));
        //     await axios.get(`http://localhost:8000/training/alone/api/questions/${key}`).then(res => SetQuestions(res.data));
        //     // SetQuestions(data);
        // };
        // getQuestions();
        // console.log("Questions:", (Questions));
        // // console.log("Questions:", JSON.stringify(Questions));
        // console.log("Questions:", typeof Questions);
    }, []);

    const getQuestion = () => {
        if (Questions && Questions.length !== 0) {
            if (QuestionsIndex !== -1) {
                const q = Questions[QuestionsIndex];
                if (q && q.length !== 0) {
                    return q[0];
                }
            }
        }
    };
    const getQuestionAudio = () => {
        if (Questions && Questions.length !== 0) {
            if (QuestionsIndex !== -1) {
                const q = Questions[QuestionsIndex];
                if (q && q.length !== 0) {
                    return;
                }
            }
        }
    };
    // const getGroupList = async () => {
    //     axios.get(`http://localhost:8000/training/alone/api/questions/${key}`).then((res) => getGroupList(res.data));
    // };

    // useEffect(() => {
    //     getGroupList();
    // }, []);
    // console.log(Questions);
    // useEffect(() => {

    // axios.get(`http://localhost:8000/training/alone/api/questions/${key}`)
    //         .then((res) => {
    //             (res.data).map((value) => {
    //                 SetQuestions(value)
    //                 console.log("@#@#", value);
    //             });
    //         })
    // }, [])

    // axios.get(`http://localhost:8000/training/alone/api/questions/${key}`)
    //     .then((res) => {
    //         (res.data).map((value) => {
    //             data.push(value)
    //         });
    //     })



    // axios.get(`http://localhost:8000/training/alone/api/questions/${key}`)
    //     .then((res) => {
    //         (res.data).map((value) => {
    //             data.push(value)
    //         });
    //     })

    // console.log("Questions:", Questions[0][1]);
    let copy = Questions

    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>
            <div className='traing-inner-box'>
                <div style={{ color: 'white' }}>{getQuestion()}</div>
                <div className='training-alone-dropbox'></div>
            </div>
            <div className='training-footer'>
                <div className="training-container-box">
                    <div>
                    </div>
                    <div className="training-item1" onClick={() => {
                        SetQuestionsIndex(0)

                    }} ><img className="video-thumbnail-second-place" src={require("../images/start.png")} alt={"start button"} /></div>
                    <div className="training-item-first-place" onClick={() => {
                        SetQuestionsIndex(QuestionsIndex + 1)
                    }} ><img className="video-thumbnail-first-place" src={require("../images/next.png")} alt={"next button"} />   </div>
                    <div className="training-item"><img className="video-thumbnail-third-place" src={require("../images/end.png")} alt={"end button"} />   </div>
                </div>
            </div>
        </div >
    )
}



export default TrainingAlone