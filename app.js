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
const nodemailer = require('nodemailer');
require('dotenv').config();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const MONGO_URL="mongodb+srv://kumargowdad17:oqXZvtRRZQDpXeZJ@cluster0.ka59b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
 

app.get("/home",(req,res)=>{
    res.render("listings/home.ejs");
});

app.get("/home/quiz",(req,res)=>{
    res.render("listings/quiz.ejs");
});

app.get("/signup",(req,res)=>{
    res.render("listings/signup.ejs");
});
app.post("/signup", async (req, res, next) => {
    try {
        let { username, email,address,contact, password } = req.body;
        const newUser = new User({ contact,address,email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, async (err) => {
            if (err) {
                return next(err);
            }
            const mailOptions = {
                from: '"Smile Team"', 
                to: email, 
                subject: "Welcome to Smile!", 
                text: `Hello ${username},\n\nWelcome to Smile! We're excited to have you on board.\n\nBest regards,\nThe Smile Team`, 
                html: `<p>Hello <strong>${username}</strong>,</p><p>Welcome to <strong>Smile</strong>! We're excited to have you on board.</p><p>Best regards,<br>The Smile Team</p>` // HTML body
            };

            try {
                await transporter.sendMail(mailOptions);
                req.flash("success", "Welcome to Smile! Check your email for a welcome message.");
            } catch (emailError) {
                console.error("Error sending email:", emailError);
                req.flash("error", "Signup succeeded, but we couldn't send a welcome email.");
            }

            res.redirect("/home");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup/main");
    }
});


app.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
});
app.post("/login", passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }), async (req, res) => {
    req.flash("success","You are logged in Successfully");
    res.redirect("/home");  
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

app.get("/home/aiml/test1",(req,res)=>{
    res.render("listings/aimltest1.ejs");
});

app.get("/home/aiml/test2",(req,res)=>{
    res.render("listings/aimltest2.ejs");
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
app.get("/home/cloud/test1",(req,res)=>{
    res.render("listings/cloudtest1.ejs");
});

app.get("/home/cloud/test2",(req,res)=>{
    res.render("listings/cloudtest2.ejs");
});

app.get("/home/aboutUs",(req,res)=>{
    res.render("listings/aboutUs.ejs");
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
