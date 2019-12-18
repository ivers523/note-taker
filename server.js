
// base server template c/o class activites
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const notesData = getNotes();

function getNotes() {
    let data = fs.readFileSync('./db/db.json', 'utf8');

    let notes = JSON.parse(data);

    for (let i = 0; i < notes.length; i++) {
        notes[i].id = '' + i;
    }

    return notes;
}

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
// these two are likely the same ^ v
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request to display notes
app.get("/api/notes", function (req, res) {
  notesData = getNotes();
  res.json(notesData);
});

// Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// will need to parse JSON (happens up above)
// POST request

  // note data is passed from front end via request body (c/o middleware)
app.post("/api/notes", function (req, res) {
  notesData.push(req.body);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesData), 'utf8');
  res.json(true);
});

  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
