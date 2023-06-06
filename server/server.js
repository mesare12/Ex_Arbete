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
    sqlOperation.getMonsters().then(res => {
        response.send(res.recordset);

    });
});
app.get('/GetItems', function (req, response) {
    sqlOperation.getItems().then(res => {
        response.send(res.recordset);
    });
});
app.get('/GetSpeed', function (req, response) {
    sqlOperation.getSpeed().then(res => {
        response.send(res.recordset);
    });
});
app.get('/GetLoot', function (req, response) {
    sqlOperation.getLoot().then(res => {
        response.send(res.recordset);
    });
});
app.get('/GetActions', function (req, response) {
    sqlOperation.getActions().then(res => {
        response.send(res.recordset);
    });
});
app.get('/GetMonsterActions', function (req, response) {
    sqlOperation.getMonsterAction().then(res => {
        response.send(res.recordset);
    });
});
app.get('/GetEncounters', function (req, response) {
    sqlOperation.getEncounters().then(res => {
        response.send(res.recordset);

    });
});
app.post('/GetSkills', function (req, response) {
    const { id } = req.body;
    sqlOperation.getSkills(id).then(res => {
        response.send(res.recordset);
    });
});

app.get('/GetSkillSets', function (req, response) {
    sqlOperation.getSkillSets().then(res => {
        response.send(res.recordset);
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
app.post('/AddEncounter', function (req, response) {
    sqlOperation.createEncounter(req.body).then(res => {
        response.send('done');
    });
});
app.post('/AddSkillSet', function (req, response) {
    const { ID, SkillFK } = req.body;
    sqlOperation.AddSkillSet(ID, SkillFK).then(res => {
        response.send('done');
    });
});
app.post('/AddMonster', function (req, response) {
    sqlOperation.createMonster(req.body).then(res => {
        response.send('done');
    });
});

