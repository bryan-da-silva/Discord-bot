const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Recharge une commande.',
	args: true,
    usage: '<commandes>',
    cooldown: 0,
	execute(message, args) {
        if(message.author.id === "841681801680125972") {
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                return message.channel.send(`La commande que vous avez essayer de recharger n'existe pas \`${commandName}\`, ${message.author}!`);
            }

            const commandFolders = fs.readdirSync('./commands');
            const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
        
            delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

            try {
                const newCommand = require(`../${folderName}/${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);
                message.channel.send(`Commande \`${newCommand.name}\` recharger !`);
            } catch (error) {
                console.error(error);
                message.channel.send(`Une erreur s'est produite dans le rechargement de la commande \`${command.name}\`:\n\`${error.message}\``);
            }
        } else message.channel.send("Seul le créateur du bot peut utiliser cette commande !");
    },
};