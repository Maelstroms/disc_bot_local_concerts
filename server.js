//ODcxNTUyOTEyOTk0NzQyMzYz.YQc-5w.oRlwp2x6KWkQhZ_5NRvnEK4lu3Y

const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

const bodyParser = require('body-parser');
const ip = require('ip');
const cors = require('cors');
const helmet = require('helmet');
const PORT = 3000;


// import modules in module folder
//var helperMethods = require('./modules/helperMethods.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(helmet());


//catch program closure
//handy to make sure any background processes don't run indefinitely
process.on('SIGINT', function(){

  process.exit();
});



// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


//Start Server
http.listen(PORT, '0.0.0.0', function(){
  console.log('Server at : ' + ip.address());
  console.log('listening on ' + PORT);
});