const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  // remember email can change over time
  // sub = subject, who is this token about
  // iat = issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res,next){
  // user has already had their email password auth'd
  // just need to give them a token
  res.send({ token: tokenForUser(req.user)});
}
exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(411).send({ error: "you must provide email and password"});
  }

  // see if user with given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if(err) { return next(err); }

    // if user w/ email exists, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if user with email does not exist, create user and save record
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err){
      if (err) {return next(err); }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });


  })
}
