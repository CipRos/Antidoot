var path = require("path");
const express = require("express");

var admin = function(app) {
  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`

db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()
//console.log(maintenance)

app.get('/admin', function(req, res){
    res.sendFile(path.join(main+ `admin/login.html`))
    })
  
    app.use("/uploaded", express.static(`${__dirname}/uploaded/`))

    app.get("/dashboard/upload", (req, res) => {
    res.sendFile(path.join(main + "/admin/upload.html"))
    });

    app.get("/recog", (req, res) => {
    res.sendFile(path.join(main + "/admin/recog.html"))
    })

};


module.exports = admin;