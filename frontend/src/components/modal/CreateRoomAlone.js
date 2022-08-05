import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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

    const [SendNum, setSendNum] = useState(0)
    const [Mandatoryselect, setMandatoryselect] = useState("아래 4가지의 카테고리 중 하나를 선택해보세요!");
    const [radioValue, setRadioValue] = useState('1');

    function handleClick() {
        if (!SendNum) {
            setMandatoryselect("카테고리는 필수선택 사항입니다!!")
        } else {
            sessionStorage.removeItem('QuestionList')
            window.location.replace("../page/training/Alone/" + SendNum)
        }
    }

    return (
        <div className="Create-delete-modal">
            <div className="Create-delete-modal-content" style={{ position: "relative", textAlign: "center" }}>
                <div className="Create-delete-modal-body">
                    <h2>어떤 면접을 준비해 볼까요?</h2><br />
                </div>
                <div style={{ marginTop: "3rem", marginBottom: "1.3rem" }}>{Mandatoryselect ? Mandatoryselect : ""}</div>
                <div className="CreateRoomAlone-Check" >
                    <div >
                        <Tabs style={{ width: 520, borderBottom: "none" }}
                            defaultActiveKey="profile"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="CS" title="CS">
                                <ButtonGroup>
                                    {Options.map((radio, idx) => (
                                        <ToggleButton
                                            style={{ marginTop: "0.5rem" }}
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(radio.key)}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>

                            </Tab>
                            <Tab eventKey="Language" title="Language">
                                <ButtonGroup>
                                    {Options1.map((radio, idx) => (
                                        <ToggleButton
                                            style={{ marginTop: "0.5rem", padding: "1.1rem" }}
                                            key={idx}
                                            id={`radio1-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(radio.key)}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Tab>
                            <Tab eventKey="Basic" title="Basic">
                                <ButtonGroup>
                                    {Options2.map((radio, idx) => (
                                        <ToggleButton
                                            style={{ marginTop: "0.5rem", padding: "1.1rem" }}
                                            key={idx}
                                            id={`radio2-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(radio.key)}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Tab>
                            <Tab eventKey="Position" title="Position" >
                                <ButtonGroup>
                                    {Options3.map((radio, idx) => (
                                        <ToggleButton
                                            style={{ marginTop: "0.5rem", padding: "1.1rem" }}
                                            key={idx}
                                            id={`radio3-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(radio.key)}
                                        > {radio.value} </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Tab>
                        </Tabs>

                    </div>
                    <div className="create-delete-modal-footer" style={{ paddingTop: "1rem", position: "absolute", width: "82%", bottom: "15%", left: "8%", borderTop: "1px solid #dee2e6", }}>
                        <button className="go-interview-btn" onClick={() => handleClick()}>면접하러 가기</button>
                        <button className="next-time-interview-btn" onClick={() => closeModal(false)}>다음에 할래요</button>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default CreateRoomAlone