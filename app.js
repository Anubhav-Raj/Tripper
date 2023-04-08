import connectDB from "./db/db.js";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
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
app.get("/package", (req, res) => {
  res.render("allpackage", {
    pageTitle: "Tripper",
  });
});
app.get("/blogdetails", (req, res) => {
  res.render("singleBlog", {
    pageTitle: "Tripper",
  });
});

app.get("/allblog", (req, res) => {
  res.render("blog", {
    pageTitle: "Tripper",
  });
});

app.get("/navigation", (req, res) => {
  res.render("includes/navigation", {
    pageTitle: "Tripper",
  });
});

app.get("/adminlogin", (req, res) => {
  res.render("admin/adminlogin");
});

app.get("/guidelogin", (req, res) => {
  res.render("Guide/guidelogin");
});

app.get("/touristlogin", (req, res) => {
  res.render("Tourist/touristlogin");
});

app.get("/signup", (req, res) => {
  res.render("signup/signup");
});
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
        res.redirect("/allpackage");
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
