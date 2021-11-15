var path = require("path");
const app = function(app){
const fs = require("fs");

  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`


db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()
//console.log(maintenance)

app.get("/games", async function(req, res) {
    res.send("<a href=\"/games/clicker\"> Clicker Game </a>")
});

app.get("/games/clicker", async function(req, res) {
    res.sendFile(path.join(main + "/games/clicker.html"))
});

app.get("/games/defender", async function(req, res) {
    res.sendFile(path.join(main + "/games/defender.html"))
});

app.get("/games/birdflappy", async function(req, res){
    res.sendFile(path.join(main + "/games/flappy.html"))
});
}
module.exports = app;