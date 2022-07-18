import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
// import SampleVideo from '../../../../public/videos/sample1.mp4';
// import sample from '../../../audios/샘플음성/10/1.mp3';

function TrainingAlone() {
    const { key } = useParams();
    let data = []

    axios.get(`http://localhost:8000/training/alone/api/questions/${key}`)
        .then((res) => {
            (res.data.value).forEach((value) => {
                data.push(value)
            });
        })
    // let audio = new Audio('../../../assets/샘플음성/{key}/Question[QuestionsIndex].mp3');


    const [Questions, SetQuestions] = useState(data);
    const [QuestionsIndex, SetQuestionsIndex] = useState(-1);

    // let audio = new Audio("../../../assets/샘플음성/14/1.mp3")
    // let audio = new Audio(sample);

    // function playVideo() {
    //     this.ref.vidRef.play()
    // }
    // function SampleVideoPlay(props) {
    //     const vidRef = useRef(null);
    //     const hand
    // }

    // let audio = new Audio('../../../audios/샘플음성/10/1.mp3');

    // const audio = new Audio('../../../../public/audios/샘플음성/10/1.mp3');
    // const audio = new Audio('https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3');

    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>
            <div className='traing-inner-box'>
                <div style={{ color: 'white' }}>{Questions[QuestionsIndex]}</div>
                {/* <video ref="vidRef" source src="/videos/sample1.mp4" loop type="video/mp4" className='VideoBox' style={{ width: 400, height: 400 }}></video> */}
                <div className='training-alone-dropbox'></div>
                {/* <div><audio controls src='../../../assets/샘플음성/14/1.mp3'> </audio></div> */}
            </div>
            <div className='training-footer'>
                <div className="training-container-box">
                    <div>
                    </div>
                    <div className="training-item1" onClick={() => {
                        SetQuestionsIndex(0)
                        // audio.play()
                    }} ><img className="video-thumbnail-second-place" src={require("../images/start.png")} alt={"start button"} /></div>
                    <div className="training-item-first-place" onClick={() => {
                        SetQuestionsIndex(QuestionsIndex + 1)
                        // audio.play()
                    }} ><img className="video-thumbnail-first-place" src={require("../images/next.png")} alt={"next button"} />   </div>
                    <div className="training-item"><img className="video-thumbnail-third-place" src={require("../images/end.png")} alt={"end button"} />   </div>
                </div>
            </div>
        </div >
    )
}



export default TrainingAlone