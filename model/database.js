const res = require('express/lib/response');
const mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "quiz_system",
  // password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database !");
});

const executeQuery = util.promisify(con.query).bind(con);

function registerStudent(user, callback){
  let query = `INSERT INTO students (name, email, phone, college, year, department) 
    VALUES (?,?,?,?,?,?)`;
  let values = [user['student-name'], user.email, user.phone, user.college, user.year, user.department ];

  con.query(query, values, (err, result, fields)=>{
    if(err){
      console.log(err.message);
      callback(null);
      return;
    }
    // console.log(result.insertId)
    callback(result.insertId);
  });
}

async function getUser(userID){
  let query = `SELECT *from students WHERE id = ?`;
  try{
    let res = await executeQuery(query, [userID]);
    // console.log(res[0]);
    return res[0];
  }catch(e){
    console.log(err.message);
    return;
  }
}

function addQuestion(question, callback){
  let query = `INSERT INTO questions (question, option_a, option_b, option_c, option_d, answer, level, category) 
    VALUES (?,?,?,?,?,?,?,?)`;
  let values = [question.question, question.options[0], question.options[1],
               question.options[2], question.options[3], 
               question.answer, question.level, question.category];

  con.query(query, values, (err, result, fields)=>{
    if(err){
      console.log(err.message);
      callback(null);
      return;  
    }
    // console.log(result.insertId)
    callback(result.insertId);
  });
}

function getQuestions(callback){
  let query = `SELECT id, question, option_a, option_b, option_c, option_d, level, category from questions`;
  con.query(query, (err, result, fields)=>{
    if(err){
      console.log(err.message);
      callback(null);
      return;
    }
    // console.log(result);
    callback(result);
  });
}

async function checkAnswer(qtnid, answer, callback){
  let query = `SELECT 
               (CASE WHEN answer = ? AND ( LEVEL = 'easy' OR LEVEL = '' )  THEN 1
                     WHEN answer = ? AND LEVEL = 'medium' THEN 2
                     WHEN answer = ? AND LEVEL = 'hard' THEN 3
                     ELSE 0 END ) AS isCorrect
               FROM questions WHERE id = ?`;
  
  let res = await executeQuery(query, [answer, answer, answer, qtnid])
  //  , (err, result, fields)=>{
    // if(err){
    //   console.log(err.message);
    //   callback(null);
    //   return;
    // }
    // console.log(fields);
    // console.log(res[0].isCorrect);
    // callback(result);
    return res[0].isCorrect;
  // });
}

function startCompetition(userID, competitionID, callback){
  let query = `INSERT INTO participants(student_id, competition_id)
               VALUES(?,?)`;
  con.query(query,[userID, competitionID], (err, result, fields)=>{
    if(err){
      console.log(err.message);
      callback(null);
      return;
    }
    // console.log(result);
    callback(result.insertId);
  }); 
}
function endCompetition(participantID, score, answers, callback){
  let query = `UPDATE participants SET end_date = CURRENT_TIMESTAMP, score = ?, answers = ?
                WHERE id = ?`;
  con.query(query, [score, JSON.stringify(answers), participantID], (err, result, fields)=>{
    if(err){
      console.log(err.message);
      callback(null);
      return;
    }
    // console.log(result);
    callback(result.insertId);
  }); 
}

async function getAllParticipants(){
  let query = "SELECT s.name AS NAME, s.email EMAIL, s.phone PHONE, s.year YEAR, s.department DEPARTMENT, \
                p.start_date AS START_TIME, p.end_date AS END_TIME, p.score SCORE, \
                (CASE WHEN p.start_date = p.end_date THEN 'PENDING' ELSE 'COMPLETED' END) AS isCompleted, \
                TIMESTAMPDIFF(MINUTE, p.start_date, p.end_date) AS TIME_TAKEN\
                FROM students s \
                JOIN participants p ON s.id = p.student_id \
                WHERE p.start_date != p.end_date \
                ORDER BY score DESC, p.end_date"
  let res = await executeQuery(query);
  // console.log(res);
  return res;
}

module.exports = { registerStudent, addQuestion, getQuestions, checkAnswer, getUser, startCompetition, endCompetition, getAllParticipants };