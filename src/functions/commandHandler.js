const fs = require('node:fs');
const path = require('node:path')
const { REST, Routes } = require('discord.js');
const { token, guildId, clientId } = require('../../config.json')



const commands = []
const commandsPath = path.join(__dirname, '../commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
    

module.exports = commands;