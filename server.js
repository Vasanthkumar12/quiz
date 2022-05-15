const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');	//To Acquire it
app.use(session({   		//Usuage
    secret: 'cse@nsit.edu.in',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

const port = 8080;

const register = require("./model/register");
app.use("/register",register);

app.use("/assets",express.static("assets"));
// app.use("/",express.static("views"));
// app.use(express.json());
// app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get("/quiz", (req, res)=>{
    res.sendFile(__dirname+"/views/quiz.html");
})

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/views/register.html");
})


app.post("/quiz", (req, res)=>{
    console.log(req.body);
    res.redirect("/quiz");
    
})

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
})

