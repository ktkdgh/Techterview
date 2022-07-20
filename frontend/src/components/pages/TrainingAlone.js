import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PeerjsAlone from '../peerjs/PeerjsAlone';
import { Link } from 'react-router-dom';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
     
    function IncreaseAudioIndex() {
        SetAudioIndex(AudioIndex + 1);
      }
    
    let audio = new Audio(getQuestionAudio());

    function SetQuestionIndex() {
        SetQuestionIndex(QuestionsIndex +1);
    }
    return (


    
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <Link to="/" style={{textDecoration: 'none'}}><div className="training-navigation-bar-logo"> TECHTERVIEW </div></Link> 
            <div className='training-inner-box'>
                <div id='alone-questions' style={{ color: 'white', fontSize: '32px', textAlign: "center", display:"none" }}>{getQuestion()}</div>
                <PeerjsAlone IncreaseAudioIndex={IncreaseAudioIndex} autoAudioPlay={audio} SetQuestionIndex={SetQuestionIndex}/></div>
                <div className='video-next-icon-container'>
                    <div className="video-next-question-btn" onClick={() => {
                            audio.play()
                            SetQuestionsIndex(QuestionsIndex + 1)
                            SetAudioIndex(AudioIndex + 1)
                        }} >
                            <FontAwesomeIcon id="faArrowAltIcon" icon={faArrowAltCircleRight} />
                        Next
                        </div>
                </div>
            <div className='training-footer'>
                <div className="training-container-box">
                    <div>
                    </div>

                </div>
            </div>
        </div >
    )
}



export default TrainingAlone