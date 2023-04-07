import connectDB from "./db/db.js";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

connectDB();
const PORT = 5005;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("landing");
});
app.get("/product", (req, res) => {
  res.render("allproduct");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
