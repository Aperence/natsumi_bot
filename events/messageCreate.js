module.exports = {
    eventName : "messageCreate",
    react : async function(client, message) {
        if(message.author.bot || ! message.content.startsWith(".")) return;
        if (message.content == ".delete"){
            message.channel.messages.fetch({
                limit: 100
            }).then((messages)=>{
                var botMessages = messages.filter((msg) => msg.author.id === client.user.id)
                message.channel.bulkDelete(botMessages, true).then(()=>{
                    message.delete()
                    message.channel.send("Cleared bot messages").then(msg => setTimeout(()=>msg.delete(), 5000))
                })
            })
            return
        }
        await message.delete()
    }
}