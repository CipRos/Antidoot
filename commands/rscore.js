exports.run = async(client, message, args) => {
    const Discord = require("discord.js")
    const fetch = require('node-fetch');

if(message.author.id === client.config.ownerID){
    if(!args[0]) {return message.channel.send(`> __**Set Command**__
> Usage:    \`;set @User <points, number> <level/PPC, number>\`
> Returns: \`User points and level information\``)}

   var target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!target){
     var emg = new Discord.RichEmbed()
      .setTitle("Works?")
      .setColor("RANDOM")
      .setDescription("Status: No valid user specified!")

     return message.channel.send(emg)}
    var list = await fetch("https://antidoot.glitch.me/json/"+target.id+"/points/0/multi/1").then(response => response.json());

    const embeddo = new Discord.RichEmbed()
    .setTitle("Works?")
    .setColor("#7CFC00")
    .setDescription("Status: " + list.status)

    message.channel.send(embeddo).catch(console.error);
}else{
  message.channel.send("nonono")
}}