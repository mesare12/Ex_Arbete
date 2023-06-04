const express = require("express");
const sqlOperation = require('./DB/SqlOperation');
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
app.get('/GetMonsters', function (req, response) {
    console.log('Called');
    const re = sqlOperation.getMonsters().then(res => {
        return res.recordset;
    });
    res.send(response)
});
app.get('/GetItems', function (req, response) {
    console.log('Called');
    const re = sqlOperation.getItems().then(res => {
        return res.recordset;
    });
    res.send(response)
});
app.get('/GetActions', function (req, response) {
    console.log('Called');
    const re = sqlOperation.getActions().then(res => {
        return res.recordset;
    });
    res.send(response)
});
app.get('/GetEncounters', function (req, response) {
    sqlOperation.getEncounters().then(res => {
        response.send(res);
    });
});
app.post('/GetEncounterID', function (req, response) {
    const EncounterID = req.body
    sqlOperation.getOneEncounter(EncounterID).then(res => {
        response.send(res.recordset)
    });

});
app.post('/Login', function (req, response) {
    const { username, password } = req.body;
    if (!username || !password) {
        return response.status(400).json({
            message: "Username or Password not present",
        })
    }
    else {
        sqlOperation.login(username, password).then(res => {
            if (res.recordset.length > 0) {
                response.send(res.recordset)
            }
            else {
                response.send({ message: 'There was no user' });
            }
        });
    }
});
//sqlOperation.getOneEncounter(3).then(res => {
//    console.log(res.recordset);
//    //response.send(res.recordset)
//});