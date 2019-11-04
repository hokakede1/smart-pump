const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const port = 8080;
const userController = require("./controllers/userController");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "checking",
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.static(`${__dirname}/../build`));

//login
app.post("/login", userController.login);

//fetch data
app.get("/data", userController.getUserData);

//transactions
app.get("/transactions", userController.getTransactions);

app.get("/logout", userController.logout);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(8080, () => {
  console.log("server is running on port", port);
});
