<?php 

class Student{
    public $id;
    public $studentName;
    public $emailId;
    public $DOB;
    public $collegeName;

    public function __construct($id, $studentName, $emailId, $DOB, $collegeName)
    {
            $this->id = $id;
            $this->DOB = $DOB;
            $this->$emailId =$emailId;
            $this->studentName = $studentName;
            $this->collegeName = $collegeName;
    }
}

?>