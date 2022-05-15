const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const database  = require('./database');
const authenciate = require('./authenciate');

router.use('/', authenciate);

router.get("/", (req, res)=>{
    res.sendFile("/views/quiz.html", {root: '.'});
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

function insertAllQuestions(questions, callback){
    let ids = []
    questions.forEach(question => {
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
        let s = await database.checkAnswer(parseInt(qtn.id), parseInt(qtn.selected));
        score += s;
    }
    console.log("Score: "+score);
    res.redirect("/quiz");
})

// router.get('/check',async (req, res)=>{
//     await database.checkAnswer(1, 1);
// })

module.exports = router;