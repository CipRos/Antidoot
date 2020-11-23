const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(""));

/* DISCORD BOT CODE*/

const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const ascii = require("ascii-table");

// Create a new Ascii table
let cmdTable = new ascii("Commands");
cmdTable.setHeading("Command", "Load status");
let evtTable = new ascii("Events");
evtTable.setHeading("Event", "Load status");

const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    if(eventName) {
      client.on(eventName, event.bind(null, client));
      evtTable.addRow(eventName, '✅')
    } else {
      evtTable.addRow(eventName, '❌');
    }
  });
  console.log(evtTable.toString())
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    if (commandName) {
      client.commands.set(commandName, props);
      cmdTable.addRow(commandName, '✅');
    } else {
      cmdTable.addRow(commandName, '❌');
    }
  });
  console.log(cmdTable.toString());
});

client.login(process.env.t0k3n);