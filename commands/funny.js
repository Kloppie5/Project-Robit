var fs = require('fs');

module.exports = {
	version: '1.0.0',
	permission_level: "@everyone",
	args: "",
	help: "Returns a random funny video.",
	run: function(_, message, args) {
		fs.readFile("./collections/funny_links", {encoding: "utf8"}, function(err, data) {
			if(err) throw err;
			var lines = data.split('\n');
			message.channel.send(lines[Math.floor(Math.random()*lines.length)]);
	  	});
   	}
};
