// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}



// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {

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
});


client.on("messageCreate", async function(message) {
    if(message.author.bot) return;
	if (message.content == ".delete"){
		message.channel.messages.fetch({
			limit: 100
		}).then((messages)=>{
			var botMessages = messages.filter((msg) => msg.author.id === "979004851168096316")
			message.channel.bulkDelete(botMessages, true).then(()=>{
				message.delete()
				message.channel.send("Cleared bot messages").then(msg => setTimeout(()=>msg.delete(), 5000))
			})
		})
		return
	}
	await message.delete()
});



// Login to Discord with your client's token
client.login(token);