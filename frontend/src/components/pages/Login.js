import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../shared/kakaoApi'



class Login extends Component {
    render() {
        return (
            <div className="main-page-body">
                <div className="main-page-body">
                    <div className="login-phrase1"> 반가워요, 개발자의 성장을 돕는  <br /><span
                        className="login-phrase2">테크터뷰</span>입니다. </div>
                </div>
                        {/* <p className="login-logo">로그인 </p> */}
                        <div className='login-body'>
                            <div className="login-photo" ><img className="login-photo" src={require("../images/desk2.png")} alt={"studying man2"} />
                            </div>
                            <div className="logInImage">
                                <div className="kakaoImage">
                                    <a href={ KAKAO_AUTH_URL }><img src={require("../images/kakao_login.png")} alt="my image" onClick={this.myfunction} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

        )
    }
}
export default Login
