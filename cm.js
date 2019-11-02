var config = require('./config.json');
var logger = require('./logger.js');
var permissions = require('./permissions.js');

var commands = {};

var reserved_commands = [
	"exit",
	"help",
	"load",
	"reload",
	"unload",
];

commands["help"] = {
	version: '1.0.0',
	permission_level: "@everyone",
	args: "(name)",
	help: "Shows you all the commands you can use and their explanation.",
	run: function(bot, message, args) {
		if ( args.length > 1 ) {
			message.channel.send("Invalid arguments.");
      		return;
		}
  	var fields = [];
  	if ( args.length == 1 ) {
      	if (!commands[args[0]]) {
        	message.channel.send("Unable to help with this unknown command.");
        	return;
      	}
      	var command = args[0];

      	if ( !permissions.validate(cm.commands[command].permission_level, message) ) {
					message.channel.send("You do not have the permissions to use this command.");
        	return;
				}
      	fields.push({
            name: `!${command} ${cm.commands[command].args}`,
            value: cm.commands[command].help
      	});
    }

    for ( var command in cm.commands ) {
      	if ( permissions.validate(cm.commands[command].permission_level, message) )
      	fields.push({
            name: `!${command} ${cm.commands[command].args}`,
            value: cm.commands[command].help
      	});
    }

    message.channel.send({embed: {
			color: 3447003,
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			title: "Help",
			description: "Robit is here to help!",
			fields: fields,
			timestamp: new Date(),
			footer: {
				icon_url: bot.user.avatarURL,
				text: "© Robit"
			}
    }});
	}
};
commands["load"] = {
	version: '1.2.0',
	permission_level: "@botowner",
	args: "<name>",
	help: "Loads an existing module.",
	run: function(_, message, args) {
		if ( args.length != 1 ) {
			message.channel.send("Invalid arguments.");
			return;
		}
    var name = args[0];
		if ( load(name) )
			message.channel.send(`Loaded \`${name}.js\``);
		else
			message.channel.send(`Unable to load \`${name}.js\``);
  }
};
commands["reload"] = {
	version: '1.2.0',
	permission_level: "@botowner",
	args: "<name>",
	help: "Reloads an existing module.",
	run: function(_, message, args) {
		if ( args.length != 1 ) {
			message.channel.send("Invalid arguments.");
			return;
		}
		var name = args[0];
		if ( unload(name) )
			message.channel.send(`Unloaded \`${name}.js\``);
		else
			message.channel.send(`Unable to unload \`${name}.js\``);
		if ( load(name) )
				message.channel.send(`Loaded \`${name}.js\``);
		else
				message.channel.send(`Unable to load \`${name}.js\``);
		}
};
commands["unload"] = {
	version: '1.2.0',
	permission_level: "@botowner",
	args: "<name>",
	help: "Unloads an existing module.",
	run: function(_, message, args) {
		if ( args.length != 1 ) {
			message.channel.send("Invalid arguments.");
			return;
		}
		var name = args[0];
		if ( unload(name) )
			message.channel.send(`Unloaded \`${name}.js\``);
		else
			message.channel.send(`Unable to unload \`${name}.js\``);
	}
};

// public bool load ( string name, string path )
function load (name, path) {
	if (name in reserved_commands) {
		logger.log(logger.Severity.Debug, `Could not load module with reserved name '${name}'`);
		return false;
	}
	try {
		commands[name] = require(`./commands/${name}.js`);
		logger.log(logger.Severity.Debug, `Loaded module '${name}'`);
		return true;
	} catch (e) {
		logger.log(logger.Severity.Notice, `Could not load module '${name}'`);
		return false;
	}
}
// public bool unload ( string name )
function unload (name) {
	if (name in reserved_commands) {
		logger.log(logger.Severity.Debug, `Could not unload module with reserved name '${name}'`);
		return false;
	}
	if (commands[name] == null) {
		logger.log(logger.Severity.Debug, `Could not unload unknown module '${name}'`);
		return false;
	}
	delete commands[name];
	var mod = require.resolve(`./commands/${name}.js`);
	if (mod && ((mod = require.cache[mod]) !== undefined)) {
		delete require.cache[mod.id];
		Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
			if (cacheKey.indexOf(`./commands/${name}.js`)>0) {
				delete module.constructor._pathCache[cacheKey];
			}
		});
	}
	return true;
}

function run (command, bot, message, args) {
	if (!commands[command]) {
		return;
	}
	if ( !permissions.validate(commands[command].permission_level, message) ) {
		message.channel.send("You do not have the permissions to call this command.");
		return;
	}
	commands[command].run(bot, message, args);
}

module.exports.load = load;
module.exports.unload = unload;
module.exports.run = run;
module.exports.commands = commands;
