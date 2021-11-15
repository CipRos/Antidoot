var path = require("path");
const app = require("express").Router();
const fs = require("fs");

  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fetch = require("node-fetch")
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`


db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()
//console.log(maintenance)

app.get("/", async function(req, res) {
    res.send("<a href=\"/games/clicker\"> Clicker Game </a>")
});

app.get("/clicker", async function(req, res) {
    res.sendFile(path.join(main + "/games/clicker.html"))
});

app.get("/defender", async function(req, res) {
    res.sendFile(path.join(main + "/games/defender.html"))
});

app.get("/birdflappy", async function(req, res){
    res.sendFile(path.join(main + "/games/flappy.html"))
});

module.exports = app;