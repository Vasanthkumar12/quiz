const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const database  = require('./database');
const authenciate = require('./authenciate');
const { append } = require('express/lib/response');
const { route } = require('./register');

router.use('/', authenciate);

router.get("/", (req, res)=>{
    res.sendFile("/views/quiz.html", {root: '.'});
})

router.get("/instructions", (req, res)=>{
    res.sendFile("/views/instruction.html", {root: '.'});
})

router.get("/getAllQuestions", (req, res)=>{
    database.getQuestions((qtns)=>{
        if(qtns){
            res.json(qtns);
        }else{
            res.json({"error": "Unable to retrieve Questions"});
        }
    });
})
router.get("/start",(req,res)=>{
    let userID = req.session.userID;
    database.startCompetition(userID, 0, (participantID)=>{
        if(participantID){
            req.session.participantID = participantID;
            res.redirect("/quiz");
        }else{
            res.json({"error": "Cannot Start Competition."});
        }
    })
})
// router.get("/insert",(req,res)=>{
//     let level1 = require("../data/Level_3.json");
//     insertAllQuestions(level1, (ids)=>{
//         console.log(ids);
//     });
// })

function insertAllQuestions(questions, callback){
    let ids = []
    questions.forEach(question => {
        question.level = 'hard';
        question.category = 'Programming';
        database.addQuestion(question, (res)=>{
            if(res){
                console.log("Inserted");
                ids.push(res);
            }else{
                callback(null);
            }
        })
    });
    callback(ids);
}

router.post("/", async (req, res)=>{
    let answerSheet = req.body.qtn
    console.log(answerSheet);
    let score = 0;
    for(let i = 0; i<answerSheet.length; i++){
        let qtn = answerSheet[i];
        if(!qtn.selected){
            qtn.selected = -1;
        }
        let s = await database.checkAnswer(parseInt(qtn.id), parseInt(qtn.selected)+1);
        score += s;
    }
    let participantID = req.session.participantID;
    database.endCompetition(participantID, score, (res)=>{
        console.log("Student completed "+res)
    });
    console.log("Score: "+score);
    res.redirect("/thank");
    req.session.destroy();
})

// router.get('/check',async (req, res)=>{
//     await database.checkAnswer(1, 1);
// })

module.exports = router;