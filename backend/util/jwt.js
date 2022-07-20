const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.TECHTERVIEW)
        return decoded;
    } catch (error) {
        console.log(err)
        return false
    }   
}

const makeAccessToken = ({id, sns_id, name}) => {
    try {
        return jwt.sign({
            id, sns_id, name
        }, process.env.TECHTERVIEW, {
            expiresIn: '2h'
        })
    } catch (error) {
        
    }
}

const makeRefreshToken = ({id, sns_id, name}) => {
    try {
        return jwt.sign({
            id, sns_id, name
        }, process.env.TECHTERVIEW, {
            expiresIn: '14d'
        })
    } catch (error) {
        return "error"
    }
}
module.exports = {verifyToken , makeAccessToken, makeRefreshToken}