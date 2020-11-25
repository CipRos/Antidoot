exports.run = (client, message, args) => {
    const Discord = require("discord.js")
  if (message.author.id=="410495079439007755" || message.author.id=="546696071829651496") {
    message.channel.send(client.ale1).catch(console.error);
    message.channel.send(client.ale2).catch(console.error);
  } else {message.channel.send("nana bruh")}
}