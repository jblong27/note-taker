// requirements
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

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
        if (err) throw err;
        let json = JSON.parse(data);
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: uuid()
        }
        json.push(note);
        fs.writeFile("db/db.json", JSON.stringify(json, null, 2), (err) => {
            if(err) throw err;
            res.send("200");
        });
    });
});

// delete request
app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        let deleteId = req.params.id;
        let json = JSON.parse(data);
        json.forEach((item, i) => {
            if (item.id.includes(deleteId)) {
                json.splice(i, 1);
            }
        });
        fs.writeFile("db/db.json", JSON.stringify(json, null, 2), (err) => {
            if (err) throw err; 
            res.send("200");
        });
    });
});

// routing
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });