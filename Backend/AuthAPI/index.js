//Importing packages
import express from "express";

//Express sestup
const app = express();

//Variables
const PORT = 8080;

//Get endpoint
app.get("/", (req, res) => {
  res.status(401).send("REQUEST ERROR: PLEASE ENTER API KEY.");
});

//Notfound error handling
const notFound = (req, res) => {
  res.status(404).send("REQUEST ERROR: The page you requested was not found.");
};
app.use(notFound);

//Listen server on port
app.listen(PORT, () => {
  console.log("server online!");
});
