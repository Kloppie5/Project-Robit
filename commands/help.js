var config = require('../config.json');
var cm = require('../cm.js');

module.exports = {
	version: '1.0.0',
	permission_level: "@everyone",
	args: "(<name>)",
	help: "Shows you all the commands you can use and their explanation.",
	run: function(bot, message, args) {
		if ( args.length > 1 ) {
			message.channel.send("Invalid arguments.");
      return
		}
    var fields = [];
    if ( args.length == 1 ) {
      if (!commands[args[0]]) {
        message.channel.send("Unable to help with this unknown command.");
        return;
      }
      var command = args[0];
      if (cm.commands[command].permission_level == "@everyone"
    	|| (cm.commands[command].permission_level == "@botowner"      && message.author.id == config.botownerid)
    	//|| (permission_level == "@<role>"      && message.member.roles.has(<role id>))
    	)
      fields.push({
            name: `!${command} ${cm.commands[command].args}`,
            value: cm.commands[command].help
      });
    }

    for ( var command in cm.commands ) {
      if (cm.commands[command].permission_level == "@everyone"
    	|| (cm.commands[command].permission_level == "@botowner"      && message.author.id == config.botownerid)
    	//|| (permission_level == "@<role>"      && message.member.roles.has(<role id>))
    	)
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
    }
  });

  }
};
