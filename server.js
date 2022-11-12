const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { disctoken } = require('./config.json');




// Create a new discord client instance
const client = new Client({ 
  intents: [
  GatewayIntentBits.Guilds
  ] }); 

/*
Remember when creating new slash commands that rerunning deploy-commands.js is necessary.
Any commands that aren't registered via rest call will be ignored.
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

client.login(disctoken);