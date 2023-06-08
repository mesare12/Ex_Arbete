const express = require("express");
 const itemRoutes = express.Router();
const dbo = require("../DB/conn");
const ObjectId = require("mongodb").ObjectId;

itemRoutes.route("/item").get(function (req, res) {
    let db_connect = dbo.getDb("Examen");
 db_connect
   .collection("item")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
itemRoutes.route("/item/:id").get(function (req, res) {
    let db_connect = dbo.getDb("Examen");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("item")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
itemRoutes.route("/item/add").post(function (req, response) {
    let db_connect = dbo.getDb("Examen");
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
   items: req.body.items,
   story: req.body.story,
 };
 db_connect.collection("item").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
 
itemRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb("Examen");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = itemRoutes;