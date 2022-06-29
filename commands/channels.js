const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channels')
		.setDescription('List of channels'),
	async execute(interaction, client) {
		
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
		await interaction.reply({ content: 'Channels', components: [row], ephemeral : true });
	},
	async handleSelection(interaction, client){
		var response = client.channels.cache.filter(channel => interaction.values.includes(channel.parentId))
											.map(channel=>{ return {"label" : channel.name, "value" : channel.id } })
		if (response.length === 0){
			console.log(interaction.values)
			await interaction.update({content : interaction.values.map(channelId => client.channels.cache.get(channelId).name).join(", "), components : []})
			return
		}
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