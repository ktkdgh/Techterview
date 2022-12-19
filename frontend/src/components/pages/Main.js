import React, { useState , useEffect} from 'react';
import CreateRoomAlone from '../modal/CreateRoomAlone';
import LoginCheckModal from '../modal/LoginCheckModal';

function Mainbody() {

    const [openModal, setOpenModal] = useState(false);
    const Authorization = sessionStorage.getItem('Authorization');
    const [isMobile, setIsMobile] = useState(false);

    function handleClick() {
        window.location.replace("/training/others/lobby")
    }
    
    useEffect(()=>{
        handleAlert()
    },[])

    function handleAlert() {
        if (detectMobileDevice()) {
        
            setIsMobile(true);
          alert('PC환경에 최적화되어있습니다. \nPC에서 접속해 주세요!');
          return
        } 
      }
    
      function detectMobileDevice() {
        const minWidth = 600;
        return window.innerWidth < minWidth;
      }

    return (
        <>
        {!isMobile &&

        <div className="main-wrapper">
            <div className="main-page-body">
                <div className="body-phrase1"> ㅌㅋㅌㅂ </div>
                <div className="body-phrase2">TECHTERVIEW에서 실제 면접을 보는 듯한 긴장감을 느끼세요! </div>
            </div>
            <div className='main-page-enter-btn'>

                {Authorization ?
                    <div className='main-image-button-container'>
                        <img className="alone-btn-img" onClick={() => { setOpenModal(true); }} src={require("../images/alonebutton.png")} alt={"혼자하기"} />
                        <img className="main-photo" src={require("../images/main-image.png")} alt={"studying man"} />
                        <img className="together-btn-img" onClick={() => { handleClick(); }} src={require("../images/togetherbutton.png")} alt={"함꼐하기"} />
                        {openModal && <CreateRoomAlone closeModal={setOpenModal} />}
                    </div>
                    :
                    <div className='main-image-button-container'>
                        <img className="alone-btn-img" onClick={() => { setOpenModal(true); }} src={require("../images/alonebutton.png")} alt={"혼자하기"} />
                        <img className="main-photo" src={require("../images/main-image.png")} alt={"studying man"} />
                        <img className="together-btn-img" onClick={() => { setOpenModal(true); }} src={require("../images/togetherbutton.png")} alt={"함께하기"} />
                        {openModal && <LoginCheckModal closeModal={setOpenModal} />}
                    </div>
                }
            </div>
        </div>
        }
        </>
    )
}

export default Mainbody