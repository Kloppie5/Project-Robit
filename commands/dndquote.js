var quotes = [
	"DM: Here we discuss relevant things, like child murder, different types of cheese and how complicated people are.\nPlayer: I'd counter that... but it's completely true.",
	"Player: I start a drinking competition with the cat.",
	"DM: You find a blue, perfectly spherical stone with a piece of rope attached to it.",
	"Player: I dump the entire crate of colorful stones into the bag of holding.",
	"Player: I guess it is now canon that Norbert is uncomfortable around ducks.",
	"Player: I throw out the goblin kamasutra book.",
	"DM: It's a tree in paladin armor hitting a statue, do you want to help the tree or the statue?",
	"Player: Can I use the naked goblin as an improvised weapon?",
	"DM: You throw the burning sock into the sewer. A wave of heat hits you as the entire sewer is now on fire.",
	"Player: I steal his jacket. DM: Ok, you get Jack Lumber's lumberjack jacket.",
	"Player 1: I climb into the tree next to the owl and try to befriend him.\nDM: Roll for Handle Animal.\nPlayer 1: 3\nPlayer 2: The owl turns its back to you and takes a shit.",
	"Player: I cast Light on the cat to make him shine pink, so I can use him to distract the group.",
	"Player: I vomit on the stairs.\n[...]\nDM: As you discuss the plan with the hunting party, you hear someone fall down the stairs.\nPlayer: I use Vicious Mockery on him!",
	"Player: I want to say \"what doesn't kill you makes you stronger\", but I guess it technically killed me.",
	"Player: Desire is a tricky thing to ignore.\nDM: That sentence can be horribly misconstrued.\nPlayer: I don't mind that happening.",
	"To a player that looks like a tree: You are not big, you just have big foliage.",
	"Keep doing what you're doing, I'm going to smell the chef."
];

module.exports = {
	version: '1.0.0',
	permission_level: "@DnD",
	args: "(index)",
	help: "Returns random quotes from our D&D campaign",
	run: function(_, message, args) {
		var index = Math.floor(Math.random()*quotes.length);
		if (args.length == 1)
			index = args[0];
		message.channel.send(quotes[index]);
	}
};
