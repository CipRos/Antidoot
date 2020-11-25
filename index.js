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
client.ale1 = "\n\n\nAle, vreau sa stii ca esti cea mai draguta fata din lume, iti ador zambetul, rasul, ochii, si privierea cu care te uiti la mine atunci cand iti pun I see red. Esti persoana pentru care ma trezesc de dimineata, lumina zilei mele si apoi luna serii mele. Te iubesc foarte mult, ma bucur ca faci parte din viata mea si mai vreau sa stii ca tin enorm la tine si vreau sa imi petrec fiecare zi alaturi de tine. \nVreau sa iti multumesc ca imi faci zilele mai frumoase cu faptul ca vorbim in fiecare zi, si in fiecare seara, si ca imi esti alaturi.\n\nImi pare rau ca a venit acum marea pandemie care ne tine la distanta dar in acelasi timp sunt fericit ca exista modalitati prin care putem comunica in fiecare zi si seara. Scopul meu in viata in momentul asta e sa te fac fericita si sper din suflet ca reusesc pentru ca vreau sa fim amandoi fericiti, pana la sfarsitul lumii, care aparent, va fi in cativa ani daca stam sa ne luam dupa Antena 1 si alte posturi de noutati. =))\n\n"
client.ale2 = "Te ador enorm si vreau sa iti spun ca sunt foarte fericit ca parintii tai nu au folosit baloane, pentru ca nu te-as mai fi avut in viata mea. In fiecare moment in care respir vreau sa te strang in brate si vreau sa te am langa mine pentru ca te iubesc si pentru ca tin la tine nespus de mult. ❤\n\n\n"

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