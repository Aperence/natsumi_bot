const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	async execute(interaction, client) {
		await interaction.reply(`Server name ${interaction.guild.name} with ${interaction.guild.memberCount} members`);
	},
};