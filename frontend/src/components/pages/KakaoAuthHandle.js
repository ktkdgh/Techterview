import { useEffect } from "react";
import jwt from "jwt-decode"
import api from "../shared/api";
import Spinner from 'react-bootstrap/Spinner';

const KakaoAuthHandle = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        async function getCode() {
            await api.get(`api/auth/${code}`)
                .then(res => {
                    const userInfo = jwt(res.data.accessToken)
                    sessionStorage.setItem("Authorization", res.data.accessToken);
                    sessionStorage.setItem("userName", userInfo.name);
                    window.location.href = '/';
                })
        }
        getCode();
    }, []);

    function BasicExample() {
        return (
            <Spinner animation="border" role="status" style={{ width: "10rem", height: "10rem" }} className="loading-spinner">

            </Spinner>

        );
    }


    return (
        <div className="auth-loader-wrapper">
            <div className="auth-loader">
                <div><BasicExample ></BasicExample></div>
                <div className="display-3">로딩중 ..........</div>
            </div>
        </div>
    );
};
export default KakaoAuthHandle;