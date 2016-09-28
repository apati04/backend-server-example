// main starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// app setup express middleware
  //login framework
app.use(morgan('combined'));
app.use(cors());
  //parses incoming requests to json
app.use(bodyParser.json({ type: '*/*'} ));
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening  on port: ", port);
