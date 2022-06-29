const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channels')
		.setDescription('List of channels'),
	async execute(interaction, client, reply=true) {
		
		var response = client.channels.cache.filter(channel => !channel.parentId).map(channel=>{ return {"label" : channel.name, "value" : channel.id } })

		const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('channels')
				.setPlaceholder('Nothing selected')
				.setMinValues(1)
				.setMaxValues(response.length)
				.addOptions(response),
		);
		if (reply){
			await interaction.reply({ content: 'Channels', components: [row], ephemeral : true });
		}else{
			await interaction.update({ content: 'Channels', components: [row], ephemeral : true });
		}
		
	},
	async handleSelection(interaction, client){
		if (interaction.values.includes("noId")){
			await this.execute(interaction, client, false)
			return 
		}
		var response = client.channels.cache.filter(channel => interaction.values.includes(channel.parentId))
											.map(channel=>{ return {"label" : channel.name, "value" : channel.id } })
		if (response.length === 0){
			console.log(interaction.values)
			await interaction.update({content : interaction.values.map(channelId => client.channels.cache.get(channelId).name).join(", "), components : []})
			return
		}
		var Id = client.channels.cache.get(interaction.values[0]).parentId || "noId"
		response.splice(0, 0, {"label" : "Previous", "value" : Id});
		console.log(response)
		const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('channels')
				.setPlaceholder('Nothing selected')
				.setMinValues(1)
				.setMaxValues(response.length)
				.addOptions(response),
		);
		await interaction.update({ content: 'Channels', components: [row], ephemeral : true });
	}
};