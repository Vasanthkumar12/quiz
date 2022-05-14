<?php 
 $sql_DB_user = "root";
try {
    $conn = new PDO("mysql:host=localhost;dbname=quiz",  $sql_DB_user);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
            
}

class QuizEntity{
    public function query($query){
        
    }
}

?>