import connectDB from "./db/db.js";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import GitHubStrategy from "passport-github2";
import session from "express-session";
import dotenv from 'dotenv';
dotenv.config();
import path from "path";

connectDB();
const PORT = 5005;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "mugiwara",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());



const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  githubId: String,
  secret: String,
});

const User = new mongoose.model("User", userSchema);


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/package",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile.id);
    }
  )
);
app.use("/profile", express.static("upload/images"));

app.get("/", (req, res) => {
  res.render("Screen/landing", {
    pageTitle: "Tripper",
  });
});

app.get("/package_details", (req, res) => {
  res.render("package_details", {
    pageTitle: "Tripper",
  });
});
app.get("/allblog", (req, res) => {
  res.render("blog", {
    pageTitle: "Tripper",
  });
});

app.get("/package", (req, res) => {
  res.render("allpackage", {
    pageTitle: "Tripper",
  });
});

app.get("/navigation", (req, res) => {
  res.render("includes/navigation", {
    pageTitle: "Tripper",
  });
});

app.get("/login", (req, res) => {
  res.render("login/login");
});
app.get("/signup", (req, res) => {
  res.render("signup/signup");
});
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/package",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/package");
  }
);

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/package");
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
