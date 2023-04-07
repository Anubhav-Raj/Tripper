require("./db/db");
const express = require("express");
const bodyParser = require("body-parser");

const PORT = 5005;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("landing");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
