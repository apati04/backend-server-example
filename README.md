# Dependencies used
bcyrpt-nodejs
body-parser
cors
express
jwt-simple
mongoose
morgan
passport
nodemon

# Passport Strategies
passport-jwt
passport-local

# Use
create a config.js file in the root folder, secret can be any string of your choosing.
```javascript
// config.js
module.exports ={
  secret= { 'awefsadfasdf' }
}
```
npm install
nodemon index.js

# Database
MongoDB
Start mongo server by using mongod command
