
import React, { Component, useCallback, useEffect, useState } from 'react';
import QuestionMenuNavBar from '../includes/QuestionListMenubar';
import QuestionListAloneModal from '../modal/QuestionListAloneModal'
import api from "../shared/api";
import '../css/Question.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons'
import TypeAnimation from 'react-type-animation';

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
            if (selectedPath){
                await api.get(`/api/questionList/getQuestionList${selectedPath}`)
                    .then(res => {
                        SetQuestionArray(res.data)
                    });
            }
        }
        getQuestion();
    }, [selectedPath]);

    const selectMenu = (path) => {
        if (!!path.split('/')[2]){
            setSelectedPath(path);
        }
    }

    const onCheckedElement = useCallback(
        (checked, id) => {
            if (checked) {
                setClickArray([...ClickArray, checked]);
            } else {
                setClickArray(ClickArray.filter((el) => el !== id));
            }
        }, [ClickArray]);

    const arraydeleteidx = (data, idx) => {
        setClickArray(ClickArray.filter((el) => el !== data));
    }


    return (
        <div className='feedback-wrapper'>
            <div className='left-menu'>
                <QuestionMenuNavBar selectMenu={(id) => selectMenu(id)} />
            </div>



                <div className="question-main-body">





                    <div className="feedback-table">
                        {
                            QuestionArray?.map((value, idx) =>
                                <div className="question-add-to-cart" key={idx}>
                                    {idx + 1}. {value.name} <button className="question-add-button" onClick={(e) => { onCheckedElement(e.target.checked, idx); }} checked={ClickArray.includes(value.name) ? "" : value.name}> ADD </button>
                                </div>
                            )
                        }

                    </div>
                    {
                        QuestionArray.length === 0
                        && 
                        <>
                      {/* '질문 담기 페이지에서는 자신에게 맞는 질문 리스트를 만들어 면접을 진행할 수 있습니다. 좌측 상단의 카테고리를 선택하신 후 ADD 버튼을 클릭해서 질문 장바구니에 추가할 수 있습니다.',
                        2000,
                        '질문 담기 페이지에서는 자신에게 맞는 질문 리스트를 만들어 면접을 진행할 수 있습니다. 좌측 상단의 카테고리를 선택하신 후 ADD 버튼을 클릭해서 질문 장바구니에 추가할 수 있습니다.',
                        2000, */}
                        <div className="type-animation" >
                        <img src={require("../images/chromebar.png")} className="chrome-bar" alt={"chrome-bar"} />
 
                        <div className="typing">
                        <TypeAnimation
                        cursor={true}
                        sequence={[
                            '질문 담기 페이지에서는 자신에게 맞는 질문 리스트를 만들어 면접을 진행할 수 있습니다. 좌측 상단의 카테고리를 선택하신 후 ADD 버튼을 클릭해서 질문 장바구니에 추가해 보세요!',
                            2000,
                            '질문 담기 페이지에서는 자신에게 맞는 질문 리스트를 만들어 면접을 진행할 수 있습니다. 좌측 상단의 카테고리를 선택하신 후 ADD 버튼을 클릭해서 질문 장바구니에 추가해 보세요!',
                            2000,
                          ]}
                        wrapper="h4"
                        repeat={Infinity}/>
                        </div>
                    </div>
                        
                        
                        
                        <img src={require("../images/desk3.png")} className="anything_woosik" alt={"studying man Question"} />

                        </>
                    }
                    {openQuestionListModal && <QuestionListAloneModal closeModal={SetopenQuestionListModal} questionlist={ClickArray}/>}
                    {
                        QuestionArray.length !== 0
                        && <div className="feedback-table-cart">
                                <div className="question-finish-btn-container" >
                                <button className="question-finish-btn"  onClick={() => { SetopenQuestionListModal(true); }}>완료  <FontAwesomeIcon id="faUser" icon={faCartPlus} /></button>
                                </div>
                                
                                <ul>
                                    {
                                        ClickArray?.map((click, idx) => 
                                            <div className="question-add-to-cart" key={idx}>
                                                {idx + 1}. {click}
                                                <button className="question-delete-button" onClick={() => {SetDeleteIdx(idx); arraydeleteidx(click, DeleteIdx) }} >Delete </button>
                                            </div>)
                                    }

                                </ul>
                                

                     

                        </div>
                        
                    }
                </div>
            </div>
  
  
  )
}



export default Question

