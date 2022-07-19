var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');
const { Questions } = require('../../models');

router.get('/api/questions/:subcategory', async (req, res) => {
    console.log(1);
    try {
        const questionsDB = await Questions.findAll({
            where: { SubCategoryId: req.params.subcategory },
        })
        console.log("length:", questionsDB.length);
        var questions = [];
        var questions_url = [];

        questionsDB.forEach((value) => {
            questions.push(value.questions_name)
        })

        questionsDB.forEach((value) => {
            questions_url.push(value.questions_url)
        })

        console.log(questions_url);
        // shuffle(questions)

        const dataQuestions = {
            questions: questions
        }
        const dataUrl = {
            questions_url: questions_url
        }


        res.send(dataQuestions)
        res.send(dataUrl)
    } catch (err) {
        console.error(err);
        done(err);
    }
})



module.exports = router;