import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router"


function Navbar() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ isName, setIsName] = useState("")
    
    useEffect(() => {
        if (sessionStorage.getItem('userName')=== undefined || sessionStorage.getItem('userName') === null) return;
        async function test() {
            if(sessionStorage.getItem('userName') !== null){
                setIsLoggedIn(true)
                setIsName(sessionStorage.getItem('userName'))
            } 
        } 
        test();
    },[])

    const onLogout = () => {
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('Authorization')
        document.location.href = '/'
    }

    return (
        <>  
            <div>
                <div>
                    <div className="navigation-bar"> 
                        <Link to="/" style={{textDecoration: 'none'}}><div className="navigation-bar-logo"> TECHTERVIEW </div></Link> 
                        <div className="navigation-bar-right">
                            <Link to="/questionlist/main"><button className="interview-question-page-btn">질문 리스트</button></Link>
                            <Link to="/feedback/main"><button className="interview-feedback-page-btn">피드백</button></Link>
                            { isLoggedIn ? 
                                <div>
                                    <Link to="/feedback/myvideo"><button className="interview-my-page-btn">{ isName } 님</button></Link>
                                    <a onClick={ onLogout }><button className="interview-login-page-">로그아웃</button></a>
                                </div>
                                :
                                <Link to="/login"><button className="interview-login-page-">로그인</button></Link> 
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </> 
    )
}

export default Navbar