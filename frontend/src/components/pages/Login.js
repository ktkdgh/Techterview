import React, { Component } from 'react';
import { KAKAO_AUTH_URL } from '../shared/kakaoApi'

class Login extends Component {
    render() {
        function goToHome() {
            window.location.replace(`/`)
        }

        return (
            <div className="wrapper-login">
                <div className="main-page-body">
                    <div className="login-navigation-bar-logo" onClick={()=> {goToHome()}} > TECHTERVIEW </div>
                </div>
                <div className="login-body">
                    <div className="login-photo" ><img className="login-photo" src={require("../images/desk1.png")} alt={"studying man1"} /></div>
                    <div className='login-phrase-image-container'>
                        <div className="login-phrase-container">
                            <div className="login-phrase1"> 반가워요, <br/>개발자의 성장을 돕는<br />
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