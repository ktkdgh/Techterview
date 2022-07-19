var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');
const { Questions } = require('../../models');

router.get('/api/questions/:subcategory', async (req, res) => {
    // console.log(1);
    try {
        const questionsDB = await Questions.findAll({
            where: { SubCategoryId: req.params.subcategory },
        })
        console.log("length:", questionsDB.length);

        var questions = [];

        questionsDB.forEach((value) => {

            questions.push([value.questions_name, value.questions_url])
            // questions_url.push(value.questions_url)
        })

        res.send(questions)
    } catch (err) {
        console.error(err);
        done(err);
    }
})



module.exports = router;