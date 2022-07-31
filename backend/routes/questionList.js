var express  = require('express');
var router   = express.Router();
const { Questions } = require('../models');

router.get('/getQuestionList/:category/:number', async(req, res) => {
    try {
        const question = await Questions.findAll({where: {SubCategoryId: req.params.number}})

        Questions_array = []
        question.forEach((value) => {
            Questions_array.push({
                id : value.id,
                name : value.questions_name,
            })
        })

        res.json(Questions_array)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

router.post('/randomQuestion', async(req, res) => {
    try {
        const questionList = []
        for (let value of req.body.list) {
            const question = await Questions.findOne({where: {questions_name : value}})
            // questionList.push([value, question.questions_url])
            questionList.push({
                questions_name : question.questions_name,
                questions_url: question.questions_url,
                questions_keyword: question.questions_keyword
            })
        }
        res.json(questionList)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

module.exports = router;