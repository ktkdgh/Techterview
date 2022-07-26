import React, { useState, useRef, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { v4 as uuidv4 } from 'uuid';
import { socket } from "../../lib/socket";

function CreateRoomWith({ closeModal , handleNewRoom}) {

    const Options = [
        {
            key: 1,
            value: "컴퓨터구조",
        },
        {
            key: 2,
            value: "자료구조",
        },
        {
            key: 3,
            value: "데이터베이스",
        },
        {
            key: 4,
            value: "네트워크",
        },
        {
            key: 5,
            value: "운영체제",
        },
        {
            key: 6,
            value: "알고리즘",
        },
        {
            key: 7,
            value: "디자인패턴"
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
    const roomId = uuidv4();
    const [clicked, checkclicked] = useState(false);
    const [sendNum, setSendNum] = useState([])

    function handleClick(e) {
        window.location.replace("/training/with/" + sendNum + "/" + roomId)
    }

    const [roomName, setRoomName] = useState('');
    const [tag0, setTag0] = useState('');
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    
    const onChangeInput0  = (e) => {
        setRoomName(e.target.value);
    };
    const onChangeInput1  = (e) => {
        setTag0(e.target.value);
    };
    const onChangeInput2  = (e) => {
        setTag1(e.target.value);
    };
    const onChangeInput3  = (e) => {
        setTag2(e.target.value);
    };

    useEffect(() => {
        if(clicked===true) {
            socket.emit("createRoom",socket.id, roomId, sendNum,roomName,tag0,tag1,tag2);
            handleClick()
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clicked]);
        

    const checkOnlyOne = (checkThis) => {
        const checkboxes = document.getElementsByName('test')
        console.log("checkboxes : ", checkboxes);
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
    }

    return (
        <div className="Create-delete-modal">
            <div className="Create-delete-modal-content">
                {/* <form className="Create-delete-modal-content" onSubmit={handleNewRoom} > */}

                    <div className="Create-delete-modal-body">
                        <h1>연습을 준비해 볼까요?</h1>
                    </div>

                    <input id="input-room-name" placeholder="방제목" name="roomname" onChange={onChangeInput0 }></input>

                    <div className="CreateRoomAlone-Check" style={{}}>
                        <div>
                            <div><h3>CS/언어/기본질문 및 개발상식/직무별</h3></div>


                            <input id="input-tag1" placeholder="tag1" onChange={onChangeInput1 } ></input>
                            <input id="input-tag2"  placeholder="tag2" onChange={onChangeInput2 }></input>
                            <input id="input-tag3" placeholder="tag3" onChange={onChangeInput3 }></input>


                            <div> 드롭다운 메뉴

                                <DropdownButton id="dropdown-basic-button1" title="CS">
                                    {Options.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}
                                </DropdownButton>
                            </div>
                            <div>
                                <DropdownButton id="dropdown-basic-button2" title="언어">
                                    {Options1.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}

                                </DropdownButton>
                            </div>
                            <div>
                                <DropdownButton id="dropdown-basic-button3" title="기본질문 및 개발상식">
                                    {Options2.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}

                                </DropdownButton>
                            </div>
                            <div>
                                <DropdownButton id="dropdown-basic-button" title="직무별">
                                    {Options3.map((element) => <Dropdown.Item onClick={() => setSendNum(element.key)} href=""> {element.value}</Dropdown.Item>)}

                                </DropdownButton>
                                <div>
                                <input type="checkbox" name="test" value="1" onChange={(e) => checkOnlyOne(e.target)} /> 면접자
                                </div>
                                <div>
                                <input type="checkbox" name="test" value="2" onChange={(e) => checkOnlyOne(e.target)} /> 면접관
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="Create-delete-modal-footer">
                    <button className="btn-start" onClick= { ()=> {checkclicked(true) }}>연습시작</button>

                        <button className="btn-close" onClick={() => closeModal(false)}>취소</button>
                    </div>
            </div >
        </div >
    )
}




export default CreateRoomWith