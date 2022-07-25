import React, { useState, useRef } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import Selection from "../includes/Selection";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
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

    const [SendNum, setSendNum] = useState()
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    function handleClick() {
        window.location.replace("../page/training/Alone/" + SendNum)
    }
    return ( 
        <div className="Create-delete-modal">
            <div className="Create-delete-modal-content">
                <div className="Create-delete-modal-body">
                    <h2>어떤 면접을 준비해 볼까요?</h2>
                </div>
                <div className="CreateRoomAlone-Check" style={{}}>
                    <div>
                        <Tabs style={{ width: 525 }}
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="CS" title="CS">

                                <ButtonGroup className="mb-2">
                                    {Options.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-primary"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(radio.key)}
                                        >
                                            {radio.value}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Tab>
                            <Tab eventKey="Language" title="언어">
                                <ButtonGroup className="mb-2">
                                    {Options1.map((element, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-primary"
                                            name="radio"
                                            value={element.value}
                                            checked={radioValue === element.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(element.key)}
                                        >
                                            {element.value}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>

                            </Tab>
                            <Tab eventKey="base" title="기본질문 및 개발상식" >
                                <ButtonGroup className="mb-2">
                                    {Options2.map((element, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-primary"
                                            name="radio"
                                            value={Options.value}
                                            checked={radioValue === element.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(element.key)}
                                        >
                                            {element.value}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Tab>
                            <Tab eventKey="position" title="직무별" >
                                <ButtonGroup className="mb-2">
                                    {Options3.map((element, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-primary"
                                            name="radio"
                                            value={Options.value}
                                            checked={radioValue === element.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            onClick={() => setSendNum(element.key)}
                                        >
                                            {element.value}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Tab>
                        </Tabs>
                    </div>
                    <div> 
                    </div>
                    <div className="Create-delete-modal-footer"style={{ marginTop: 200, backgroundColor: "yellow" }}>
                        <button className="btn-start" onClick={handleClick}>연습시작</button>
                        <button className="btn-close" onClick={() => closeModal(false)}>취소</button>
                    </div>
                </div >
            </div >
        </div >
    )
}

// function Selection() {
//     return (
//         <Tabs style={{ width: 525 }}
//             defaultActiveKey="profile"
//             id="uncontrolled-tab-example"
//             className="mb-3"
//         >
//             <Tab eventKey="CS" title="CS">
//                 123123
//             </Tab>
//             <Tab eventKey="Language" title="언어">
//                 456456
//             </Tab>
//             <Tab eventKey="base" title="기본질문 및 개발상식" >
//                 678678
//             </Tab>
//             <Tab eventKey="position" title="직무별" >
//                 890890
//             </Tab>
//         </Tabs>
//     );
// }


export default CreateRoomAlone