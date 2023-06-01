const express = require("express");
const sqlOperation = require('./DB/SqlOperation');
const Encounter = require('./DB/Models/Encounter')
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const dbo = require("./DB/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
app.get('/GetMonsters', function (req, res) {
    console.log('Called');
    const response = sqlOperation.getMonsters().then(res => {
        return res.recordset;
    });
    res.send(response)
});
app.get('/GetItems', function (req, res) {
    console.log('Called');
    const response = sqlOperation.getItems().then(res => {
        return res.recordset;
    });
    res.send(response)
});
app.get('/GetActions', function (req, res) {
    console.log('Called');
    const response = sqlOperation.getActions().then(res => {
        return res.recordset;
    });
    res.send(response)
});
app.get('/GetEncounters', function (res) {
    console.log('Called');
    const response = sqlOperation.getEncounters().then(res => {
        console.log(res.recordset);
        return res.recordset;
    });
    console.log(res);
    res.send(response)
    return response;
});
app.post('/GetEncounterID', function (req, res) {
    console.log('Called');
    const response = sqlOperation.getOneEncounter(req.body).then(res => {
        return res.recordset;
    });
    res.send(response)
});
sqlOperation.getEncounters().then(res => {
    console.log(res.recordset);
})