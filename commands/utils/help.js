const { prefix } = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Liste toutes mes commandes ou des informations sur une commande spécifique.',
    usage: '[commands name]',
    cooldown: 0,
	aliases: ['h'],
	async execute(message, args, client) {
		const data = [];
		const { commands } = message.client;
        const users = message.author;

		if (!args.length) {
			data.push('Voici une liste de toutes mes commandes:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nVous pouvez utilisez la syntaxe \`${prefix}help [command name]\` pour obtenir des informations sur une commande spécifique !`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Je vous ai envoyé un DM avec toutes mes commandes !');
                })
                .catch(error => {
                    console.error(`Impossible d'envoyer le DM à ${message.author.tag}.\n`, error);
                    message.reply('Il semble que je ne peux pas vous DM ! Avez-vous les DM désactivés ?');
                });
		}
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) return message.reply("Ceci n'est pas une commande valide");

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Help ${command.name}`)
        //.setURL('https://discord.js.org/')
        .setAuthor(`${users.tag}`, users.displayAvatarURL({ dynamic: true }))
        //.setDescription(`Affiche l'aide de la commande ${command.name}`)
        //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
        /* .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        ) */
        //.addField('Inline field title', 'Some value here', true) */
        //.setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }));

        if (command.description) exampleEmbed.addFields({ name: `Description`, value: command.description + "\n"},);

        exampleEmbed.addFields({ name: `Info`, value: "[] optionnel, <> obligatoire" + "\n"},);

        if (command.usage) exampleEmbed.addFields({ name: "Utilisation", value: prefix + command.name + " " + command.usage + "\n"});

        if (command.aliases) exampleEmbed.addFields({ name: "Aliases", value: prefix + command.aliases.join('\n' + prefix) + "\n"});

        if (command.cooldown || command.cooldown === 0) exampleEmbed.addFields({ name: "Cooldown", value: command.cooldown + " seconds"});

        message.channel.send(exampleEmbed);
    },
};