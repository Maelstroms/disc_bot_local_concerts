const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new discord client instance
const client = new Client({ 
  intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES
  ] }); 

client.on('ready', () => {
  console.log('bot has started');
})

client.on('messageCreate', (message) => {
  console.log(message.content);
  if (message.content === 'ping'){
    console.log('correct message');
    message.reply({
      content: 'pong'
    })
  }
})

/*Serious version issues, This command is highly dependent on permissions and discord.js version
Make sure discord.js v13.6 or more is running
Bot and applications.commands scopes in the bot
check the flags. v13 does the Intents.Flags.thing pattern, will just fail silently if on a different version
*/
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

client.login(token);