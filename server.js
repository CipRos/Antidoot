// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const http = require("http")
const server = http.createServer(app)
var bodyParser = require("body-parser");
var path = require("path");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const io = require('socket.io')(server, {
  cors: {
      origin: "https://antidoot.tk",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      //credentials: true
  },
  allowEIO3: true
});
 
const adapter = new FileSync('db.json');
//const userdb = low(discordAdapter);
const db = low(adapter);
const main = `${__dirname} + ../../`

db.defaults({ settings: {}}).write()
var maintenance = db.get("settings.maintenance").value()

//console.log(maintenance)
  //
  // This route processes GET requests, by using the `get()` method in express, and we're looking for them on
  // the root of the application (in this case that's https://rest-api.glitch.me/), since we've
  // specified `"/"`.  For any GET request received at "/", we're sending some HTML back and logging the
  // request to the console. The HTML you see in the browser is what `res.send()` is sending back.
  //
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); 
  
  const indexRoute = require("./routes/index")
  const dashboardRoute = require("./routes/dashboard")
  const apiRoute = require("./routes/api")
  const gamesRoutes = require("./routes/games")

  if(maintenance=="true") {
    console.log("\nMAINTENANCE MODE IS ON");
    app.use("/dashboard", dashboardRoute);
    app.use("/api", apiRoute);
    app.get('*', function(req, res){
       res.send("Maintenance is in progress")
    })
  };


  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use("/", indexRoute);
  app.use("/dashboard", dashboardRoute);
  app.use("/api", apiRoute);
  app.use("/games", gamesRoutes);

  app.get('/admin', function(req, res){
    res.sendFile(__dirname+"/pages/admin/login.html")
  });

  //
  //  SOCKET.IO 
  //
  var genID = function(){
  return parseInt((Date.now() * Math.random()).toString().slice(0,6));
}

var isItMobile = function(isMobile){
  if(isMobile){
    return "Phone"
  } else {
    return "PC"
  }
}

var isMobile
var availableRooms;
io.on('connection', function(socket) {
  isMobile = socket.handshake.query["isMobile"];
  isMobile = (isMobile=="true")
  console.log('new connection, type: '+ isItMobile(isMobile));

  if(isMobile){
// Its a Phone
/////////////////////////////////////////////////////////
    socket.on("requestJoin", function(username, code) {
      console.log("Joined Game", io.sockets.adapter.rooms.get(code));
      if(io.sockets.adapter.rooms.get(code)){
        socket.join(code);
        console.log(username+" joined Room "+ code);
        setTimeout(function(){
        io.to(code).emit("updateText", username+" joined!")
        io.to(code).emit("message", username+" joined Room "+code);
      }, 2000);
      } else {
        console.log("Room Not Found!");
      }
    });

/////////////////////////////////////////////////////////
  } else {
// Its a PC
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var roomid = genID().toString();
    socket.join(roomid);
    io.to(roomid).emit("message", "works")
    socket.emit('id', roomid);
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }
  
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

  socket.on("changeText", function(room, data) {
    console.log(room, availableRooms)
    io.to(room).emit("updateText", data);
  });
});
  

  //The 404 Route (ALWAYS Keep this as the last route)
//app.get('*', function(req, res){
//  res.send("404 Bruh");//File(path.join(__dirname + "/pages/hidden/404.html"))
//});


// listen for requests :)
const listener = server.listen(1337, () => {
  console.log("Your app is listening on port " + listener.address().port);
});