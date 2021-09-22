const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);

      else if (path.extname(file) == ".js") arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    });
  
    return arrayOfFiles
}

getAllFiles("./commands").forEach(file => {
    const command = require(file);
    client.commands.set(command.name, command);
});

client.login(token);