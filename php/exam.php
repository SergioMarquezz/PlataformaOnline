<?php 

    
require_once "../core/main-bd.php";

$options = $_POST['option'];

switch($options){

    case "full name student":
        nameStudent();
    break;

    case "questions show":    
        showQuestions();
    break;

    case "title course":
        courseTitle();
    break;

    case "show answers":
        showAnswers();
    break;
}

function showQuestions(){

    try{

        $key_course = $_POST['key_course'];

        $show_question = "SELECT id_question,number_question,question
        FROM questions WHERE id_course = $key_course";

        $result_show_question = executeQuery($show_question);

        if($result_show_question){
            while($question = odbc_fetch_array($result_show_question)){
                $json_questions["all_questions"][] = array_map("utf8_encode", $question);
                $question_json= json_encode($json_questions);  
            }
            echo $question_json;
        }

    }catch(Exception $e){
        echo 'Excepción capturada (show Questions): ',  $e->getMessage(), "\n";
    }
}

function nameStudent(){
    
    try{

        $id_student = $_POST['student_id'];

        $full_name_student = "SELECT (name + ' '+last_name_pat+' '+last_name_mat) as full_name
        FROM persons WHERE id_person = $id_student";

        $result_full_name = executeQuery($full_name_student);

        if($result_full_name){
            $full_name = odbc_result($result_full_name,"full_name");
            echo utf8_encode($full_name);
        }

    }catch(Exception $e){
        echo 'Excepción capturada (name Student): ',  $e->getMessage(), "\n";
    }
}

function courseTitle(){
    
    try{

        $id_course = $_POST['id_course'];

        $title_course = "SELECT title FROM courses
        WHERE id_course = $id_course";

        $result_title_course = executeQuery($title_course);

        if($result_title_course){

            $course_title = odbc_result($result_title_course,"title");
            echo utf8_encode($course_title);
        }


    }catch(Exception $e){
        echo 'Excepción capturada (course Title): ',  $e->getMessage(), "\n";
    }
}

function showAnswers(){

    try{

        $course_key = $_POST['course_key'];
        $name_question = utf8_decode($_POST['name_question']);
        

        $show_answers = "SELECT ans.id_answers,ans.number_answers,ans.answer
        FROM answers ans, questions que
        WHERE que.id_question = ans.id_question AND ans.id_course = $course_key AND que.question = '$name_question'
        ORDER BY number_answers";

        $show_answers_result = executeQuery($show_answers);

        if($show_answers_result){
            while($ans = odbc_fetch_array($show_answers_result)){
                $answer_json["all_answers_question"][] = array_map("utf8_encode", $ans);
                $response_json= json_encode($answer_json);  
            }
            echo $response_json;
        }

    }catch(Exception $e){
        echo 'Excepción capturada (show Answers): ',  $e->getMessage(), "\n";
    }
}




?>