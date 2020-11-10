const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Set PORT to 8080
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/apiRoutes")(app);
app.use("/api", apiRoutes);

require("./routes/htmlRoutes")(app);
app.use(htmlRoutes)


// The below code effectively "starts" our server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  