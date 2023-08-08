const { SlashCommandBuilder } = require('discord.js');
const tmsearch = require('../ticketmaster_api/event_search.js');

//need to provide addStringOption for each value you want to pass through
module.exports = {
	data : new SlashCommandBuilder()
	.setName('event_search')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('city')
			.setDescription('The input to echo back'))
	.addStringOption(option =>
		option.setName('start_date')
			.setDescription('Earliest considered date, ISO datetime format like 2023-08-25T23:10:00Z'))
	.addStringOption(option =>
		option.setName('result_number')
			.setDescription('How many results come back, limit 10')),
	async execute(interaction) {
		console.log("incoming event_search from discord");
		//console.log(interaction.options.getString('city'));
		//need to parser each string option, be prepared to copy paste when adding.
		const city = interaction.options.getString('city');
		const start_date = interaction.options.getString('start_date');
		const result_number = interaction.options.getString('result_number');

		console.log("formatted event data");
		// var event_data = tmsearch.search_events(city);

		// console.log("tm response promise");
		// console.log(event_data);

		// await event_data

		// console.log(event_data.);

		//console.log(event_data);


		var event_details = await tmsearch.search_events(city);
		console.log(event_details);

		//interaction.options.getString('reason')
		// await interaction.reply(`I got ${city} as a command.`);
		await interaction.reply(`I got ${event_details[0].name} as a result.`);
	},
};