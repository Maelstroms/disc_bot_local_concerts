/*
Older version of the server. Kept web functionality around for comfort.
Not really necessary, so keeping it around while we're still in dev, but will probably get axe.
Need to remember to keep this somewhere safe, maybe a project that actually needs a web interface.
Probably thunderdome since that isn't just through discord.

*/ 

//const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const fs = require('fs');

// const bodyParser = require('body-parser');
// const ip = require('ip');
// const cors = require('cors');
// const helmet = require('helmet');
// const PORT = 3000;

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new discord client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// import modules in module folder
//var helperMethods = require('./modules/helperMethods.js')

//HTML helper packages
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


//CORS
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });
// app.use(helmet());


//catch program closure
//handy to make sure any background processes don't run indefinitely
process.on('SIGINT', function(){

  process.exit();
});



// Listen for Discord slash commands
client.once('ready', () => {
  console.log('Ready!');

});

client.on('messageCreate', (message) => {
  if (message.content === 'hello') {
    message.reply({
      content: "I'm alive",
    })
  }
})

client.on('interactionCreate', async interaction => {
  console.log('command received');
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

//discord intialization
client.login(token);
//end listen for commands


// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


//Start Server
// http.listen(PORT, '0.0.0.0', function(){
//   console.log('Server at : ' + ip.address());
//   console.log('listening on ' + PORT);
  
  
//});