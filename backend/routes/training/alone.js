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
            // questions.push([value.questions_name, value.questions_url])
            questions.push({
                questions_name : value.questions_name,
                questions_url: value.questions_url,
                questions_keyword: value.questions_keyword
            })
        })

        // res.send(shuffle(questions))
        res.json(questions)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

router.post('/recordingCreate', async (req, res) => {
    try {
        await Recording.create({
            recording_title: req.body.title,
            recording_url: req.body.recording_url,
            MemberId: req.body.id
        })
        res.json({ success: true })
    } catch (err) {
        console.error(err);
        done(err);
    }
})

router.post('/getrecording', async (req, res) => {
    try {
        let recordingList = []
        const recording = await Recording.findAll({ where: { recording_check: '0', MemberId: req.body.memberId } })
        recording.forEach((value) => {
            recordingList.push({
                id: value.id,
                recording_title: value.recording_title,
                createdAt: value.createdAt,
                recording_url: value.recording_url
            })
        })

        res.json(recordingList)

    } catch (err) {
        console.error(err);
        done(err);
    }
})

router.post('/saverecording', async (req, res) => {
    try {
        for (let value of req.body.saveList) {
            await Recording.update({ recording_check: '1' }, { where: { id: value } })
        }
        const recordingCheck = await Recording.findAll({ where: { recording_check: '0' } })
        for (let value of recordingCheck) {
            await Recording.destroy({ where: { id: value.id } })
        }
        res.json({ success: true })
    } catch (err) {
        console.error(err);
        done(err);
    }
})
module.exports = router;
