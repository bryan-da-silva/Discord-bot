const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'kick un membre du serveur',
    args: true,
    usage: '<user>',
    cooldown: 0,
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
	execute(message, args, client) {
        /* 
            Récupère le "premier" utilisateur mentionné dans le message
            Cela renverra un objet `User`, tout comme` message.author`
        */
        if(!message.guild.available) return;

        const User = message.mentions.users.first();

        if (!User) return message.channel.send("Veuillez mentionnez une personne à ban !");

        const KickUser = message.guild.member(User);
        let permKick = message.channel.permissionsFor(message.author);
        if (message.guild.member(message.author).roles.highest.position > KickUser.roles.highest.position && permKick.has(this.permissions)) {
            let raison = args.slice(1).join(' ') || ` Kick par ${message.author.tag}`;
            KickUser.kick(raison).then(() => {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(`${User.tag} à été kick !`, User.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Raison:", value: `${raison}`}
                )
                .setTimestamp()
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }));
                message.channel.send(exampleEmbed);
            }).catch(error => {
                if (error.code === 50013) return message.channel.send("Vérifiez que le bot possède les droits de bannir les membres et que son rôle soit au dessus de celui que vous bannez !");
            });
        } else return message.channel.send("Vous ne pouvez pas bannir un membre qui possède un rôle supérieur ou égal au vôtre !");
	},
};