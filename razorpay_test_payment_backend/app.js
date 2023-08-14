const express = require("express");
const app = express();
const cors = require("cors");

const productRoute = require("./router/v1/product");
//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
