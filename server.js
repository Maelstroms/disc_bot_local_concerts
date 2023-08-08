const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { disctoken } = require('./config.json');


//catch program closure
//handy to make sure any background processes don't run indefinitely
process.on('SIGINT', function(){

  process.exit();
});

/*
API testing, comment out the direct connection to the Ticketmaster API once configuration is determined
*/
const tmsearch = require('./modules/ticketmaster_api/event_search.js');



process.stdin.on('data', (data) => {
  const input = data.toString().trim(); // Convert the raw data to a string and remove any leading/trailing spaces
  const terms = input.split(" ");

  // Echo the input to the console
  console.log('You entered:', input);
  console.log(terms);

tmsearch.search_events(input);

});

//Discord set up
// Create a new discord client instance
const client = new Client({ 
  intents: [
  GatewayIntentBits.Guilds
  ] }); 

/*
Remember when creating new slash commands that rerunning deploy-commands.js is necessary.
Any commands that aren't registered via rest call will be ignored.
*/

//adding slash commands to server for use.
/*note require command
  files included:
  ping.js
  echo.js

*/
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'modules/slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});
//End Discord configuration

client.login(disctoken);