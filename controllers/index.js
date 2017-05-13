var express = require("express");
var router = express.Router();


var mang = ["Java", "React", "PHP"];

router.get("/", function(req, res){
  res.render("homepage");
})
router.post("/getNotes", function(req, res){
  res.send(mang);
})
router.post("/add", function(req, res){
  var note = req.body.note;
  mang.push(note);
  res.send(mang);
});
router.post("/deleteNote", function(req, res){
  var idDelete = req.body.idDelete;
  mang.splice(idDelete, 1);
  res.send(mang);
});
router.post("/updateNote", function(req, res){
  var idSua = req.body.idSua;
  mang[idSua] = req.body.noiDung;
  res.send(mang);
});
module.exports = router;
