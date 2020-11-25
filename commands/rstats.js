exports.run = async (client, message, args) => {
  const Discord = require("discord.js")
  const fetch = require('node-fetch');

  if (message.author.id === client.config.ownerID) {

    var list = await fetch("https://antidoot.glitch.me/bot/update/userCount/" + client.guilds.get("630773136689725440").memberCount).then(response => response.json());
    await fetch("https://antidoot.glitch.me/bot/update/channelCount/" + client.guilds.get("630773136689725440").channels.size).then(response => response.json());
    await fetch("https://antidoot.glitch.me/bot/update/roleCount/" + client.guilds.get("630773136689725440").roles.size).then(response => response.json());

    const embeddo = new Discord.RichEmbed()
      .setTitle("Works?")
      .setColor("#7CFC00")
      .setDescription("Status: " + list.status)

    message.channel.send(embeddo).catch(console.error);
  } else {
    message.channel.send("nonono")
  }
}