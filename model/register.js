const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { format } = require('path');
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const { registerStudent }  = require('./database');

router.get("/",(req, res)=>{
    res.sendFile("/views/register.html", { root: '.'});
})

router.post("/", (req, res)=>{
    console.log(req.body);
    let registerData = req.body;
    registerStudent(registerData);
})

module.exports = router;