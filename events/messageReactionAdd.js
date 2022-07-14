module.exports = {
    eventName : "messageReactionAdd",
    react : async (client, reaction, user) => {

        let realUser = reaction.message.guild.members.cache.find(member => member.id === user.id)

        if (realUser.user.bot) return

        console.log("Reaction added")
        let channel_bot = client.channels.cache.filter(channel => channel.name == "bot_message").first()
        let messages = await channel_bot.messages.fetch()
        if (reaction.message.id === messages.first().id){



            if (reaction.emoji.name === "👍"){
                var role = reaction.message.guild.roles.cache.find(role => role.name === "Test");
                realUser.roles.add(role)
            }
            if (reaction.emoji.name === "👎"){
                var role = reaction.message.guild.roles.cache.find(role => role.name === "Test2");
                realUser.roles.add(role)
            }
        }
    }
}