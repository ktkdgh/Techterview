var express = require('express');
var router = express.Router();
const { Feedback, LikeCnt, Member, Recording } = require('../models');

router.get('/api/getfeedback', async (req, res) => {
    try {
        const feedbackAll = await Feedback.findAll({ order: [['like_cnt', 'DESC']], include: {model:Recording, include:{model:Member}}})
        feedbackArray = []
        feedbackAll.forEach((value) => {
            feedbackArray.push({
                id: value.id,
                feedback_title: value.feedback_title,
                like_cnt: value.like_cnt,
                reply_cnt: value.reply_cnt,
                user_name: value.Recording.Member.name,
                createdAt: value.createdAt
            })
        })
        res.json(feedbackArray);
    } catch (err) {
        console.error(err);
        done(err);
    }
})

// LikeCnt
router.post('/api/:memberId/:feedbackId', async (req, res) => {
    try {
        memId = req.params.memberId;
        feedId = req.params.feedbackId;
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