exports.run = async (client, message, args) => {
  const Discord = require("discord.js")
  const fetch = require('node-fetch');
  if (message.author.id === client.config.ownerID) {
    if (!args[0]) {
      return message.channel.send(`> __**Get Command**__
> Usage:    \`;get @User\`
> Returns: \`User points and level information\``)
    }
    var target = message.mentions.users.first()
    if (!target) { target = args[0]; } else { target = target.id }
    var tar = message.mentions.users.first()
    if (!tar) { tar = client.users.get(args[0]).tag; } else { tar = tar.tag }
    var list = await fetch("https://antidoot.glitch.me/json/" + target).then(response => response.json());

    if (list.isCheater == "false") {
      var pts = list.points
      var multii = list.multi
      try {
        var liset = await fetch("https://antidoot.glitch.me/json/" + target + "/points/" + pts + "/multi/" + multii + "/isCheater/true").then(response => response.json());
        var embeddo = new Discord.RichEmbed()
          .setTitle(tar + " has been banned!")
          .setColor("#7CFC00")
          .setDescription("Request: Ban" + "\nStatus: " + liset.status)
        message.channel.send(embeddo).catch(console.error);
      } catch (err) {
        var embeddo = new Discord.RichEmbed()
          .setTitle(tar + " could not be banned!")
          .setColor("#FF0000")
          .setDescription("Request: Ban" + "\nStatus: " + err)

        message.channel.send(embeddo).catch(console.error);
      }
    } else {
      var embeddo = new Discord.RichEmbed()
        .setTitle(tar + " could not be banned!")
        .setColor("#FF0000")
        .setDescription("Request: Unban" + "\nError: " + tar + " is already banned.")

      message.channel.send(embeddo).catch(console.error);
    }
  }
}