var logger = require('./logger.js');

var commands = {};

function load (name, path) {
	try {
		commands[name] = require(path);
		logger.log(logger.Severity.Debug, `Loaded module '${name}' from '${path}'`);
	} catch (e) {
		logger.log(logger.Severity.Notice, `Could not load module '${name}' at '${path}'`);
	}
}
function unload (name) {
	if (commands[name] == null) return;
	commands[name] = null;
	var mod = require.resolve(name);
	if (mod && ((mod = require.cache[mod]) !== undefined)) {
		delete require.cache[mod.id];
		Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
			if (cacheKey.indexOf(name)>0) {
				delete module.constructor._pathCache[cacheKey];
			}
		});
	}
}

function run (command, bot, message, args) {
	if (!commands[command]) {
		// Silently ignore unknown commands
		return;
	}
	
	var permission_level = commands[command].permission_level;
	
	if (permission_level == "@everyone"
	//||  permission_level == "@<role>"      && message.member.roles.has(<role id>))
		commands[command].run(bot, message, args);
	else
		message.channel.send("You do not have the proper permissions to run this command.");
}

module.exports.load = load;
module.exports.unload = unload;
module.exports.run = run;
module.exports.commands = commands;
