<?php

        require_once "../core/main-bd.php";
    

       $key = $_POST['option'];

        switch($key){

                case "list courses":
                        showCourses();
                break;

                case "insert questions":
                        insertQuestions();
                break;

                case "insert answer":
                        insertAnswers();
                break;

                case "answer correct":
                        saveAnswerCorreect();
                break;

                case "verify modules":
                        modulesCourse();
                break;
        }

        function showCourses(){

                $query_courses = "SELECT id_course, title
                                FROM courses";$result_courses = executeQuery($query_courses);

                if($result_courses){

                        while($courses = odbc_fetch_array($result_courses)){

                        $json_courses["courses"][] = array_map("utf8_encode", $courses);
                        $courses_json = json_encode($json_courses);  

                        }

                        echo $courses_json;
                }
        }

        function insertQuestions(){

                $number_question = $_POST['question_number'];
                $question = $_POST['question'];
                $key_course = $_POST['id_course'];

                $utf_8_question = utf8_decode($question);

                $insert_question = "INSERT INTO questions(number_question,question,id_course)
                                VALUES('$number_question','$utf_8_question','$key_course')";

                $result_insert_question = executeQuery($insert_question);

                if($result_insert_question){

                        echo "question save";
                }
        }

        function insertAnswers(){

                $number_answer = $_POST['number_answer'];
                $answer = $_POST['answer'];
                $id_question = latestQuestion();
                $id_course = $_POST['key_course'];

                $utf_8_answer = utf8_decode($answer);

                $insert_answers = "INSERT INTO answers(number_answers,answer,id_question,id_course)
                                VALUES('$number_answer','$utf_8_answer','$id_question','$id_course')";

                $result_insert_answer = executeQuery($insert_answers);

                if($result_insert_answer){

                        echo "save answers";
                }
                
              
                
        }

        function latestQuestion(){


                $query_latest = "SELECT MAX(id_question) AS ultima_pregunta
                                FROM questions";

                $result_latest = executeQuery($query_latest);

                if($result_latest){

                        $latest_question = odbc_result($result_latest,'ultima_pregunta');

                        return $latest_question;
                }
        }

        function keyQuestion($question){

                $query_id_question = "SELECT id_question
                                FROM questions
                                WHERE question = '$question'";

                $result_id_question = executeQuery($query_id_question);

                if($result_id_question){

                        $key_question = odbc_result($result_id_question,"id_question");

                        return $key_question;
                }
        }

        function numberAnswerCorrect($answers){

              
                $question_key = keyQuestion($answers);
                $respuesta = utf8_decode($_POST['respuesta']);

                $query_number_correct = "SELECT number_answers
                                        FROM answers
                                        WHERE id_question = $question_key AND answer = '$respuesta'";

                $result_number_correct = executeQuery($query_number_correct);

                if($result_number_correct){

                        $number_answer = odbc_result($result_number_correct,"number_answers");

                        return $number_answer;
                }
        }

        function saveAnswerCorreect(){

                
                $answers = utf8_decode($_POST['text_answer']);
                $question_key = keyQuestion($answers);
                $correct_answer =  numberAnswerCorrect($answers);

               $insert_answer_correct = "INSERT INTO answers_corrects(id_question,correct_answer)
                                        VALUES($question_key,$correct_answer)";

                $result_answer_correct = executeQuery($insert_answer_correct);

                if($result_answer_correct){

                        echo "ok";
                }
        }

        function modulesCourse(){

                try{
        
                    $key_course = $_POST['key'];
        
                    $information_modules = "SELECT name,id_module 
                                            FROM modules 
                                            WHERE id_course = $key_course";
        
                    $result_modules = executeQuery($information_modules);
        
                    if($result_modules){
        
                        while($modules = odbc_fetch_array($result_modules)){
        
                            $json_modules["course_modules"][] = array_map("utf8_encode", $modules);
                            $modules_json = json_encode($json_modules);  
                        }
        
                        if(!isset($modules_json)){
        
                            echo "sin modulos"; 
                        }
                        else{
        
                            echo $modules_json;
                        }
                    }
        
                }catch(Exception $e){
        
                    echo 'Excepción capturada (modules Course): ',  $e->getMessage(), "\n";
                }
            }
        

?>