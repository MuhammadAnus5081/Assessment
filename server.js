const cors = require("cors");
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const http = require('http').Server(app);
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const server = require('http').Server(app);
const session = require('express-session');
const multer = require('multer');
const routes = require('./src/routes/index');
routes(app);
const item = require ('./src/routes/itemRoute');
const fileupload =require('./src/routes/index');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use('/', fileupload)
app.use('/', item );
// FileRead
const fs = require('fs');

function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error); // Reject the promise if there is an error
      } else {
        resolve(data); // Resolve the promise with the file contents
      }
    });
  });
}

module.exports = readFileAsync;


//
const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://anas:anas123@cluster0.1moqjmp.mongodb.net/?retryWrites=true&w=majority')
  }
  catch (error) {
      console.log("Databse Error : ", error)
  }
}

const db =   mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
  console.log("Connected successfully");

});


app.use(cors(corsOptions));

//const initRoutes = require("./src/routes");

//app.use(express.urlencoded({ extended: true }));
//initRoutes(app);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
