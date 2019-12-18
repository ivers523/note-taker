
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

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request to display notes
app.get("/api/notes", function (req, res) {
  let note = res.json(noteData);
  console.log(note);
});

// POST request
  // note data is passed from front end via request body (c/o middleware)
app.post("/api/notes", function (req, res) {
  noteData.push(req.body);
  fs.writeFileSync('./db/db.json', JSON.stringify(noteData), 'utf8');
  res.json(true);
});



  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
