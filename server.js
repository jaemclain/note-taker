const express = require("express");
const path = require("path");
const fs = require("fs");
const { response } = require("express");


// Express Server Setup
const app = express();

// Port Setup
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes API & HTML
// require("./Develop/routes/apiRoutes")(app);
// require("./Develop/routes/htmlRoutes")(app)

var notesArr = [];

// Route Index
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Returns notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});


// GET ROUTE - ALL notes
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) {
      throw err
    }
  })
  return response.json(JSON.parse(data));
});


// GET Request - ID
app.get("/api/notes/:id", function (req, res) {
  res.json(notes[req.params.id]);
});



// POST ROUTE - Create New Note
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  newNote.id = noteId;
  notes.push(newNote);
  fs.writeFile("./db/db.json", `[${notesArr}]`, 'utf-8', function (err) {
    if (err) {
      throw err
    } return response.json(request.body);
  })
});


// Delete Note
app.delete("/api/notes/:id", function (req, res) {
  var sorting = req.params.id;

  fs.readFile("./db/db.json", function(err,data){
    if(err){
      throw err
    }
    var notesHistory = JSON.parse(data);
    for(let i=0; i < notesArr.length; i++) {
      if(sorting == notesHistory[i].id){
        notesArr.splice(i,1)
        fs.writeFile("./db/db.json",`[${notesArr}]`, 'utf-8', function(err){
          if(err){
            throw err
          }return
        })
      }
    }
    })
    response.end()
  });


  // Starts the server
  app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });
