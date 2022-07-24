import React, { Component, useCallback, useEffect, useState } from 'react';
import QuestionMenuNavBar from '../includes/QuestionListMenubar';
import api from "../shared/api";
import '../css/Question.css'

// import * as Icon from 'react-bootstrap-icons';


function Question() {
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
    },[ClickArray]);
    // console.log(ClickArray);

    const arraydeleteidx = (data, idx) => {
        setClickArray(ClickArray.filter((el) => el !== data));
    }
    

    return (
        <div className='Wrapper'>
            <div className='others-lobby-header2'>
                <QuestionMenuNavBar selectMenu={(id) => selectMenu(id)} />
            </div>

            <div>
                <div Class="Main-body">
                    <div Class="feedback-table">
                        {
                        QuestionArray?.map((value, idx) =>
                        <div>
                                {idx + 1}. {value.name} <button onClick={(e) => {onCheckedElement(e.target.checked, idx)}}  checked={ClickArray.includes(value.name) ? "" : value.name}> ADD </button>
                            </div>
                        )
                        }
                    </div>
                    {
                        QuestionArray.length === 0
                        && <img src={require("../images/main-image.png")} className="anything_woosik" alt={"studying man Question"} />
                    }
                    {
                        QuestionArray.length !== 0
                        && <div className="feedback-table">
                                <ul>
                                    {
                                        ClickArray?.map((click, idx) => 
                                            <div>
                                                {click}
                                                <button onClick={() => {SetDeleteIdx(idx); arraydeleteidx(click, idx) }} >Delete </button>
                                            </div>)
                                    }
                                </ul>
                          </div>
                    }
                </div>
            </div>
        </div>
    )
}



export default Question