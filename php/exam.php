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

    case "insert detail":
        insertDetail();
    break;

    case "resultado exam":
        resultExamen();
    break;

    case "question answers exam":
        showQuestionAnswersExam();
    break;

    case "yours answers exam":
        yourAnwers();
    break;

    case "show video course":
        showVideoExam();
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

function resultExamen(){

    try{

        $course_id = $_POST['course_id'];

        $select_answer_questions = "SELECT 'total', COUNT(*) AS resultado
        FROM questions WHERE id_course = $course_id
        UNION
        SELECT 'incorrect', COUNT(*)
        FROM answers_corrects anscor, detail_questions detail, answers ans
        WHERE ans.id_answers = detail.id_answers AND anscor.correct_answer <> ans.number_answers
        AND anscor.id_question = detail.id_question AND detail.id_course = $course_id
        UNION
        SELECT 'correct', COUNT(*)
        FROM answers_corrects anscor, detail_questions detail, answers ans
        WHERE ans.id_answers = detail.id_answers AND anscor.correct_answer = ans.number_answers
        AND anscor.id_question = detail.id_question AND detail.id_course = $course_id";

        $result_select = executeQuery($select_answer_questions);

        if($result_select){
            while($result = odbc_fetch_array($result_select)){

                
                $json_resultados["resultados"][] = array_map("utf8_encode", $result);
                $resultados_json = json_encode($json_resultados);  
            }
            echo $resultados_json;
        }

    }catch(Exception $e){
        echo 'Excepción capturada (result Examen): ',  $e->getMessage(), "\n";
    }
}

function showQuestionAnswersExam(){

    try{

        $clave_course = $_POST['clave_course'];

        $query_question_answers = "SELECT que.question, ans.answer
        FROM questions que, answers ans, answers_corrects corre
        WHERE corre.id_question = que.id_question AND ans.id_question = corre.id_question
        AND ans.number_answers = corre.correct_answer AND que.id_course = $clave_course";

        $result_question_answers = executeQuery($query_question_answers);

        if($result_question_answers){
            while($question_answers = odbc_fetch_array($result_question_answers)){
                $json_question_answer["questions_answers"][] = array_map("utf8_encode", $question_answers);
                $question_answer_json = json_encode($json_question_answer);  
            }
            echo $question_answer_json;
        }


    }catch(Exception $e){
        echo 'Excepción capturada (show Question AnswersExam): ',  $e->getMessage(), "\n";
    }
}

function yourAnwers(){

    try{

        $course_clave = $_POST['course_clave'];
        $person = $_POST['person_id'];
        $opor = $_POST['oportunity'];

        $query_your_answer = "SELECT que.question, ans.answer, ans.number_answers AS answer_student,anscor.correct_answer
        FROM answers_corrects anscor, detail_questions detail, answers ans, questions que
        WHERE anscor.id_question = detail.id_question AND ans.id_answers = detail.id_answers 
        AND que.id_question = detail.id_question AND detail.id_course = $course_clave AND detail.oportunity = $opor AND detail.id_person = $person
        ORDER BY que.id_question";
        

        $result_your_answer = executeQuery($query_your_answer);

        if($result_your_answer){
            while($your_answer = odbc_fetch_array($result_your_answer)){
                $json_yout_answer["your_answers"][] = array_map("utf8_encode", $your_answer);
                $your_anwer_json = json_encode($json_yout_answer);  
            }
            echo $your_anwer_json;
        }

    }catch(Exception $e){
        echo 'Excepción capturada (your Anwers): ',  $e->getMessage(), "\n";
    }
}

function showVideoExam(){

    try{

        $course_video = $_POST["key_course_video"];

        $query_video = "SELECT vide.url_video, vide.duration_video
        FROM courses cour, video_url vide
        WHERE cour.id_url_main = vide.id_url AND cour.id_course = $course_video";

        $result_video = executeQuery($query_video);

        if($result_video){

            $video = odbc_result($result_video,"url_video");
            echo utf8_encode($video);
        }

    }catch(Exception $e){
        echo 'Excepción capturada (show Video Exam): ',  $e->getMessage(), "\n";
    }
}


function insertDetail(){

    try{

        $course = $_POST['course'];
        $answer = $_POST['answer'];
        $question = $_POST['question'];
        $person = $_POST['person'];
        $oportunity = $_POST['oportunity'];

        $insert_detail = "INSERT INTO detail_questions(id_course,id_answers,id_question,id_person,oportunity)
        VALUES($course,$answer,$question,$person,$oportunity)";

        $result_insert_detail = executeQuery($insert_detail);

        if($result_insert_detail){

            //TODO:pendiente de revisar porque talvez no sea necesario
            $update_oportunity = "UPDATE persons SET oportunity_exam = $oportunity WHERE id_person = $person";
            executeQuery($update_oportunity);
        }

    }catch(Exception $e){
        echo 'Excepción capturada (insert Detail): ',  $e->getMessage(), "\n";
    }
}




?>