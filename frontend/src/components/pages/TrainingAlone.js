import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import PeerjsAlone from '../peerjs/PeerjsAlone';
import { Link } from 'react-router-dom';
import "../css/TrainingAloneStartModal.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';






function TrainingAlone() {
    
    return (

        <div className="training-container">
            <div className='training-inner-box'>
                <PeerjsAlone /></div>
            {/* <div className='training-footer'> */}
                <div className="training-container-box">
                    <div>
                    </div>

                </div>
            </div>
        // </div >
    )
}



export default TrainingAlone