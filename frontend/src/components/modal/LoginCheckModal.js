import React, { useEffect, useState, useRef } from 'react';
import '../css/TrainingAloneStartModal.css';

function LoginCheckModal() {
    
    function getLoginURL() {
        window.location.href = '/login'
    }

    return (
        <div>
            <div className='training-alone-start-modal' id='training-alone-start-modal'>
                <div className='training-alone-start-modal-content'>
                    <div className='training-alone-start-modal-body'>
                        로그인하고오셈
                    </div>
                    <div className='training-alone-start-modal-footer'>
                        <button className='btn-yes' onClick={() => { getLoginURL() }} > 로그인 하러가기</button>
                    </div >
                </div>
            </div>
        </div >
    );
}
export default LoginCheckModal;