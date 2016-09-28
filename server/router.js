const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});

// export func, import into index, use it in app
module.exports = function(app) {
  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'Secret Code 123' })
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
