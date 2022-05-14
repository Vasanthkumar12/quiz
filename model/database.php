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

function registerParticipant($Student){
    
}

?>