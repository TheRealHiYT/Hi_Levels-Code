const Discord = require('discord.js');

const random = require('random-js');

const jsonfile = require('jsonfile');

const fs = require('fs')

const config = require('./config.json');

var stats = {};
if (fs.existsSync('stats.json')) {
	stats = jsonfile.readFileSync('stats.json');
}



const bot = new Discord.Client();

console.log('Bot is up and running');

bot.on('message', (message) => {
	if (message.author.id == bot.user.id)
		return;

	if (message.guild.id in stats === false) {
		stats[message.guild.id] = {};
	}
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	const guildStats = stats[message.guild.id];
	if (message.author.id in guildStats === false) {
		guildStats[message.author.id] = {
			xp: 0,
			level: 0,
			last_message: 0,

		};
	}
	const userStats = guildStats[message.author.id];
	userStats.xp += getRandomInt(15, 25);

	const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
	if (userStats.xp >= xpToNextLevel) {
		userStats.level++;
		userStats.xp = userStats.xp - xpToNextLevel;
		message.channel.send(message.author.username + ' Has reached Level ' + userStats.level)
	}

	jsonfile.writeFileSync('stats.json', stats)

	console.log(message.author.username + ' now has ' + userStats.xp);
	console.log(xpToNextLevel + ' XP needed for next Level. ');



	const parts = message.content.split(' ');


});

bot.login(config.token)