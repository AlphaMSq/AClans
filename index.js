ll.registerPlugin('AClans', 'Plugin for LLBDS that adds clans.', [ 1, 0, 0 ], {
    Author: "Alpha",
});
const fs = require('fs')
const DB = require('./methods/DB');
const Logger = require('./methods/Log');
const { getConfig } = require('./methods/ConfigFile');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder ,ButtonBuilder, ButtonStyle } = require("discord.js");

const config = getConfig('./plugins/AClans/config.json');
const client = new Client({ intents: [ Object.keys(GatewayIntentBits) ] });
client.login(config.discordToken);

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
for (const file of events){
    const event = require('./events/'+file)
    client.on(event.name, (...args) => event.execute(...args, client))
}

const cmds = require("./cmds.js")
client.on('messageCreate', (msg) => {
    if (msg.author.username != client.user.username && msg.author.discriminator != client.user.discriminator) {
        const discordCmd = msg.content.trim() + " "
        const discordCmdName = discordCmd.slice(0, discordCmd.indexOf(" "));
        for (i in cmds) {
            const cmdsListName = config.discordPrefix + cmds[i].name;
            if (discordCmdName == cmdsListName) {
                cmds[i].out(client, msg);
            }
        }
    }
})