var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title : 'Techterview'});
});

router.get('/logout', (req, res) => {
  req.logout
  req.session.destroy();
  res.redirect('http://localhost:3000/')
})
module.exports = router;