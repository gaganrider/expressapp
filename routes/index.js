var express = require('express');
var router = express.Router();
const passport = require("passport")
const LocalStrategy = require('passport-local');
const mongoose = require("mongoose")


mongoose.connect("mongodb:localhost:27017/NewDb",()=>{
  console.log("mongoooo")
})

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true
  },
  password:Number,
  name:String
})

const User= mongoose.model("User",userSchema)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






  passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username,password)
    User.findOne({ username: username }, function (err, user) {
    try { if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.password==password) { return done(null, false); }
      console.log(user)
      return done(null, user);
      }catch(err){
        console.log(err)
      }
    });
  }
));

router.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;
