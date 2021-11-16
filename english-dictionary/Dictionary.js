const express = require('express');
const app = express();
const path = require("path");
const mysql = require('mysql');
const word = require('./words');
const port = 2021;

app.use(express.urlencoded());

///////////sql connection start///////////
const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: "root",
    password: "root",
    database: "entries",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected to database");
    }
    else {
        console.log("Connection Failed");
        console.log(err);
    }
});
///////////sql connection end///////////

//file loaders
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/views/dict.html"));
});
app.get("/dict.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/dict.js"));
});
app.get("/dict.css", function (req, res) {
    res.sendFile(path.join(__dirname, "/css/dict.css"));
});

//post action
app.post('/search', function (req, res) {
    var wordToSearch = req.body.word;

    word.searchWord(mysqlConnection, wordToSearch, function (err, result) {
        res.send(result);
    });
})

app.listen(port, () => console.log("listening on port " + port));