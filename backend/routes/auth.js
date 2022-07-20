const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');
const { verifyToken, makeAccessToken, makeRefreshToken } = require('../util/jwt');
const { snsSignUp, isExistSnsId } = require('../config/kakaoAuth');
dotenv.config();

const KAKAO_AUTH_URL = process.env.KAKAO_AUTH_URL
const KAKAO_AUTH_REDIRECT_URL = process.env.KAKAO_AUTH_REDIRECT_URL

router.get("/api/:code", async(req, res, next) => {
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
                code:req.params.code,
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
        let newRefreshToken;
        if(user_id) {
            newRefreshToken = makeRefreshToken(user_id);
        } else {
            const user = await snsSignUp(userInformation);
            newRefreshToken = makeRefreshToken(user);
        }

        const verifyAccessToken = verifyToken(newRefreshToken);
        
        if(verifyAccessToken) {
            const accessToken = makeAccessToken(verifyAccessToken);
            const refreshToken = makeRefreshToken(verifyAccessToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true
            });
            return res.json({accessToken})
        }
        return res.json({success : false})
    } catch (error){
        console.log(error);
    }
});
module.exports = router;