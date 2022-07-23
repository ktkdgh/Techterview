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
            <Spinner animation="border" role="status" style={{width: "23rem", height: "23rem"}} className="justify-content-center align-items-center">
        
           </Spinner>
     
        );
    }
    
    
    return (
        <div>
            <div><BasicExample ></BasicExample></div>
            <div className="display-3">로딩중 ..........</div>

        </div>
    );
};
export default KakaoAuthHandle;