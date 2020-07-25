// requirements
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const app =  express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get requests below
app.get("api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", function(err, contents) {
        var words = JSON.parse(contents);
        res.send(words);
    });
});