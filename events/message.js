const { prefix } = require('../config.json');

module.exports = {
	name: 'message',
	execute(message, client) {
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
		const user = message.mentions.users.first();
		if (user) {
			if(user.id === "842402300206907393" && !message.content.startsWith(prefix)) 
			{
				return message.channel.send(`Mon prefix est \`${prefix}\``);
			}
		}
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply("Vous ne pouvez pas éxecutez cette commande dans les DM !");
		}

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply("Vous n'avez pas la permission d'utilisez cette commandes !");
			}
		}

		if (command.args === true && !args.length) {
			return message.channel.send(`Vous n'avez pas mis d'arguments, ${message.author}!`);
		}

		if(command.cooldown || command.cooldown > 0) {
			const { cooldowns } = client;

			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`Attendez ${timeLeft.toFixed(1)} secondes avant de réutiliser la commandes \`${command.name}\`.`);
				}
			}
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}

		try {
			command.execute(message, args, client);
		} catch (error) {
			if (command.args == true) message.reply(`\nVeuillez utiliser la commande comme ceci: \`${prefix}${command.name} ${command.usage}\``);
			else if (command.args == false) message.reply(`\nVeuillez utiliser la commande comme ceci: \`${prefix}${command.name} ${command.usage}\``);
		}
	},
};