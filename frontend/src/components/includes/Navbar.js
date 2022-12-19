import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router"
import LoginCheckModal from '../modal/LoginCheckModal';

function Navbar() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [ isName, setIsName] = useState("")
    const [ isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        if (sessionStorage.getItem('userName') === undefined || sessionStorage.getItem('userName') === null) return;
        async function test() {
            if(sessionStorage.getItem('userName') !== null){
                setIsLoggedIn(true)
                setIsName(sessionStorage.getItem('userName'))
            } 
        } 
        test();
    },[])
    

    function handleClick() {
        window.location.replace(`/`)
    }



    const onLogout = () => {
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('Authorization')
        document.location.href = '/'
    }

    useEffect(()=>{
        handleAlert()
    },[])
  function handleAlert() {
    if (detectMobileDevice()) {
        setIsMobile(true);
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
            <div>
                <div>
                    <div className="navigation-bar"> 
                        <div className="navigation-bar-logo" onClick={()=> {handleClick()}}> TECHTERVIEW </div>
                            
                        <div className="navigation-bar-right">
                            { isLoggedIn ? 
                            <div className="navigation-bar-content" >
                                <Link to="/feedback/main"><button className="interview-feedback-page-btn">답변 둘러보기</button></Link>
                                <Link to="/questionlist/main"><button className="interview-question-page-btn">질문 담기</button></Link>
                            </div>
                            :
                            <div className="navigation-bar-content">
                                <button className='interview-feedback-page-btn' onClick={() => { setOpenModal(true); }}  >답변 둘러보기</button>
                                <button className='interview-question-page-btn' onClick={() => { setOpenModal(true); }}  >질문 담기</button>
                                {openModal && <LoginCheckModal closeModal={setOpenModal} />}
                            </div>
                            }
                            { isLoggedIn ? 
                                <div className="navigation-bar-content">
                                    <Link to="/feedback/myvideo"><button className="interview-my-page-btn">{ isName } 님</button></Link>
                                    <a onClick={ onLogout }><button className="interview-login-page-">로그아웃</button></a>
                                </div>
                                :
                                <div className="navigation-bar-content">
                                <Link to="/login"><button className="interview-login-page-">로그인</button></Link> 
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
            <Outlet/>
        </> 
    )
}

export default Navbar