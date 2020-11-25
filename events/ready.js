module.exports = (client) => {
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);

  client.user.setActivity(`${client.guilds.get("630773136689725440").memberCount} user${client.guilds.get("630773136689725440").memberCount !== 1 ? 's' : ''}`, { type: 'WATCHING' })
    .catch(err => console.error());
}