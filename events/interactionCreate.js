module.exports = {
    eventName : "interactionCreate",
    react : async (client, interaction) => {

        if (!interaction.isCommand() && !interaction.isSelectMenu()) return;
    
        const command = client.commands.get(interaction.commandName) || client.commands.get(interaction.customId);
    
        if (!command) return;
    
        if (interaction.isSelectMenu()){
            try {
                await command.handleSelection(interaction, client)
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            return
        }
    
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}