const mongoose = require("mongoose");
const dbUrl = "mongodb://0.0.0.0:27017/tripper";
mongoose.set("strictQuery", true);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});
