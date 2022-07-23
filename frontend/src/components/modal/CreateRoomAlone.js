import React, { useState, useRef } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function CreateRoomAlone({ closeModal }) {

    const Options = [
        {
            key: 1,
            value: "네트워크",
        },
        {
            key: 2,
            value: "데이터베이스",
        },
        {
            key: 3,
            value: "디자인패턴",
        },
        {
            key: 4,
            value: "알고리즘",
        },
        {
            key: 5,
            value: "운영체제",
        },
        {
            key: 6,
            value: "자료구조",
        },
        {
            key: 7,
            value: "컴퓨터구조"
        }];

    const Options1 = [
        {
            key: 8,
            value: "JavaScript",
        },
        {
            key: 9,
            value: "Java",
        },
        {
            key: 10,
            value: "React",
        }];

    const Options2 = [
        {
            key: 11,
            value: "기본질문",
        },
        {
            key: 12,
            value: "개발상식",
        }];

    const Options3 = [

        {
            key: 13,
            value: "프론트엔드",
        },
        {
            key: 14,
            value: "백엔드"
        }
    ];

    const [SendNum, setSendNum] = useState()

    function handleClick() {
        window.location.replace("../page/training/Alone/" + SendNum)
    }


    return (
        <div className="Create-delete-modal">
            <div className="Create-delete-modal-content">
                <div className="Create-delete-modal-body">
                    <h1>연습을 준비해 볼까요?</h1>
                </div>
                <div className="CreateRoomAlone-Check" style={{}}>
                    <div>
                        <div><h3>CS/언어/기본질문 및 개발상식/직무별</h3></div>
                        <div>

                            <DropdownButton id="dropdown-basic-button" title="CS">
                                {Options.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}
                            </DropdownButton>
                        </div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="언어">
                                {Options1.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}

                            </DropdownButton>
                        </div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="기본질문 및 개발상식">
                                {Options2.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}

                            </DropdownButton>
                        </div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="직무별">
                                {Options3.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}

                            </DropdownButton>
                        </div>
                    </div>
                    <div>

                    </div>

                    <div className="Create-delete-modal-footer">
                        <button className="btn-start" onClick={() => { handleClick(); }}>연습시작</button>
                        <button className="btn-close" onClick={() => closeModal(false)}>취소</button>
                    </div>
                </div >
            </div >
        </div >
    )
}




export default CreateRoomAlone