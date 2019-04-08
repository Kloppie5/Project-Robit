try { var config = require('./config.json');
	console.log('Loaded config.json');
} catch (e) {
	console.log('Critical failure while loading config.json');
	console.log((e == null ? "-" : e.stack));
	process.exit(1);
}
try { var logger = require('./logger.js');
	logger.log(logger.Severity.Info, `Loaded logger.js with uuid4: ${logger.id}`);
} catch (e) {
	console.log('Critical failure while loading logger.js');
	console.log((e == null ? "-" : e.stack));
	process.exit(1);
}
try { var Discord = require('discord.js');
	logger.log(logger.Severity.Info, `Loaded discord.js version ${Discord.version}`);
} catch (e) {
	logger.log(logger.Severity.Critical, 'Critical failure while loading discord.js');
	logger.log(logger.Severity.Critical, (e == null ? "-" : e.stack));
	process.exit(1);
}

var bot = new Discord.Client();

try { var cm = require('./cm.js');
	logger.log(logger.Severity.Info, `Loaded command manager`);
} catch (e) {
	logger.log(logger.Severity.Critical, 'Critical failure starting command manager');
	logger.log(logger.Severity.Critical, (e == null ? "-" : e.stack));
	process.exit(1);
}

bot.on("ready", () => {
	bot.user.setPresence({ status: 'online', game: { name: 'with discord.js'} });

	cm.load('funny', './commands/funny.js');

	logger.log(logger.Severity.Info, "Bot is ready");
});

bot.on("message", (message) => {
	logger.log(logger.Severity.Debug, `User <${message.author.username}|${message.author.id}> in <${message.channel}> said <${message.content}>`);

	if (message.author.bot || !message.content.startsWith(config.prefix)) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	logger.log(logger.Severity.Info, `Command '${command}' called with args[${args}]`);

	cm.run(command, bot, message, args);
});

bot.on("presence", (user, status, _) => {
	logger.log(logger.Severity.Debug, `${user} went ${status}`);
});

process.on('uncaughtException', (e) => {
	logger.log(logger.Severity.Critical, "Uncaught exception caused unexpected termination");
	logger.log(logger.Severity.Critical, (e == null ? "-" : e.stack));

	process.exit(2);
});

bot.login(config.token);
