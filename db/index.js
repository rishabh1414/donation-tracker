const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;

const mongoDb = mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DataBase Conected");
  })
  .catch((e) => console.log(e));
