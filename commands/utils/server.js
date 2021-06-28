const Discord = require('discord.js');
const dateformat = require('dateformat');
module.exports = {
	name: 'server',
	description: 'Affiche les informations du serveur.',
    args: false,
    usage: "",
    cooldown: 0,
    guildOnly: true,
    aliases: ['info', 'guild'],
	execute(message, args, client) {
        if(!message.guild.available) return;
        // Renvoie les informations du serveur.
        if (!args.length) {
            this.server(message, args, client);
        } else {
            if(args[0] != "roles") {
                this.server(message, args, client);
            } else {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Roles [${message.guild.roles.cache.map(role => role.name).length}]`)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true, size: 256 }))
                .setDescription(`${message.guild.roles.cache.map(role => "<@&" + role.id + ">").join(', ')}`)
                .setTimestamp()
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }));
                message.channel.send(exampleEmbed);
            }
            
        };
        //console.log(message.guild.emojis.cache.map( emoji => ( { name: emoji.name, id: emoji.id } )));
	},
    server(message, args, client) {
        let owner = message.guild.members.fetch(message.guild.ownerID);
        const creation = new Date(message.guild.createdTimestamp);
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
        owner.then(function(result) {
            //console.log(Object.keys(arrayEmojis).map(function (n) { return arrayEmojis[n].animated == false ? "<:" + arrayEmojis[n].name + ":" + arrayEmojis[n].id + ">" : "<a:" + arrayEmojis[n].name + ":" + arrayEmojis[n].id + ">";}).length);
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`ID: ${message.guild.id}`)
            //.setURL('https://discord.js.org/')
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true, size: 256}))
            //.setDescription(`Affiche l'aide de la commande ${command.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 256 }))
            //.setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }));
            exampleEmbed.addFields(
                { name: "Niveau de verification", value: message.guild.verificationLevel.toLowerCase()},
                { name: "Proprietaire du serveur", value: "<@" + result.user.id + ">" + ` [${result.user.id}]`},
                { name: "Membres", value: message.guild.memberCount, inline: true},
                { name: "Region", value: `${message.guild.region}`, inline: true},
                { name: `Channels [${message.guild.channels.cache.map(channel => channel.type).length}]`, value: `\nCategories: ${message.guild.channels.cache.map(channel => channel.type).filter(type => type == "category").length}\nText: ${message.guild.channels.cache.map(channel => channel.type).filter(type => type == "text").length}\nVocaux: ${message.guild.channels.cache.map(channel => channel.type).filter(type => type == "voice").length}`},
                { name: `Rôles [${message.guild.roles.cache.map(role => role.name).length}]`, value: "Pour voir la liste des rôles utilisez `!server roles`"},
                { name: "Date de création du serveur", value: dateformat(creation, "ddd. dd mmmm yyyy à HH:MM:ss")}
            );
            message.channel.send(exampleEmbed);
        });
    }
    
};