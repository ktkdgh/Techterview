var express  = require('express');
var router   = express.Router();
const { Action } = require('../../models');

router.get('/getAction', async (req, res) => {
    try {
        const action = await Action.findAll()
        let actions = []
        action.forEach((value) => {
            actions.push([value.action_name])
        })

        res.send(actions)
    } catch (err) {
        console.error(err);
        done(err);
    }
})

module.exports = router;
