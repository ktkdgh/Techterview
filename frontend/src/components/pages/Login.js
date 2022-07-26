import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../shared/kakaoApi'
import "../../index.css"



class Login extends Component {
    render() {
        return (
            <div className="Wrapper-login">

                <div className="main-page-body">
                    <div className="navigation-bar-logo"> TECHTERVIEW </div>

 
                </div>
            <div className="login-body">
                <div className="login-photo" ><img className="login-photo" src={require("../images/desk2.png")} alt={"studying man2"} /></div>

                <div className='login-phrase-image-container'>
                    <div className="login-phrase-container">
                        <div className="login-phrase1"> 반가워요, 개발자의 성장을 돕는  <br />
                        <span className="login-phrase2"> 테크터뷰</span>입니다. </div>
                    </div>
                    <div className="kakaoImage">
                        <a href={KAKAO_AUTH_URL}><img src={require("../images/kakao_login.png")} alt="login" onClick={this.myfunction} /></a>
                    </div>
                </div>
            </div>   
            
            </div>

        )
    }
}
export default Login