var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/LinkIt', function(req, res, next) {
  Link.findAll({include: [{ all: true }]}).then(function(links) {
    res.render('home', { links: links });
  });
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

router.post('/links/:id/up', function(req, res, next) {
  if(req.app.current_user == undefined){
    res.send("Please log in");
    return;
  }
  Link.find(req.params.id).then(function(link) {
    link.getVotes({ where: 'UserId = '+req.app.current_user.id }).then(function(votes) {
      if(votes.length == 0){
        link.rating = link.rating + 1;
        link.save();
        Vote.create({ 
          upvote: true,
          UserId: req.app.current_user.id,
          LinkId: link.id
        });
      }else{
        res.send("Vote count "+votes.length);
      }
    })
  });
});

router.post('/links/:id/down', function(req, res, next) {
  if(req.app.current_user == undefined){
    res.send("Please log in");
    return;
  }
  Link.find(req.params.id).then(function(link) {
    link.getVotes({ where: 'UserId = '+req.app.current_user.id }).then(function(votes) {
      if(votes.length == 0){
        link.rating = link.rating - 1;
        link.save();
        Vote.create({ 
          upvote: false,
          UserId: req.app.current_user.id,
          LinkId: link.id
        });
      }else{
        res.send("Vote count "+votes.length);
      }
    })
  });

});

router.post('/login_as/:username', function(req, res, next) {
  User.find({
      where: {
        name: req.params.username
      }
  }).then(function(user){
    req.app.current_user = user;
  });
});


module.exports = router;
