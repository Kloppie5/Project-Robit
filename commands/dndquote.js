var fs = require('fs');

module.exports = {
	version: '1.0.0',
	permission_level: "@DnD",
	args: "(index)",
	help: "Returns random quotes from our D&D campaign",
	run: function(_, message, args) {
		fs.readFile("./collections/dndquotes", {encoding: "utf8"}, function(err, data) {
			if(err) throw err;
			var lines = data.split('\n');

			var index = Math.floor(Math.random()*lines.length)
			if (args.length == 1)
				index = args[0];

			if (isNaN(index))
				message.channel.send("Expected number");
			else if (index >= lines.length)
				message.channel.send("Index too high");
			else if (index < 0)
				message.channel.send("Index too low");
			else
				message.channel.send(lines[index]);
	  });
	}
};
