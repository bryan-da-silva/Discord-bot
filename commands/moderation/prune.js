module.exports = {
	name: 'prune',
	description: "Efface un certains nombre de message",
    args: true,
    usage: '<number>',
    cooldown: 0,
    guildOnly: true,
    permissions: 'MANAGE_MESSAGES',
    aliases: ['purge', 'clear'],
	execute(message, args) {
        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) return message.reply("Vous n'avez pas choisi un nombre valide.");

        else if (amount < 2 || amount > 100) return message.reply("veuillez choisir un nombre entre 2 et 100.");
        
        else {
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send("Impossible de supprimer les messages dans ce channel !");
            });
        }
	},
};