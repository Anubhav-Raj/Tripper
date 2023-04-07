import connectDB from './db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
connectDB();
const PORT = 5005;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('landing');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
