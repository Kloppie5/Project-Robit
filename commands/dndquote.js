module.exports = {
	name: 'dndquote',
	description: 'Shows out of context quotes from our DnD campaigns.',
	quotes: [],
	init ( ) {
		quotes = [    
		  "DM: Here we discuss relevant things, like child murder, different types of cheese and how complicated people are.\n"
		+ "Player: I'd counter that... but it's completely true.",
		  "I start a drinking competition with the cat.",
		  "DM: You find a blue, perfectly spherical stone with a piece of rope attached to it.",
		  "I dump the entire crate of colorful stones into the bag of holding.",
		  "I guess it is now canon that Norbert is uncomfortable around ducks.",
		  "I throw out the goblin kamasutra book.",
		  "DM: It's a tree in paladin armor hitting a statue, do you want to help the tree or the statue?",
		  "Can I use the naked goblin as an improvised weapon?",
		  "DM: You throw the burning sock into the sewer. A wave of heat hits you as the entire sewer is now on fire.",
		  "Player: I steal his jacket.\n"
		+ "DM: Ok, you get Jack Lumber's lumberjack jacket.",
		  "Player: I climb into the tree next to the owl and try to befriend him.\n"
		+ "DM: Roll for Handle Animal.\n"
		+ "[3]\n"
		+ "DM: The owl turns its back to you and takes a shit.",
		  "I cast Light on the cat to make him shine pink, so I can use him to distract the group.",
		  "Player: I vomit on the stairs.\n"
		+ "[several minutes later]\n"
		+ "DM: As you discuss the plan with the hunting party, you hear someone fall down the stairs.\n"
		+ "Player: I use Vicious Mockery on him!",
		  "I want to say \"what doesn't kill you makes you stronger\", but I guess it technically killed me.",
		  "1: Desire is a tricky thing to ignore.\n"
		+ "2: That sentence can be horribly misconstrued.\n"
		+ "1: I don't mind that happening.",
		  "You are not big, you just have big foliage.",
		  "Keep doing what you're doing, I'm going to smell the chef.",
		  "You are wonderful company, but I don't mix well with stress and explosives.",
		  "You like donkeys, don't you?",
		  "I'm sure we can earn a rupee if we save a cat out of a tree.",
		  "Your inadequacy is your cross to bear!",
		  "1: Can we drink with the door until it passes out and opens up?\n"
		+ "2: Please stop making The Adventure Zone references.",
		  "1: DON'T KILL THE DOG!\n"
		+ "2: It's a gelatinous cube.\n"
		+ "1: DO KILL THE DOG!"
		];
		console.log(`Initialized 'dndquote' command.`);
	},
	execute ( message, args ) {
		var index = Math.floor(Math.random()*quotes.length)
		if (args.length == 1)
			index = args[0];
		if (isNaN(index))
			message.channel.send("Expected number");
		else if (index >= quotes.length)
			message.channel.send("Index too high");
		else if (index < 0)
			message.channel.send("Index too low");
		else
			message.channel.send(quotes[index]);
	},
};
