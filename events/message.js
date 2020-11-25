module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  var mcmd = message.content
  if (message.channel.type == "dm") {
    /*if(message.author.id=="410495079439007755"){
      var mcmd = message.content
      client.users.get("546696071829651496").send(mcmd)
    }*/
    if (message.author.id == "546696071829651496") {
      
      let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
      /*if (messageAttachment) { client.users.get("410495079439007755").send(messageAttachment);
      } else {
        client.users.get("410495079439007755").send(message.author.tag + ": " + mcmd)
      }*/

      if (mcmd == "te iubesc") { message.channel.send("si eu te iubesc ❤") }
      if (mcmd == "Megan") { message.channel.send("I found her :oil:");message.channel.send("MEGAAAAAN  ⚪️:lips:⚪️") }
    }
  }
  if (message.author.id == "546696071829651496") {
    if (mcmd == "ceva") { message.channel.send("altceva") }
  }
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};