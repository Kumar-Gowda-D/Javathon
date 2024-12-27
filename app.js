const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const Help = require("./models/help.js");
const isLoggedIn = require("./middleware.js");
const saveRedirectUrl = require("./middleware.js");



app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const MONGO_URL="mongodb://127.0.0.1:27017/education";
main().then(()=>console.log("connected to DataBase"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  });

app.get("/home",(req,res)=>{
    res.render("listings/home.ejs");
});

app.get("/signup",(req,res)=>{
    res.render("listings/signup.ejs");
});
app.post("/signup",async(req,res,next)=>{
    try{
    let{username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to smile");
        res.redirect("/home");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup/main");
    }
});

app.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
});
app.post("/login", passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }), async (req, res) => {
    req.flash("success","You are logged in Successfully");
    res.redirect("/home/main");  
});

app.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out successsfully");
        res.redirect("/home");
    });
})

app.get("/home/main",saveRedirectUrl,isLoggedIn,(req,res)=>{
    res.render("listings/main.ejs");
});

app.get("/home/aiml",(req,res)=>{
    res.render("listings/aiml.ejs",)
});

app.get("/home/aiml1",(req,res)=>{
    res.render("listings/aiml1.ejs",)
});

app.get("/home/aiml2",(req,res)=>{
    res.render("listings/aiml2.ejs",)
});

app.get("/home/cloud",(req,res)=>{
    res.render("listings/cloud.ejs");
});
app.get("/home/cloud1",(req,res)=>{
    res.render("listings/cloud1.ejs");
});
app.get("/home/cloud2",(req,res)=>{
    res.render("listings/cloud2.ejs");
});

app.get("/home/help",saveRedirectUrl,isLoggedIn,(req,res)=>{
    res.render("listings/help.ejs",)
});

app.post("/home/help",async(req,res)=>{
    let{message} = req.body;
    await Help.insertMany({
        message:message,
        owner:req.user._id
    });
    res.redirect("help");
});
 
app.get("/home/discover",(req,res)=>{
    res.render("listings/discover.ejs");
});

app.listen(3000,(req,res)=>{
    console.log("Listening to the port 3000");
});
