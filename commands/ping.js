module.exports = {
	name: 'ping',
	description: 'Ping!',
	init ( ) {
		console.log(`Initialized 'ping' command.`);
	},
	execute ( message, args ) {
		message.channel.send('pong');
	},
};