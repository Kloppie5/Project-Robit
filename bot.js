try { var config = require('./config.json');
	console.log('Loaded config.json');
} catch (e) {
	console.log('Critical failure while loading config.json');
	console.log((e == null ? "-" : e.stack));
	process.exit(1);
}
try { var Discord = require('discord.js');
	console.log(`Loaded discord.js version ${Discord.version}`);
} catch (e) {
	console.log('Critical failure while loading discord.js');
	console.log(e == null ? "-" : e.stack);
	process.exit(1);
}
 
var bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commands = require('./commands');

Object.keys(commands).map(k => {
	commands[k].init();
	bot.commands.set(commands[k].name, commands[k]);
});

bot.on("ready", () => {
	bot.user.setPresence({ status: 'online', game: { name: 'with discord.js'} });
	console.log("Hello again~");
});

bot.on('message', message => {
	if ( message.author.bot )
		return;
	if ( !message.content.startsWith(config.prefix) )
		return;
	
	const args = message.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	console.info(`Called command: ${command}`);

	if ( !bot.commands.has(command) ) {
		message.reply(bot.commands);
		return;
	}

	try {
		bot.commands.get(command).execute(message, args);
	} catch ( error ) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

bot.login(config.token);