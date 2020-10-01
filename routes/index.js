var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get hello world page */
/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

router.get('/newuser', function(req, res){
  res.render('newuser', {title: 'Add New User'});
});
/* Post to add user service */
router.post('/adduser', function(req, res){
  //set our internal variable
  var db = req.db;
  var name = req.body.username;
  var userEmail = req.body.useremail;
  var collection = db.get("usercollection");
  //submit to db
  collection.insert({
    "username" : name,
    "email" : userEmail
  }, function(err, doc){
    if(err){
      res.send("There was a problem adding the information to the database.");
    } else{
      res.redirect("userlist");
    }
  });
});

module.exports = router;
