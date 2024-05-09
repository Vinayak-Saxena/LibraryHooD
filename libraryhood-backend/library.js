require("dotenv").config();
 
const express = require("express");

const mongoose = require("mongoose");

const libraryRoutes = require("./Router/libraryRoutes.js");
const bookRoutes = require("./Router/bookRoutes.js");
const userRoutes = require("./Router/user.js");
const donateRoutes = require("./Router/donateRoutes.js");
const issuereturnRoutes = require("./Router/issuereturnRoutes.js");


const app = express();
const cors = require("cors");


app.use(cors()); 

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// routes
app.use("/api/library", libraryRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/user", userRoutes);
app.use('/api/donation', donateRoutes);
app.use('/api/records', issuereturnRoutes);


// connecting to mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });

