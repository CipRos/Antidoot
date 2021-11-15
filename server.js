if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
//const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  if(req.user) return res.render('../pages/home.ejs', { name: req.user.name, loggedIn: true  })
  res.render('../pages/home.ejs', { name: "You should really make an account", loggedIn:false })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = req.body.password//await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    console.log(users)
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

function checkAuthenticated(req, res, next) {
  // if (req.isAuthenticated()) {
    return next()
  // }

  // res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

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
  
  // const indexRoute = require("./routes/index")
  // const dashboardRoute = require("./routes/dashboard")
  // const apiRoute = require("./routes/api")
  // const gamesRoutes = require("./routes/games")

  if(maintenance=="true") {
    console.log("\nMAINTENANCE MODE IS ON");
    // app.use("/dashboard", dashboardRoute);
    // app.use("/api", apiRoute);
    app.get('*', function(req, res){
       res.send("Maintenance is in progress")
    })
  };


  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

var normalizedPath = path.join(__dirname, "routes");
var startTime, endTime
var totalTime=0;
console.log("<---------------------------------------------------->")
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  startTime = new Date();
  require("./routes/" + file)(app);
  var lefile = file.replace(".js", "");
  endTime = new Date();
  var timeDiff = endTime - startTime;
  console.log("Loaded " + lefile + " route in " + timeDiff +"ms!")
  totalTime = totalTime + timeDiff
});
  //The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + "/pages/hidden/404.html"))
});
  
console.log("---------------------------------------")
console.log("Everything loaded in "+ totalTime + "ms")

  // app.use("/", indexRoute);
  // app.use("/dashboard", dashboardRoute);
  // app.use("/api", apiRoute);
  // app.use("/games", gamesRoutes);

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

const listener = server.listen(1337, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

//app.listen(3000)