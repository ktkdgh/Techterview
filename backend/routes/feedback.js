var express  = require('express');
var router   = express.Router();
const { Feedback, LikeCnt } = require('../models');

router.get('/api/getfeedback', async(res, req) => {
    try {
        const feedback = await Feedback.create({
            feedback_url: "http://시발련아",
            feedback_title: "머요",
        })

        
    } catch (err) {
        console.log(err);
        done(err);
    }
})


module.exports = router;