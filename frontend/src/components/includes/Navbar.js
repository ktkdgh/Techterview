import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Outlet} from "react-router"
import axios from 'axios';

function Navbar() {
    
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect(() =>{
        axios.post('http://localhost:8000/auth/api/silentRefresh',{})
        .then(res=> {
        console.log(res);
        const {accessToken} = res.data;
        console.log(accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setIsLoggedIn(true)
    });
    } ,[])

    return (
        <>  
            <div>
                <div>
                    <div className="navigation-bar"> 
                        <Link to="/" style={{textDecoration: 'none'}}><div className="navigation-bar-logo"> TECHTERVIEW </div></Link> 
                        <div className="navigation-bar-right">
                            <Link to="/questionlist/main"><button className="interview-question-page-btn">질문 리스트</button></Link>
                            <Link to="/feedback/main"><button className="interview-feedback-page-btn">피드백</button></Link>
                            <Link to="/feedback/myvideo"><button className="interview-my-page-btn">마이페이지</button></Link>
                            { isLoggedIn ? 
                            <a href='http://localhost:8000/logout'><button className="interview-login-page-">로그아웃</button></a>
                            : <Link to="/login"><button className="interview-login-page-">로그인</button></Link> }
                            
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </> 
    )
}

export default Navbar