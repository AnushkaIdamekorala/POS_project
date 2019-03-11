const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");
const carts = require("./routes/api/carts");
const user = require("./routes/api/user");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

//bODYpARSER mIDDLEWARE
app.use(bodyParser.json());

//DB config

const db = require("./config/keys").mongoURI;

//Connect to Mongo

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/items", items);
app.use("/api/carts", carts);
app.use("/api/user", user);

//Serve static assets if in producton
if (process.env.NODE_ENV === "production") {
  //Sett aa static folder
  app.use(express.static("client/build"));
  app.get("**", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
