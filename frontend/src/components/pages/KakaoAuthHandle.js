import { useEffect } from "react";
import jwt from "jwt-decode"
import api from "../shared/api";

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

    return (
        <div>로그인 중입니다 잠시만 기다려주세요 ^-^</div>
    );
};
export default KakaoAuthHandle;