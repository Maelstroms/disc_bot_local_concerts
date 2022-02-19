const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

const bodyParser = require('body-parser');
const ip = require('ip');
const cors = require('cors');
const helmet = require('helmet');
const PORT = 3000;

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// import modules in module folder
//var helperMethods = require('./modules/helperMethods.js')

//HTML helper packages
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

// Create a new discord client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

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