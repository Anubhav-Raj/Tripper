import connectDB from "./db/db.js";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

connectDB();
const PORT = 5005;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/profile", express.static("upload/images"));

app.get("/", (req, res) => {
  res.render("Screen/landing", {
    pageTitle: "Tripper",
  });
});

app.get("/package", (req, res) => {
  res.render("allpackage", {
    pageTitle: "Tripper",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
