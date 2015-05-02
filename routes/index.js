var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/LinkIt', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.put('/Links', function(req, res, next) {
});

router.delete('/Links/:id', function(req, res, next) {
  Link.find(req.params.id).then(function(link) {
    if(link != null){
      link.destroy().then(function() {
        res.send(link.title+" deleted");
      });
    }
  })
});

router.get('/Links', function(req, res, next) {
  Link.findAll().then(function(links) {
    res.send(links[0].title);
  });
});

router.post('/Links/:id/Up', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Links/:id/Down', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
