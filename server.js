require('dotenv').config();
const express = require("express");
const http = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 3000;
}

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

app.use(session({
  secret : "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect('mongodb://localhost:27017/usersDB', {useNewUrlParser: true, useUnifiedTopology: true});
const cluster = process.env.CLUSTER;
mongoose.connect(`${cluster}`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//GET Requests

app.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.render("index", {  
    statusHref:'/logout',
    loginStatus:'Logout',
    left_div_display: "",
    sign_in_display: "display_none", 
    sign_up_display: "display_none"});
  }else{
    res.render("index", {
      statusHref:'/sign-up',
      loginStatus:'Sign Up Now!',
      left_div_display: "",
      sign_in_display: "display_none", 
      sign_up_display: "display_none"});
  }
});

app.get("/sign-in", (req, res) => {
  res.render("index", {
    statusHref:'',
    loginStatus:'',
    left_div_display: "display_none",
    sign_in_display: "", 
    sign_up_display: "display_none"})
});

app.get("/sign-up", (req, res) => {
  res.render("index", {
    statusHref:'',
    loginStatus:'',
    left_div_display: "display_none",
    sign_in_display: "display_none", 
    sign_up_display: ""})
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
})

app.get("/new-meeting", (req, res) => {
  if(req.isAuthenticated()){
    res.render("meetRoom", {newMeetingDisplay:"", 
    joinMeetingDisplay:"display_none",
    joinMeetingBtnDisplay:"display_none",
    joinChatBtnDisplay:"display_none",
    meetRoom:"new-meeting",
    callType:""
  });
}else{
  res.redirect("/sign-up");
}
});

app.get("/join-meeting", (req,res) => {
  res.render("meetRoom",{newMeetingDisplay:"display_none", 
  joinMeetingDisplay:"",
  joinMeetingBtnDisplay:"",
  joinChatBtnDisplay:"display_none",
  meetRoom:"join-meeting",
  callType:""
});
})

app.get("/new-chat", (req, res)=>{
  if(req.isAuthenticated()){
    res.render("meetRoom", {newMeetingDisplay:"", 
    joinMeetingDisplay:"display_none",
    joinMeetingBtnDisplay:"display_none",
    joinChatBtnDisplay:"display_none",
    meetRoom:"new-meeting",
    callType:"display_none"
  });
  }else{
    res.redirect("/sign-up");
  }
})

app.get("/join-chat", (req,res) => {
  res.render("meetRoom",{newMeetingDisplay:"display_none", 
  joinMeetingDisplay:"",
  joinMeetingBtnDisplay:"display_none",
  joinChatBtnDisplay:"",
  meetRoom:"join-meeting",
  callType:"display_none"
});
})

//POST requests

app.post("/register", function (req, res) {
  if(req.body.password === req.body.confirmPassword){
    User.register({username: req.body.username}, req.body.password, function(err, user){
      if(err){
          console.log(err);
          res.redirect("/");
      } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect('/');
          });
      }
    })
  }else{
    console.log("Passwords do not match! Make sure they are same in both fields.");
    res.redirect('/sign-up');
  }
  
})

app.post("/login", function (req, res) {
  const user = new User({
      username: req.body.username,
      password: req.body.password
  })

  req.login(user, function(err){
      if(err){
          console.log(err);
      } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect('/');
          });
      }
  })
})

let connectedPeers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    console.log("pre-offer-came");
    const { calleePersonalCode, callType } = data;
    console.log(calleePersonalCode);
    console.log(connectedPeers);
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    console.log(connectedPeer);

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalCode).emit("pre-offer", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer", data);
    }
  });

  socket.on("pre-offer-answer", (data) => {
    const { callerSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === callerSocketId
    );

    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on('user-hanged-up', (data) => {
    const {connectedUserSocketId} = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("user-hanged-up");
    }
  });

  socket.on('stream-removal', (data) => {
    const {connectedUserSocketId} = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("stream-removal");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
