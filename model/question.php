<?php 

class Question{
    public $questionId;
    public $option_a;
    public $option_b;
    public $option_c;
    public $option_d;
    public $answer;
    public $level;
    public $category;
    public function __construct($questionId,
     $answer = "",
     $option_a = "",
     $option_b = "",
     $option_c = "",
     $option_d = "",
     $level = "",
     $category = ""){
        $this->questionId = $questionId;
        $this->option_a = $option_a;
        $this->option_b = $option_b;
        $this->option_c = $option_c;
        $this->option_d = $option_d;
    }
}

?>