//===============READY EVENT================
module.exports = {
    name: 'ready',
    async execute(client){
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
        const config = client.config;
        const channel = client.channels.cache.get(config.mainClanChannel);

        const clearOldMessages = async (statusChannel, nbr) => {
            try {
                const messages = await statusChannel.messages.fetch({ limit: 99 });
                let i = 0;
                for (const message of messages.values()) {
                    if (i >= nbr) {
                        await message.delete().catch(() => {});
                    }
                    i += 1;
                }
            } catch (error) {
                console.error("error while deleting old status messages:\n", error.message);
            }
        }
        
        const getLastMessage = async (statusChannel) => {
            try {
                const messages = await statusChannel.messages.fetch({ limit: 20 });
                const filteredMessages = messages.filter((message) => {
                    return true;
                });
                return filteredMessages.first();
            } catch (e) {
                console.error("error while getting last status message (does not exist):\n", error.message);
                return null;
            }
        }

        const sendmsg = async () => {
            await clearOldMessages(channel, 1);
        
            const statusMessage = await getLastMessage(channel);
            if (statusMessage) {
                return statusMessage;
            }
        
            await clearOldMessages(channel, 0);
        
            const embed = new EmbedBuilder()
            .setColor(conf.embedCollor)
            .setAuthor({
                name: 'Купить Проходку'
            })
            .setDescription(`**Для покупки проходки тык на кнопку ниже!**\n**Проходка стоит ${"`500`"} рублей!**`)
            .setThumbnail(conf.thumbImage)
            .setFooter({
                text: conf.footerText
            })
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('requestEmbed')
                .setLabel('Дать Денег')
                .setEmoji('💚')
                .setStyle(ButtonStyle.Primary)
            )
            channel.send({
                embeds: [embed],
                components: [row]
            })
        }
    }
}