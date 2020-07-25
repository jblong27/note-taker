// requirements
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const app =  express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get request below
app.get("api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", function(err, contents) {
        var words = JSON.parse(contents);
        res.send(words);
    });
});

// post request
app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
        if(err) throw err;
        let json = JSON.parse(data);
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv1()
        }
        json.push(note);
        fs.writeFile("db/db.json", JSON.stringify(json, null, 2), (err) => {
            if(err) throw err;
            res.send("200");
        });
    });
});