const express = require('express')
const router = express.Router()
const database  = require('./database');

router.use('/',async (req, res, next) => {
    // console.log(req.session.id);
    let session = req.session;
    if(session.userID && session.name && session.email){
        let user = await database.getUser(req.session.userID);
        // console.log(session);
        if(user && user.name == session.name && user.email == session.email){
            // console.log(user);
            next();
        }else{
            res.statusCode = 403;
            res.json({"error": "Illegal Access."});
        }   
    }else{
        res.statusCode = 403;
        res.json({"error":"Not Registered"});
    }
})

module.exports = router;