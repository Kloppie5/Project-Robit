module.exports = {
	permission_level: "@everyone",
	args: "mention",
	help: "Blame people for your mistakes.",
	run: function(_, message, args) {
		if (args.length != 1) {
			message.channel.send("Invalid arguments.");
			return;
		}
		switch(Math.floor(Math.random()*15)) {
			case 1:
				message.channel.send("A man can fail many times, but he isn't a failure until he begins to blame somebody else.");
			break;
			case 2:
				message.channel.send("To err is human. To blame someone else is politics.");
			break;
			case 3:
				message.channel.send("In praise there is more obtrusiveness than in blame.");
			break;
			case 4:
				message.channel.send("Some people have a mistaken idea that all thoughts disappear through meditation and we enter a state of blankness. There certainly are times of great tranquility when concentration is strong and we have few, if any, thoughts. But other times, we can be flooded with memories, plans or random thinking. It's important not to blame yourself.");
			break;
			case 5:
				message.channel.send(`${message.author}; don't blame others for your own failures.`);
			break;
			case 6:
				message.channel.send(`${args[0]}, what are you doing?`);
			break;
			case 7:
				message.channel.send(`${args[0]}, GUILTY AS CHARGED`);
			break;
			case 8:
				message.channel.send(`${args[0]}; MYEEEEEEEEH`);
			break;
			case 9:
				message.channel.send(`Well, well, well, what have we here?`);
			break;
			case 10:
				message.channel.send(`Maybe you've heared of a mythical place called the court of miracles, hello you're there.`);
			break;
			case 11:
				message.channel.send(`${args[0]}, any last words?`);
			break;
			case 12:
				message.channel.send(`We found you totally innocent, which is the worst crime of all.`);
			break;
			case 13:
				message.channel.send(`${args[0]}, you have committed crimes against Discord and her people.`);
			break;
			default:
				message.channel.send(`${args[0]}, you have been found guilty. How do you plead?`);
			break;
		}
	}
};
