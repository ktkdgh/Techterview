var express = require('express');
var router = express.Router();
const { Feedback, LikeCnt, Member } = require('../models');

router.get('/api/getfeedback', async (req, res) => {
    try {
        const feedbackAll = await Feedback.findAll({ order: [['like_cnt', 'DESC']]})
        // const like_cnt = await LikeCnt.findAll([{include: Member}])
        feedback_array = []
        feedbackAll.forEach((value) => {
            feedback_array.push(value.dataValues)
        })
        res.send(feedback_array)
        console.log(JSON.stringify(like_cnt, null, 2));
    } catch (err) {
        console.error(err);
        done(err);
    }
})

// LikeCnt
router.post('/api/:memberId/:feedbackId', async (req, res) => {
    try {
        memId = res.params.memberId;
        feedId = res.params.feedbackId;
        const likes = await LikeCnt.findOne({ where: { MemberId: memId, FeedbackId: feedId }})
        
        if (likes) {
            await LikeCnt.destroy({ where: { MemberId : memId, FeedbackId : feedId }})
            await Feedback.decrement({like_cnt: 1}, {where: { id: feedId }})
        } else {
            await LikeCnt.create({ MemberId : memId, FeedbackId : feedId })
            await Feedback.increment({like_cnt: 1}, {where: { id: feedId }})
        }
    } catch (err) {
        console.error(err);
        done(err);
    }
})

module.exports = router;