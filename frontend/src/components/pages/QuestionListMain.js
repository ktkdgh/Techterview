
import React, { Component, useCallback, useEffect, useState } from 'react';
import QuestionMenuNavBar from '../includes/QuestionListMenubar';
import QuestionListAloneModal from '../modal/QuestionListAloneModal'
import api from "../shared/api";
import '../css/Question.css'

// import * as Icon from 'react-bootstrap-icons';


function Question() {
    const [openQuestionListModal, SetopenQuestionListModal ] = useState(false);
    const [QuestionArray, SetQuestionArray] = useState([]);
    const [ClickArray, setClickArray] = useState([]);
    const [DeleteIdx, SetDeleteIdx] = useState(0);
    const [selectedPath, setSelectedPath] = useState('');
    useEffect(() => {
        // console.log('select url ', `/api/questionList/getQuestionList${selectedPath}`);
        async function getQuestion() {
            await api.get(`/api/questionList/getQuestionList${selectedPath}`)
                .then(res => {
                    SetQuestionArray(res.data)
                });
        }
        getQuestion();
    }, [selectedPath]);

    const selectMenu = (path) => {
        setSelectedPath(path);
        // console.log(path);
    }

    const onCheckedElement = useCallback(
        (checked, id) => {
            if (checked) {
                setClickArray([...ClickArray, checked]);
            } else {
                setClickArray(ClickArray.filter((el) => el !== id));
            }
        }, [ClickArray]);
    // console.log(ClickArray);

    const arraydeleteidx = (data, idx) => {
        setClickArray(ClickArray.filter((el) => el !== data));
    }


    return (
        <div className='feedback-wrapper'>
            <div className='left-menu'>
                <QuestionMenuNavBar selectMenu={(id) => selectMenu(id)} />
            </div>
            <div>
                <div className="question-main-body">
                    <div className="feedback-table">
                        {
                            QuestionArray?.map((value, idx) =>
                                <div>
                                    {idx + 1}. {value.name} <button onClick={(e) => { onCheckedElement(e.target.checked, idx) }} checked={ClickArray.includes(value.name) ? "" : value.name}> ADD </button>
                                </div>
                            )
                        }

                    </div>
                    {
                        QuestionArray.length === 0
                        && <img src={require("../images/main-image.png")} className="anything_woosik" alt={"studying man Question"} />
                    }
                    {openQuestionListModal && <QuestionListAloneModal closeModal={SetopenQuestionListModal} questionlist={ClickArray}/>}
                    {
                        QuestionArray.length !== 0
                        && <div className="feedback-table">
                                <ul>
                                    {
                                        ClickArray?.map((click, idx) => 
                                            <div>
                                                {idx + 1}. {click}
                                                <button onClick={() => {SetDeleteIdx(idx); arraydeleteidx(click, DeleteIdx) }} >Delete </button>
                                            </div>)
                                    }
                                </ul>
                                <div className="question-finish-btn-container" ><button className="question-finish-btn"  onClick={() => { SetopenQuestionListModal(true); }}>완료</button></div>

                        </div>
                        
                    }
                </div>
            </div>
        </div>
    )
}



export default Question

