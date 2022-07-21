import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import PeerjsAlone from '../peerjs/PeerjsAlone';
import { Link } from 'react-router-dom';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 


function TrainingAlone() {
    return (

        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <Link to="/" style={{textDecoration: 'none'}}><div className="training-navigation-bar-logo"> TECHTERVIEW </div></Link> 
            <div className='training-inner-box'>
                <PeerjsAlone /></div>
            <div className='training-footer'>
                <div className="training-container-box">
                    <div>
                    </div>

                </div>
            </div>
        </div >
    )
}



export default TrainingAlone