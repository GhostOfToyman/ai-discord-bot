const{ SlashCommandBuilder } = require('discord.js')
const { ask } = require('../ai.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Tell the bot what you want to do')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input will be sent to the AI')
                .setRequired(true)),
};
