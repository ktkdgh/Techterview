import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateRoomAlone from '../modal/CreateRoomAlone';
import LoginCheckModal from '../modal/LoginCheckModal';

function Mainbody() {
    const [openModal, setOpenModal] = useState(false);
    const Authorization = sessionStorage.getItem('Authorization');


    return (
        <div className="Wrapper">
            <div className="main-page-body">
                <div className="body-phrase1"> 기술면접 준비 놓치지 마세요 </div>
                <div className="body-phrase2">TECHTERVIEW에서 실제 면접을 보는 듯한 긴장감을 느끼세요! </div>
            </div>
            <div className='main-page-enter-btn'>
                {Authorization ?
                    <div>
                        <button className='main-page-enter-btn ' onClick={() => { setOpenModal(true); }}  >혼자 연습하기</button>

                        <Link to="/training/others/lobby"><button className='main-page-enter-btn'>함께 연습하기</button></Link>
                        {openModal && <CreateRoomAlone closeModal={setOpenModal} />}
                    </div>
                    :
                    <div>
                        <button className='main-page-enter-btn ' onClick={() => { setOpenModal(true); }}  >혼자 연습하기</button>
                        <button className='main-page-enter-btn ' onClick={() => { setOpenModal(true); }}  >함께 연습하기</button>
                        {openModal && <LoginCheckModal closeModal={setOpenModal} />}
                    </div>
                }

            </div>
            <div className="main-photo1" ><img className="main-photo" src={require("../images/main-image.png")} alt={"studying man"} />
            </div>
        </div>
    )
}

export default Mainbody
