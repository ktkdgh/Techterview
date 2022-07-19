import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";

const KakaoAuthHandle = (props) => {
    const dispatch = useDispatch();
    let code = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        dispatch(userActions.kakaoLogin(code));    
    }, []);

    return (
        <div>123</div>
    );
};

export default KakaoAuthHandle;