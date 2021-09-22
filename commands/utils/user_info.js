const Discord = require('discord.js');
const dateformat = require('dateformat');
module.exports = {
	name: 'user-info',
	description: "Affiche les informations d'un utilisateur ou ses propres informations",
    args: false,
    usage: '<user>',
    cooldown: 0,
    guildOnly: true,
    aliases: ['ui'],
	execute(message, args, client) {
        if(!message.guild.available) return;
        // Renvoie les informations utilisateurs.
        const users = message.mentions.users.first() || message.author;
        const member = message.guild.member(users);
        const creation = new Date(users.createdTimestamp);
        console.log(message.guild.member(users).joinedAt);
        const arrive = new Date(message.guild.member(users).joinedTimestamp);
        dateformat.i18n = {
            dayNames: [
              "Lun",
              "Mar",
              "Mer",
              "Jeu",
              "Ven",
              "Sam",
              "Dim",
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
              "Dimanche"
            ],
            monthNames: [
                "Jan",
                "Fev",
                "Mar",
                "Avr",
                "Mai",
                "Juin",
                "Juil",
                "Août",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                "Janvier",
                "Fevrier",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Decembre",
            ]
        };
		/*message.channel.send(
            `username: ${user.username}\n` +
            `ID: ${user.id}` +
            `Test: ${user.username}`
        );*/
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        //.setTitle(`Info utilisateur`)
        //.setURL('https://discord.js.org/')
        .setAuthor(`${users.tag}`, users.displayAvatarURL({ dynamic: true }))
        //.setDescription(`Affiche l'aide de la commande ${command.name}`)
        .setThumbnail(users.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Identifiant', value: users.id, inline: true },
            { name: 'Username', value: users.username, inline: true},
            { name: "Date de création du compte", value: dateformat(creation, "ddd. dd mmmm yyyy à HH:MM:ss")},
            { name: "Date d'arrivé", value: dateformat(arrive, "ddd. dd mmmm yyyy à HH:MM:ss")},
            { name: "Roles", value: member.roles.cache.map(role => "<@&" + role.id + ">").join(", ")},
            { name: "Bot", value: users.bot}
        )
        //.setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }));
        message.channel.send(exampleEmbed);
	},
};