import React from 'react';
import '../css/TrainingAloneStartModal.css';

function LoginCheckModal({ closeModal }) {

    function getLoginURL() {
        window.location.href = '/login'
    }

    return (
        <div>
            <div className='login-modal' id='login-modal'>
                <div className='login-modal-content'>
                    <div className='login-modal-body'>
                        로그인 후 서비스를 이용해 주세요🧑🏻‍💻
                    </div>
                    <div className='training-alone-start-modal-footer'>
                        <button className='btn-yes' onClick={() => { getLoginURL() }} > 로그인 하러가기</button>
                        <button className='btn-yes' onClick={() => closeModal(false)} > 홈으로 돌아가기</button>
                    </div >
                </div>
            </div>
        </div >
    );
}

export default LoginCheckModal;