
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

// Sets up the Express app middleware to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// Basic routes that get index and notes HTML
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request to display notes
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));;
});

// POST function
// Data is passed from front end via req.body (middleware)

app.post("/api/notes", function (req, res) {
  let noteArray = [];
  newNote = req.body;
  function getData() {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
      if (error) {
        console.log(error);
      } else {
        noteArray = JSON.parse(data);
        writeData();
      }

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

// delete function

app.delete("/api/notes:id", function (req, res) {
  let noteArray = []; //?
  const deleteId = req.params.id;
  console.log(`Deleting note: ${deleteId}`);
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    noteArray = JSON.parse(data); //?
    if (error) {
      console.log(error);
    } else { 
      handleSplice();
      // splice function c/o https://stackoverflow.com/questions/42178777/how-can-i-return-an-object-out-of-an-array
    } 
   function handleSplice() {  
      for (let i = 0; i < noteArray.length; i++) {
        if (noteArray[i] === deleteId) {
            noteArray.splice(i, 1); // ??
            console.log(noteArray);
          // you can also use Array.prototype.splice() to remove an item from an array:
          // data.splice(i, 1);
        }
      }
    } rewriteData();

    // // rewrite noteArray
    function rewriteData() {
      fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {

        if (err) {
          return console.log(err);
        }
        console.log("data rewritten");
      });
    }
  });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
