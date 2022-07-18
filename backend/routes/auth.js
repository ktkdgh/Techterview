const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios')
const { verifyToken, makeAccessToken, makeRefreshToken } = require('../util/jwt');
const { snsSignUp, isExistSnsId } = require('../config/kakaoAuth');

dotenv.config();

const KAKAO_AUTH_URL = process.env.KAKAO_AUTH_URL
const KAKAO_AUTH_REDIRECT_URL = process.env.KAKAO_AUTH_REDIRECT_URL

router.post("/api/silentRefresh", (req, res, next) =>{
    const {refreshToken} = req.cookies;
    const verifyAccessToken = verifyToken(refreshToken);
    console.log('verifyAccessToken : ', verifyAccessToken);

    if(verifyAccessToken.id){
        const accessToken = makeAccessToken(verifyAccessToken.id);
        const refreshToken = makeRefreshToken(verifyAccessToken.id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true
        });
        return res.json({accessToken})
    }
    return res.json({test:"Test"})
});

router.get("/kakao", (req, res, next) => {
    return res.redirect(`${KAKAO_AUTH_URL}/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_AUTH_REDIRECT_URL}&response_type=code`)
})

router.get("/kakao/callback", async(req, res, next) => {
    const {code} = req.query;
    
    try {
        const {data} = await axios({
            method: 'POST',
            url: `${KAKAO_AUTH_URL}/token`,
            headers:{
                'content-type':'application/x-www-form-urlencoded;charset=utf-8'
            }, params:{
                grant_type: 'authorization_code',
                client_id:process.env.KAKAO_CLIENT_ID,
                client_secret:process.env.KAKAO_CLIENT_SECRET,
                redirectUri:KAKAO_AUTH_REDIRECT_URL,
                code:code,
            }
        })
    const kakao_access_token = data['access_token'];
    
    const {data:me} = await axios({
        method: 'GET',
        url: `https://kapi.kakao.com/v2/user/me`,
        headers:{
            'authorization':`bearer ${kakao_access_token}`,
        }
    });
    const {id, kakao_account} = me;
        
    const userInformation = {
        sns_id: id,
        provider: 'kakao',  
        name : kakao_account.profile.nickname,
    };

    const user_id = await isExistSnsId(userInformation.provider, userInformation.sns_id);
    console.log('user_id : ', user_id);

    if(user_id) {
        const refreshToken = makeRefreshToken(user_id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true
        });
    } else {
        const signUpUserId = await snsSignUp(userInformation);
        console.log('signUpUserId : ', signUpUserId);
        const refreshToken = makeRefreshToken(signUpUserId);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true
        });
    }
    } catch (error){
        console.log(error);
    }
    return res.redirect("http://localhost:3000")
});
module.exports = router;