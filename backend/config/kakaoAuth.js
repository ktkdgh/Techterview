const { Member } = require('../models');

const isExistSnsId = async(provider, sns_id) => {
    try {
        const result =  await Member.findOne({
            where:{
                sns_id,
                provider
            }
        });
    
        if(result['dataValues'].id){
            return result['dataValues'].name;
        }else{
            throw new Error();
        }
        
    } catch (error) {
        return false;
        
    }
}

const snsSignUp = async({ sns_id, provider, name }) => {
    try {
        const user = await Member.create({
            sns_id : sns_id,
            name : name,
            provider : provider
        });
        return user['dataValues'].name;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = { snsSignUp, isExistSnsId }