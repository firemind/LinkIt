var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/LinkIt', function(req, res, next) {
  Link.findAll({include: [{ all: true }]}).then(function(links) {
    res.render('home', { links: links, current_user: req.app.current_user });
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
  Link.findAll({include: [{ all: true }]}).then(function(links) {
    res.render('linkList', { links: links, current_user: req.app.current_user });
  });
});

router.get('/Links/:id/rating', function(req, res, next) {
  Link.find(req.params.id).then(function(link) {
    res.send(''+link.rating);
  });
});

router.post('/links/:id/up', function(req, res, next) {
  if(req.app.current_user == undefined){
    res.send("Please log in");
    return;
  }
  doVote(true, req, res);
});

  router.post('/links/:id/down', function(req, res, next) {
  if(req.app.current_user == undefined){
    res.send("Please log in");
    return;
  }
  doVote(false, req, res);
});

doVote = function(upvote, req, res){  
Link.find(req.params.id).then(function(link) {
    link.getVotes({ where: 'UserId = '+req.app.current_user.id }).then(function(votes) {
      if(votes.length == 0){
        link.rating += upvote ? 1 : -1;
        link.save();
        Vote.create({ 
          upvote: upvote,
          UserId: req.app.current_user.id,
          LinkId: link.id
        });
        res.send("success");
      }else{
        res.send("Vote count "+votes.length);
      }
    })
  });
  }

router.post('/login_as/:username', function(req, res, next) {
  User.find({
      where: {
        name: req.params.username
      }
  }).then(function(user){
    req.app.current_user = user;
    res.send(user.name);
  });
});

router.delete('/logout/', function(req, res){
  req.app.current_user = null;
  res.end();
});

router.post('/links/', function(req, res) {
  if(req.app.current_user != undefined){
  Link.create({ 
          url: req.body.linkUrl,
          title: req.body.linkName,
          UserId: req.app.current_user.id
        })
        .then(function(link){
          Link.find(link.id).then(function(link) {
            if(link != null){
              link.User = req.app.current_user
              res.render('linkitem', { link: link });
            }
          })
        });
  }
});
module.exports = router;
