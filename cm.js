var config = require('./config.json');
var logger = require('./logger.js');

var commands = {};

var reserved_commands = [
	"load",
	"unload",
	"reload",
	"exit"
];

commands["load"] = require('./commands/load.js');
commands["unload"] = require('./commands/unload.js');
commands["reload"] = require('./commands/reload.js');

// public bool load ( string name, string path )
function load (name, path) {
	if (name in reserved_commands) {
		logger.log(logger.Severity.Debug, `Could not load module with reserved name '${name}'`);
		return false;
	}
	try {
		commands[name] = require(path);
		logger.log(logger.Severity.Debug, `Loaded module '${name}' from '${path}'`);
		return true;
	} catch (e) {
		logger.log(logger.Severity.Notice, `Could not load module '${name}' at '${path}'`);
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
	return true;
}

function run (command, bot, message, args) {
	if (!commands[command]) {
		// Silently ignore unknown commands
		return;
	}

	var permission_level = commands[command].permission_level;

	if (permission_level == "@everyone"
	|| (permission_level == "@botowner"      && message.author.id == config.botownerid)
	//|| (permission_level == "@<role>"      && message.member.roles.has(<role id>))
	)
		commands[command].run(bot, message, args);
	else
		message.channel.send("You do not have the proper permissions to run this command.");
}

module.exports.load = load;
module.exports.unload = unload;
module.exports.run = run;
module.exports.commands = commands;
