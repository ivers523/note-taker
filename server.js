// base server template c/o class activites

// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// (DATA)
// =============================================================

// Routes
// =============================================================

// Basic routes that get index and notes HTML
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET notes
app.get("/api/notes", function(req, res){
  fs.readFile('db/db.json', 'utf8', function(err, data){
      if(err){
          console.log(err)
          return
      }
      res.send(data);
  });
});

// Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// POST request


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
