import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../layout/Navbar';
import CreateRoomAlone from '../modal/CreateRoomAlone';

function Mainbody() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="main-page-body">
            <div className="main-page-body">
                <div className="body-phrase1"> 기술면접 준비 놓치지 마세요 </div>
                <div className="body-phrase2">TECHTERVIEW에서 실제 면접을 보는 듯한 긴장감을 느끼세요! </div>
            </div>
            <div className='main-page-enter-btn'>
                {/* <Link to="/training/alone"><button className='main-page-enter-btn ' onClick={() => { setOpenModal(true); }}  >혼자 연습하기</button></Link> */}
                <button className='main-page-enter-btn ' onClick={() => { setOpenModal(true); }}  >혼자 연습하기</button>

                <Link to="/training/otherslobby"><button className='main-page-enter-btn'>함께 연습하기</button></Link>
                {openModal && <CreateRoomAlone closeModal={setOpenModal} />}

            </div>
            <div className="main-photo1" ><img className="main-photo" src={require("../images/main-image.png")} alt={"studying man"} />
            </div>
        </div>
    )
}

export default Mainbody
