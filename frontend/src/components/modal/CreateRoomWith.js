import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { socket } from "../../lib/socket";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import jwt from 'jwt-decode'

function CreateRoomWith({ closeModal , handleNewRoom}) {

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
    const roomId = uuidv4();
    const [clicked, checkclicked] = useState(false);
    const [SendNum, setSendNum] = useState(0)
    const [Mandatoryselect, setMandatoryselect] = useState("");

    function handleClick() {
        if (!SendNum) {
            setMandatoryselect("카테고리는 필수선택 사항입니다!!")
            console.log("asdfasdf"); 
        } else {
            sessionStorage.removeItem('QuestionList')
            window.location.replace("/training/with/" + SendNum + "/" + roomId)
        }
    }
    
    const [roomName, setRoomName] = useState('');

    const onChangeInput0  = (e) => {
        setRoomName(e.target.value);
    };

    
    useEffect(() => {
        if(clicked===true) {
            const Token = sessionStorage.getItem('Authorization')
            const memberId = jwt(Token).id
            socket.emit("createRoom", roomId, SendNum,roomName,checkedTitle,checkedValue, checkedInterview, memberId);
            handleClick()
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clicked]);

    const [radioValue, setRadioValue] = useState('1');
    const [checkedValue, setCheckedValue] = useState("");
    const [checkedTitle, setcheckedTitle] = useState("");
    const [checkedInterview, setCheckedInterview] = useState(0);
    // const [secret, setSecret] = useState(0);

    const checkOnlyOne = (checkThis) => {
        setCheckedInterview(checkThis.value)
        const checkboxes = document.getElementsByName('test')
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
    }
    
    return (
        <div className="Create-delete-modal">
            <div className="Create-delete-modal-content"  style={{position:"relative", textAlign:"center"}}>
            <div className="Create-delete-modal-body">
                    <h2>어떤 면접을 준비해 볼까요?</h2><br/>
                </div>
                    <div className="create-room-header" style={{display: "flex", justifyContent: "center", verticalAlign:"middle"}}> 
                        <div style={{paddingTop:"0.5rem"}}><input id="input-room-name" placeholder="방제목을 입력해주세요!!" name="roomname" onChange={onChangeInput0} style={{height: "2rem"}}/></div>

                        <div className="interview-checkbox" style={{width: "12rem",paddingBottom:"1rem"}}>
                            <div  ><input  type="checkbox" name="test" value="1" onChange={(e) => checkOnlyOne(e.target)} />  면접자 </div>
                            <div > <input  type="checkbox" name="test" value="2" onChange={(e) => checkOnlyOne(e.target)} /> 면접관 </div>
                        </div>
                    </div>
                    <h6 style={{margin: 20}}>아래 4가지의 카테고리 중 하나를 선택해보세요!</h6>
                    {Mandatoryselect ? Mandatoryselect: ""}

                    <div>
                        <Tabs   style={{ width: 520, borderBottom:"none"  }}
                            defaultActiveKey="profile"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="CS" title="CS" onClick={()=> setcheckedTitle("CS")}>
                                <ButtonGroup>
                                    {Options.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => {setSendNum(radio.key); setCheckedValue(radio.value)}}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                                <div style={{borderBottom: "1px solid #dee2e6" , marginTop:"3rem" }}></div>

                            </Tab>
                            <Tab eventKey="Language" title="Language" onClick={()=> setcheckedTitle("Language")}>
                                <ButtonGroup>
                                    {Options1.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio1-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => {setSendNum(radio.key); setCheckedValue(radio.value)}}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                                <div style={{borderBottom: "1px solid #dee2e6" , marginTop:"3rem" }}></div>

                            </Tab>
                            <Tab eventKey="Basic" title="Basic" onClick={()=> setcheckedTitle("Basic")}>
                                <ButtonGroup>
                                    {Options2.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio2-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => {setSendNum(radio.key); setCheckedValue(radio.value)}}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                                <div style={{borderBottom: "1px solid #dee2e6" , marginTop:"3rem" }}></div>
                            </Tab>
                            <Tab eventKey="Position" title="Position" onClick={()=> setcheckedTitle("Position")}>
                                <ButtonGroup>
                                    {Options3.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio3-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => {setSendNum(radio.key); setCheckedValue(radio.value)}}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                                <div style={{borderBottom: "1px solid #dee2e6" , marginTop:"3rem" }}></div>
                            </Tab>
                        </Tabs>
                    </div>

                    <div>
                        {/* <input type="checkbox" onClick={()=> setSecret(1)} /> 비밀방 */}
                    </div>
                    <div className="create-delete-modal-footer" style={{position:"absolute",  top: "65%",left: "25%"}}>
                        <button className="go-interview-btn" onClick={()=> { checkclicked(true)}}>면접하러 가기</button>
                        <button className="next-time-interview-btn" onClick={() => closeModal(false)}>다음에 할래요</button>
                    </div>
            </div >
        </div >
    )
}




export default CreateRoomWith
