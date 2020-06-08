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
 
bot.on("ready", () => {
	bot.user.setPresence({ status: 'online', game: { name: 'with discord.js'} });
	console.log("Hello again~");
});

bot.login(config.token);