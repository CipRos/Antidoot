var path = require("path");
const app = require("express").Router();
  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`

db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()
//console.log(maintenance)
    
    app.get('/settings', function(req, res){
    res.sendFile(path.join(main + "/admin/services.html"))
    })
    
    app.get('/', function(req, res){
    res.sendFile(path.join(main + "/admin/index.html"))
    })
  
    app.get('/info', function(req, res){
    res.sendFile(path.join(main + "/admin/info.html"))
    })
  
    app.get("/api", (req, res) => {
    res.sendFile(path.join(main + "/api/index.html"))
    })

    app.get("/upload", (req, res) => {
    res.sendFile(path.join(main + "/admin/upload.html"))
    });

module.exports = app;