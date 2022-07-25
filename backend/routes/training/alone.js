var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');
const { Questions, Recording } = require('../../models');

router.get('/questions/:subcategory', async (req, res) => {
    try {
        const questionsDB = await Questions.findAll({
            where: { SubCategoryId: req.params.subcategory },
        })

        var questions = [];
        questionsDB.forEach((value) => {
            questions.push([value.questions_name, value.questions_url])
        })

        // res.send(shuffle(questions))
        res.send(questions)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

router.post('/recordingCreate', async (req, res) => {
    try {
        await Recording.create({
            recording_title : req.body.title,
            recording_url: req.body.recording_url,
            MemberId: req.body.id
        })
        res.json({success : true})
    } catch (err) {
        console.error(err);
        done(err);
    }
})
module.exports = router;