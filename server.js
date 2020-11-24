const express = require("express");
const path = require("path");
const fs = require("fs");



// Express Server Setup
const app = express();

// Port Setup
var PORT = process.env.PORT || 3000;

var notesArr = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// Route Index
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "./public/index.html"));
})

// Returns notes.html
app.get("/notes", function (request, response) {
  response.sendFile(path.join(__dirname, "./public/notes.html"));
})


// GET ROUTE - ALL notes
app.get("/api/notes", function (request, response) {
  fs.readFile("./db/db.json", function (err, data){
    if(err){
      throw err
    }
    return response.json(JSON.parse(data));
  })
})


// POST ROUTE - Create New Note
app.post("/api/notes", function (request, response) {
  request.body["id"] = notesArr.length + 1;
  var newNote = JSON.stringify(request.body);
  // newNote.id = noteId;
  notesArr.push(newNote);

  fs.writeFile("./db/db.json", `[${notesArr}]`, 'utf-8', function (err) {
    if (err) {
      throw err
    } 
    return response.json(request.body);
  })
});


// Delete Note
app.delete("/api/notes/:id", function(request, response){
  var sorting = req.params.id;

  fs.readFile("./db/db.json", function(err, data){
    if (err){
      throw err
    }

    var notesHistory = JSON.parse(data);
    
    for(let i = 0; i < notesArr.length; i++){
      if(sorting == notesHistory[i].id){
        notesArr.splice(i, 1)

        fs.writeFile("./db/db.json", `[${notesArr}]`, 'utf-8', function(err){
          if (err) {
            throw err
          }
          return
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
