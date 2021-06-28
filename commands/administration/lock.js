const Discord = require('discord.js');
module.exports = {
	name: 'lock',
	description: 'verrouille un salon',
    usage: 'lock',
    cooldown: 0,
    guildOnly: true,
    permissions: 'MANAGE_CHANNELS',
	execute(message, args, client) {
        if(!message.guild.available) return;

        message.channel.send("hey");
        console.log(message.guild.channels.cache.map(channel => channel.id));
	}
};