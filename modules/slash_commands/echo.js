		const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data : new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')),
	async execute(interaction) {
		console.log(interaction.options.getString('input'));
		const input = interaction.options.getString('input')
		//interaction.options.getString('reason')
		await interaction.reply(`I got ${input} as a command.`);
	},
};