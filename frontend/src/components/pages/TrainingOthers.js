import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PeerOthersroom from '../peerjs/PeerOthersroom'
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom"; 


function TrainingOthers() {

    const location = useLocation();

    console.log("roomId",location)
    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>
                <PeerOthersroom  />

            <div className='training-footer'>
                <div className="training-container-box">
                </div>
            </div>
        </div>
    )
}


function BasicButtonExample() {
    return (
        <DropdownButton id="dropdown-basic-button" title="선택해주세요">
            <Dropdown.Item href="#/action-1">직무별</Dropdown.Item>
            <Dropdown.Item href="#/action-2">카테고리별</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
    );
}


export default TrainingOthers

