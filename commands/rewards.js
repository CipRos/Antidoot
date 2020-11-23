exports.run = async(client, message, args) => {
    const Discord = require("discord.js")
    const fetch = require('node-fetch');

    if(!args[0]) {return message.channel.send(`> __**Get Command**__
> Usage:    \`;get @User\`
> Returns: \`User points and level information\``)}

    var Trainee = message.guild.roles.find("name", "Trainee");
    var Begginer = message.guild.roles.find("name", "Begginer");
    var Elder = message.guild.roles.find("name", "Elder");
    var Master = message.guild.roles.find("name", "Master");
    var Wise = message.guild.roles.find("name", "Wise");
    var Saint = message.guild.roles.find("name", "Saint");

    var target = message.mentions.users.first()
    if(!target){target = args[0];} else {target = target.id}
    var tar = message.mentions.users.first()
    if(!tar){tar = client.users.get(args[0]).tag;} else {tar = tar.tag}
    var list = await fetch("https://antidoot.glitch.me/json/" + target).then(response => response.json());
  
  function checkStatus(){
    if(target==client.config.ownerID){ return "Developer"}
    if(list.multi >= 1 && list.multi <= 4){ return "Trainee"}
    if(list.multi >= 5 && list.multi <= 7){ return "Begginer"}
    if(list.multi >= 8 && list.multi <= 13){ return "Elder"}
    if(list.multi >= 14 && list.multi <= 20){ return "Master"}
    if(list.multi >= 21 && list.multi <= 26){ return "Wise"}
    if(list.multi == 27){ return "Saint"}
    if(list.multi >= 60){ return "God Himself"}
  };

    if(list.isCheater=="true"){
    var mesag = new Discord.RichEmbed()
    .setTitle(tar + " - " + "Banned")
    .setColor("RANDOM")
    .setDescription("This user is currently banned due to cheating.")

    return message.channel.send(mesag).catch(console.error);
    }

    if(list.message) {
    var mesag = new Discord.RichEmbed()
    .setTitle(tar + " - " + checkStatus())
    .setColor("RANDOM")
    .setDescription("Points: " +list.points+"\nLevel (PPC): " +list.multi)
    .setFooter(list.message)

    message.channel.send(mesag).catch(console.error);
    } else { 
    var embeddo = new Discord.RichEmbed()
    .setTitle(tar + " - " + checkStatus())
    .setColor("RANDOM")
    .setDescription("Points: " +list.points+"\nLevel (PPC): " +list.multi)

    message.channel.send(embeddo).catch(console.error);
    }
    message.channel.send("Also " +message.member.roles.find(r => r.name=="Trainee")).catch(console.error);
}