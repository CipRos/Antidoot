exports.run = async (client, message, args) => {
  const Discord = require("discord.js")

  if (message.author.id === client.config.ownerID) {
    try {
      //console.log(`Restarting Glitch project...`);
      message.channel.send("Antidoot Bot has restarted!").then(msg => client.destroy())
        .then(() => client.login(process.env.t0k3n));
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  } else {
    message.channel.send("Do not even try...");
  }
}