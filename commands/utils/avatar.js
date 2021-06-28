const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	description: "Affiche et récupere l'avatar d'un utilisateur ou son propre avatar.",
    args: false,
    usage: "[user]",
    cooldown: 0,
    aliases: ['icon', 'pp'],
	execute(message) {
        const user = message.mentions.users.first() || message.author;
        
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(`Avatar de ${user.username}`, user.displayAvatarURL({ dynamic: true }))
        .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter(`${message.client.user.username}`, message.client.user.displayAvatarURL({ dynamic: true }));

        message.channel.send(exampleEmbed);
	},
};