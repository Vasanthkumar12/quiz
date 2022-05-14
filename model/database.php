<?php 
 $sql_DB_user = "root";
 require_once("Student.php");
try {
    $conn = new PDO("mysql:host=localhost;dbname=quiz",  $sql_DB_user);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
            
}
function query($query){
    global $conn;
    $stmt =  $conn->prepare($query);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    return $stmt;
}

function registerStudent(Student $student){
    global $conn;
    $query = "INSERT INTO students(student_name, email_id, dob, college_name)
     VALUES(:name,:email,:dob,:college)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":name", $student->studentName);
    $stmt->bindParam(":email", $student->emailId);
    $stmt->bindParam(":dob", $student->DOB);
    $stmt->bindParam(":college", $student->collegeName);
    $stmt->execute();
    if($stmt->rowCount() == 1){
        return true;
    }else{
        return false;
    }
}

function startCompetition($Student){
    global $conn;
    $query = "INSERT INTO competition_participants(student_id)
     VALUES(:id)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $student->id);
    $stmt->execute();
    if($stmt->rowCount() == 1){
        return true;
    }else{
        return false;
    }
}

function endCompetition($id, $question_attended, $question_correct){
    global $conn;
    $query = "UPDATE competition_participants SET end_date = :end, 
    questions_attended = :attended, questions_correct = :correct WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":attended", $question_attended);
    $stmt->bindParam(":correct", $question_correct);
    $stmt->execute();
    if($stmt->rowCount() == 1){
        return true;
    }else{
        return false;
    }
}

function checkAnswer($qtn){
    global $conn;
    $query = "SELECT 
        CASE answer = :answer THEN 1
        ELSE 0 AS isCorrect
     FROM questions WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $qtn->questionId);
    $stmt->execute();

}

function calculateEndCompetition($student_answers){
    foreach($ans as $student_answers){

    }
}

?>