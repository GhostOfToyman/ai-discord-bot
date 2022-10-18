const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, guildId } = require('./config.json')
const { ask } = require('./src/ai.js')



const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, './src/commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)
    client.commands.set(command.data.name, command);
}


client.once('ready', () => {
    console.log('Bot is online');
});



client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        
        // Get interaction author information
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
        
        const userId = interactionUser.id
        
        if(userId === "584396828322037760") {
            //User exclusion
            interaction.reply("HEFU IWEEE WAIIII");
        } else {
            // Ai replies
            await interaction.reply('Working on it...');
            const input = interaction.options.getString('input');
            console.log(input)
            const result = await ask(input);
            await interaction.editReply(result);
        };
        
        
    } catch (err) {
        console.log(err);
        await interaction.reply({ content: "There was an error while executing the command", ephemeral: true});
    };
});


client.login(token);
