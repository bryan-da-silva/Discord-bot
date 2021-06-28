const Discord = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'ban un membre du serveur',
    args: true,
    usage: '<user> [Duree] [raison]',
    cooldown: 0,
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
	execute(message, args, client) {
        if(!message.guild.available) return;

        const User = message.mentions.users.first();

        if (!User) return message.channel.send("Veuillez mentionnez une personne à ban !");

        let duree = Number.isInteger(parseInt(args[1])) === true ? parseInt(args[1]) : 0 || 0;
        //let msgSendDuree = duree === 0 ? ' ' : `pendant **${duree} jours**`;
        let raison = !Number.isInteger(parseInt(args[1])) === true ? args.slice(1).join(' ') : args.slice(2).join(' ') || "Ban par " + message.author.tag;
        const BanUser = message.guild.member(User);

        // ban la personne mentionner du serveur.
        if (message.guild.member(message.author).roles.highest.position > BanUser.roles.highest.position) {
            BanUser.ban({ days: duree, reason: raison })
            .then(() => { 
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(`${User.tag} à été banni !`, User.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Raison:", value: `${raison}`}
                )
                .setTimestamp()
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }));
                if (duree != 0) exampleEmbed.addFields({ name: "Duree du bannissement:", value: `${duree} jours`});
                message.channel.send(exampleEmbed);
            })
            .catch(error => {
                if (error.code === 50013) return message.channel.send("Vérifiez que le bot possède les droits de bannir les membres et que son rôle soit au dessus de celui que vous bannez !");
            });
        } else return message.channel.send("Vous ne pouvez pas bannir un membre qui possède un rôle supérieur ou égal au vôtre !");
	}
};