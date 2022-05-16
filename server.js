
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');	//To Acquire it
const { sessionConfig } = require('./config/session');
const userSession = session(sessionConfig);
app.use(userSession);

const port = 80;

const register = require("./model/register");
const quiz = require("./model/quiz");
app.use("/register",register);
app.use("/quiz",quiz);

app.use("/assets",express.static("assets"));
// app.use("/",express.static("views"));
// app.use(express.json());
// app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res)=>{
    console.log(req.session.id)
    res.sendFile(__dirname+"/views/register.html");
})


app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
})

