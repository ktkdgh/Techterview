import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PeerjsAlone from '../peerjs/PeerjsAlone';


function TrainingAlone() {
    const [openModal, setOpenModal] = useState(false);

    const { key } = useParams();
    let data = [];
    const [Questions, SetQuestions] = useState([]);
    const [QuestionsIndex, SetQuestionsIndex] = useState(0);
    const [AudioIndex, SetAudioIndex] = useState(0);

    useEffect(() => {
        async function getQuestions() {
            const data = await axios.get(`http://localhost:8000/training/alone/api/questions/${key}`).then(res => {
                console.log(res)
                SetQuestions(res.data);
            });

        }
        getQuestions();

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
                const q = Questions[AudioIndex];
                if (q && q.length !== 0) {
                    return q[1];
                }
            }
        }
    };

    let audio = new Audio(getQuestionAudio());


    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>
            <div className='traing-inner-box'>
                <div style={{ color: 'white', fontSize: '32px', textAlign: "center" }}>{getQuestion()}</div>
                <PeerjsAlone />
            </div >
            <div className='training-footer'>
                <div className="training-container-box">
                    <div>
                    </div>
                    <div className="training-item1" onClick={() => {
                        audio.play()
                        SetAudioIndex(AudioIndex + 1)
                    }} ><img className="video-thumbnail-second-place" src={require("../images/start.png")} alt={"start button"} /></div>
                    <div className="training-item-first-place" onClick={() => {
                        SetQuestionsIndex(QuestionsIndex + 1)
                        SetAudioIndex(AudioIndex + 1)
                        audio.play()

                    }} ><img className="video-thumbnail-first-place" src={require("../images/next.png")} alt={"next button"} />   </div>
                    <div className="training-item"><img className="video-thumbnail-third-place" src={require("../images/end.png")} alt={"end button"} />   </div>
                </div>
            </div>
        </div >
    )
}



export default TrainingAlone