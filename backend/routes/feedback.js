var express = require('express');
var router = express.Router();
const { Feedback, LikeCnt, Member, Recording } = require('../models');

// Feedback Main
router.get('/getMain', async (req, res) => {
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
router.post('/:memberId/:feedbackId', async (req, res) => {
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

        const feedback_likes = await Feedback.findOne({where: {id: feedId}})
        console.log(feedback_likes.like_cnt);
        res.send(feedback_likes.like_cnt)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

router.get('/getDetail/:feedbackId/:memberId', async (req, res) => {
    try {
        let flag = false;
        const feedback = await Feedback.findOne({where : {id : req.params.feedbackId}, include: {model:Recording, include:{model:Member}}}) 
        const likeCheck = await LikeCnt.findOne({where: { FeedbackId : req.params.feedbackId, MemberId: req.params.memberId}})
        if (likeCheck) { flag = true; } 
        const detail = {
            title : feedback.feedback_title,
            name : feedback.Recording.Member.name,
            likes : feedback.like_cnt,
            replys : feedback.reply_cnt,

            recordingUrl : feedback.Recording.recording_url,
            userLikeCheck : flag
        }
        res.json(detail)
        
    } catch (err) {
        console.error(err);
        done(err);
    }
})

module.exports = router;