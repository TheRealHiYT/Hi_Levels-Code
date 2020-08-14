const Discord = require('discord.js')

const random = require('random-js')

const config = require('./config.json')

var stats = {};



const bot = new Discord.Client();

console.log('Bot is up and running');

bot.on('message', (message) => {

	if(message.guild.id in stats === false){
		stats[message.guild.id] = {};
	}

	const guildStats = stats[message.guild.id];
	if (message.author.id in guildStats === false){
		stats[message.author.id] = {
			xp: 0,
			level: 0,
			last_message: 0,

		};
	}
	const userStats = stats[message.author.id];
	userStats.xp += random.integer(15, 25);

	console.log(message.author.username + ' now has ' + userStats.xp);



	const parts = message.content.split(' ');


});

bot.login(config.token)