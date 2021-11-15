const fileUpload = require('express-fileupload');
const multer = require('multer');
const app = require("express").Router();
const fs = require("fs");

  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`
const rip = "localhost"//"192.168.100.55"

db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()
//console.log(maintenance)

app.use(fileUpload({
  createParentPath: true
}));

app.get("/", async function(req, res) {
    res.send("OK");
});

const upload = multer({
  dest: "./uploaded"
});

app.post('/upload', upload.single('image'), (req, res, next) => {
  let upFile = req.files.image;
  let ext = upFile.name.split(".")
  
  if(!upFile) {return res.send("You didnt specify an image idiot")}
  
  // Use the mv() method to place the file somewhere on your server
  upFile.mv(`${__dirname}/uploaded/${upFile.name}`)//${upFile.md5}.${ext[ext.length - 1]}
  if(ext[ext.length - 1] == "mp4") {
    let html = `<!DOCTYPE html> <h1> Upload Complete!</h1><video src="/uploaded/${upFile.name}" controls> `;
    return res.send(html);
  }
  if(ext[ext.length - 1] == "mp3") {
    let html = `<!DOCTYPE html> <h1> Upload Complete!</h1><audio controls> <source src="/uploaded/${upFile.name}" type="audio/mpeg"> </audio> `;
    return res.send(html);
  }
    let html = `<!DOCTYPE html>Upload completed. Here's your image:<br><img src="/uploaded/${upFile.name}">`;
    res.send(html);
  });

  app.get("/game/json/:uid", async function(req, res) {
    var user = await db.get("antidoot."+req.params.uid).value()
    if(!user){
      var uzer = await db.set("antidoot."+req.params.uid, {"points": 0, "multi": 1, "isCheater": "false"}).write()
      var points = "0"
      var multi = "1"
     return res.send({"points": points, "multi": multi, "message": "A new account has been created for you!"})
    }
    var user = await db.get("antidoot."+req.params.uid).value()
    var points = user.points
    var multi = user.multi
    var cheats = user.isCheater
  res.send({"points": points, "multi": multi, "isCheater": cheats})
  });

app.get("/game/json/:uid/points/:setp/multi/:multi/isCheater/:ic", async function(req, res) {
   var user = await db.get("antidoot."+req.params.uid).value()
   if(!user){return res.send({"status": "User does not exist!"})}
     await db.set("antidoot."+req.params.uid+".points", req.params.setp).write()
     await db.set("antidoot."+req.params.uid+".multi", req.params.multi).write()
     await db.set("antidoot."+req.params.uid+".isCheater", req.params.ic).write()
     res.send({"status": "Complete!"})
});

app.get("/game/json/:uid/points/:setp/multi/:multi", async function(req, res) {
   var user = await db.get("antidoot."+req.params.uid).value()
   if(!user){return res.send({"status": "User does not exist!"})}
  //Cheat checker
     var oldPoints = await db.get("antidoot."+req.params.uid+".points").value()
     var oldMulti = await db.get("antidoot."+req.params.uid+".multi").value()
     var newPoints = req.params.setp
     var newMulti = req.params.multi
     if(newPoints - oldPoints >= 10000){
       console.log("newPoints: "+newPoints)
       console.log("oldPoints: "+oldPoints)
       console.log("[AntiCheat] User ("+req.params.uid+") has been banned for Cheating!\nReason: "+newPoints - oldPoints+" points/30 sec")
       await db.set("antidoot."+req.params.uid+".isCheater", "true").write()
       //sendDis("[AntiCheat] User ("+req.params.uid+") has been banned for Cheating!\nReason: "+`${(newPoints - oldPoints)/30}`+" points/sec", 11730954)
     } else {
       await db.set("antidoot."+req.params.uid+".points", req.params.setp).write()
       await db.set("antidoot."+req.params.uid+".multi", req.params.multi).write()
     }
     res.send({"status": "Complete!"})
});

app.post("/loogin", (req, res) => {
  var usr = req.body.usr;
  var pwd = req.body.pwd;
  var today  = new Date();
  var time = today.toLocaleString("en-US")
    if(usr=="CipX" && pwd=="xzx"){
       console.log(time + " | User logged in as CipX")
        res.send("/dashboard");
    } else {
    res.send("/admin");
}});
  
  app.post("/settings", (req, res) => {
  var today  = new Date();
  var time = today.toLocaleString("en-US")
  //console.log("["+time+"] New activity from Admin Pannel")
  var ptype = req.body.ptype
  var setting = req.body.setting;
  var value = req.body.value;
  
    if(!ptype) {
      res.send("No post type provided.")
    }
    
  if(!setting && !value) {
    console.log("empty post, ptype: " + ptype)
    res.send("man are you idiot?")
  } 
  //console.log("["+time+"] New activity from Admin Pannel")
    console.log("["+time+"] New " + ptype + " request")
    
  if(ptype == "get-list"){
    
  }
    
  if(ptype == "mswitch"){
    if(!setting || !value){res.send("No")} else {
    db.set('settings'+"."+setting, value).write()
      res.send("Worked");
      process.exit(0)
  }}
    
  if(ptype == "auto-get"){
    if(!setting) {
      res.send("No")
    } else {
   // console.log(setting)
    var response = db.get("settings."+setting).value()
  //  console.log(">"+response+"<")
    res.send(response)
  }}
    
  if(ptype == "get"){
    var response = db.get(/*"settings."+*/setting).value()
    if(!response) {
      res.send("Setting not found!")
  } else {
    res.send(response);
  }}
    
  if(ptype=="set"){
      db.set(/*'settings'+"."+*/setting, value).write()
      res.send("Worked");
      //require('child_process').exec('refresh');
  }});

module.exports = app;