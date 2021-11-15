var path = require("path");
var app = function(app){
var express = require("express");
  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`

db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()
//console.log(maintenance)

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

app.get('/', function(req, res){
    res.render(path.join(main + "/home.ejs"), { name: "Kyle"})
});

app.use("/files/", function(req, res){
    res.sendFile(path.join(__dirname+req.originalUrl))
});
}

module.exports = app;