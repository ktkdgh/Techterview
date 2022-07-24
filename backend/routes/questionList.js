var express  = require('express');
var router   = express.Router();
const { Questions } = require('../models');




router.get('/getQuestionList/:category/:number', async(req, res) => {
    try {
        console.log(req.params.category);
        console.log(req.params.number);
        const question = await Questions.findAll({where: {SubCategoryId: req.params.number}})

        Questions_array = []
        question.forEach((value) => {
            Questions_array.push({
                id : value.id,
                name : value.questions_name,
            })
        })

        console.log(Questions_array);
        res.json(Questions_array)
    } catch (err) {
        console.error(err);
        done(err);
    }
})


module.exports = router;