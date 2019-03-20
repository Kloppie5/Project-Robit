var cm = require('../cm.js');

module.exports = {
	version: '1.0.0',
	permission_level: "@botowner",
	args: "<name>",
	help: "Loads an existing module.",
	run: function(_, message, args) {
		if ( args.length != 1 ) {
			message.channel.send("Invalid arguments.");
			return;
		}
    var name = args[0];
		if ( cm.load(name, `./commands/${name}.js`) )
			message.channel.send(`Loaded \`${name}.js\``);
		else
			message.channel.send(`Unable to load \`${name}.js\``);
  }
};
