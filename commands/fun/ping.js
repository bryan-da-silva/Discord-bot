module.exports = {
	name: 'ping',
	description: 'Reponds Pong !',
    args: false,
    usage: null,
    cooldown: 0,
	execute(message) {
        // renvoie "Pong". au canal dans lequel le message a été envoyé
		message.channel.send('Pong !');
	},
};