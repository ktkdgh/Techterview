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
        res.json({Detaillikes : feedback_likes.like_cnt})
    } catch (err) {
        console.error(err);
        done(err);
    }
})

// Feedback Detail
router.get('/getDetail/:feedbackId/:memberId', async (req, res) => {
    try {
        let flag = false;
        const feedback = await Feedback.findOne({where : {id : req.params.feedbackId}, include: {model:Recording, include:{model:Member}}})
        const likeCheck = await LikeCnt.findOne({where: { FeedbackId : req.params.feedbackId, MemberId: req.params.memberId}})
        let DetailId = feedback.Recording.Member.id
        let userId = req.params.memberId
        if (likeCheck) { flag = true; } 
        const detail = {
            title : feedback.feedback_title,
            name : feedback.Recording.Member.name,
            likes : feedback.like_cnt,
            replys : feedback.reply_cnt,
            recordingUrl : feedback.Recording.recording_url,
            userLikeCheck : flag,
            deletebotton : DetailId == userId
        }
        res.json(detail)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

// Feedback delete
router.delete('/deletePage/:feedbackId', async (req, res) => {
    try {
        const result = await Feedback.destroy({where: {id: req.params.feedbackId}})
        if (result) {
            res.json({success : true })
        } else {
            res.json({success : false })
        }
    } catch (err) {
        console.error(err);
        done(err)
    }
})

// Feedback Category Select
router.get('/getCategory/:categoryId', async (req, res) => {
    try {
        console.log(11);

    } catch (err) {
        console.error(err);
        
        done(err);
    }
})

module.exports = router;