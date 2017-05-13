var express = require("express");
var app = express();
var port = process.env.PORT||8080;
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/notes");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var index = require("./controllers/index");
app.use("/", index);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));


app.listen(port, function(){
  console.log("Server listenning on port "+port);
})
