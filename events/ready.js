const { MessageEmbed , MessageAttachment} = require('discord.js');
const conf = require('../config.json');

module.exports = {
    eventName : "ready",
    react : async (client) => {
        console.log('Ready!');
        let bm = client.channels.cache.filter(channel => channel.name == "bot_message").first()
        let messages = await bm.messages.fetch()
        if (messages.size == 0){

            const master = await client.users.fetch("330071695350300673")

            const file = new MessageAttachment('./Img/image.png');

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Some title')
                .setURL('https://discord.js.org/')
                .setAuthor({ name: 'Aperence', iconURL: master.displayAvatarURL() })
                .setDescription('Welcome to this server !')
                .addFields(
                    { name: 'To get roles', value: 'React to this message' },
                )
                .setThumbnail('attachment://image.png')
                .setImage('attachment://image.png')


            let new_message = await bm.send({ embeds: [embed], files : [file] });

            new_message.react("👍")
            new_message.react("👎")
        }
    }, 
    once : true
}