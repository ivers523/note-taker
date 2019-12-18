
// base server template c/o class activites
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const noteData = require("./db/db.json");
    
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app middleware to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// Basic routes that get index and notes HTML
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request to display notes
app.get("/api/notes", function (req, res) {
  res.json(noteData);
});


app.post("/api/notes", function (req, res) {
    noteArray = [];
    newNote = req.body;
    function getData() {
        fs.readFile("./db/db.json", "utf8", function (error, res) {
            if (error) {
                console.log(error);
            }
            noteArray = JSON.parse(res)
            writeData();
        });
    } getData()

    function writeData() {
        noteArray.push(newNote)
        for (let i = 0; i < noteArray.length; i++) {
            note = noteArray[i]
            note.id = i + 1
        }
        
        fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("note created");
        });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));

});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
