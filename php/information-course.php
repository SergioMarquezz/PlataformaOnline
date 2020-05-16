<?php

    require_once "../core/main-bd.php";


    $identify = $_POST['option'];

    switch($identify){

        case "modules":
            modulesCourse();
        break;

        case "signed up":
            signedUp();
        break;

        case "url":
            urlSignedUp();
        break;

        case "registry student course":
            registryStudentCourse();
        break;

        case "update student":
            updateStudents();
        break;

        case "all themes course":
            allThemesCourse();
        break;
    }
  
    //Funcion para mostrar los modulos del curso
    function modulesCourse(){

        $id = $_POST['id_course'];

        try{

            $query_modules = "SELECT id_module, name
            FROM modules
            WHERE id_course = $id";

            $result_modules = executeQuery($query_modules);

            if($result_modules){

            while($module = odbc_fetch_array($result_modules)){

                $json_modules["modules"][] = array_map("utf8_encode", $module);
                $modules_json= json_encode($json_modules); 
            }

            if(!isset($modules_json)){

                echo json_encode("without modules");
            }
            else{
                echo  $modules_json;
            }
        }

        }catch(Exception $e){

            echo 'Excepción capturada 18: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para saber que cursos esta inscrito
    function signedUp(){

        $number = $_POST['num'];
        $pass = $_POST['password'];
        $title = $_POST['title'];

        $utf_title = utf8_decode($title);

        try{

            $sql_course_up = "SELECT DISTINCT cour.id_course, title
            FROM detail_course 
            INNER JOIN persons p ON detail_course.id_person = p.id_person
            INNER JOIN courses cour ON detail_course.id_course = cour.id_course
            WHERE p.number_employee = $number AND p.password = '$pass' AND title = '$utf_title'";

            $result_course_up = executeQuery($sql_course_up);

            if($result_course_up){

                $id = odbc_result($result_course_up,"id_course");
                $name = odbc_result($result_course_up,"title");

                $utf = utf8_encode($name);

                $json_course_up["signed_up"] = array("id"=>$id,"title"=>$utf);
                $course_up_json= json_encode($json_course_up);
            
                echo  $course_up_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 19: ',  $e->getMessage(), "\n";
        }

    }

    //Funcion para mostrar video, estudiantes
    function urlSignedUp(){

        $id_course = $_POST['key_course'];

        try{

            $sql_url = "SELECT vide.url_video, cour.signed_student
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url AND cour.id_course = $id_course";

            $result_url = executeQuery($sql_url);

            if($result_url){

                $students = odbc_result($result_url,"signed_student");
                $url_video = odbc_result($result_url,"url_video");
                $utf8_url_video = utf8_encode($url_video);

                $json_url["url_singned"] = array("students"=>$students, "url"=>$utf8_url_video);
                $url_json= json_encode($json_url);
            
                echo  $url_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 20: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para registrar al alumno inscrito en el curso
    function registryStudentCourse(){

        try{

            $id_student = $_POST['key_stundet'];
            $id_course = $_POST['key_course'];

            $sql_registry = "INSERT INTO detail_course(id_person, id_course)
                             VALUES($id_student, $id_course)";

            $exec_registry = executeQuery($sql_registry);

            if($exec_registry){

                $msj['msj'] = "student registry";
                echo json_encode($msj);

            }else{
                echo "Row insertion failed.\n";  
            }

        }catch(Exception $e){

            echo 'Excepción capturada (registry student): ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para obtener los alumnos registrados en el curso
    function studentRegistry($key){

        try{

            $query_student = "SELECT signed_student
                              FROM courses cour 
                              WHERE id_course = $key";

            $result_student = executeQuery($query_student);

            if($result_student){

                $student = odbc_result($result_student,"signed_student");

                if($student == 0){

                    $new_student = 1;
                }

                else{
                    $new_student = $student + 1;
                }

                return $new_student;
            }

        }catch(Exception $e){

            echo 'Excepción capturada (select student): ',  $e->getMessage(), "\n";

        }
    }

    //Funcion para actulalizar los estudiantes registrados en el curso
    function updateStudents(){

        try{

            $key_course = $_POST['course_id'];

            $new_registry = studentRegistry($key_course);

            $query_update_student = " UPDATE courses SET signed_student = $new_registry
                                      WHERE id_course = $key_course";

            $update_student = executeQuery($query_update_student);

            if($update_student){

                $message['message'] = "student update";
                echo json_encode($message);
            }

            else{
                echo "Row insertion failed.\n";  
            
            }


        }catch(Exception $e){

            echo 'Excepción capturada (update student): ',  $e->getMessage(), "\n";

        }
    }
    function allThemesCourse(){

        try{

            $keys_course = $_POST['course_key'];

            $all_themes = "SELECT name FROM themes
                            WHERE id_course =  $keys_course";

            $result_all_themes = executeQuery($all_themes);
            
            if($result_all_themes){
                while($themes_all = odbc_fetch_array($result_all_themes)){
                    $json_all_themes["all_themes_course"][] = array_map("utf8_encode", $themes_all);
                    $all_themes_json = json_encode($json_all_themes);
                }
                echo  $all_themes_json;
            }

        }catch(Exception $e){
            echo 'Excepción capturada (all Themes Course): ',  $e->getMessage(), "\n";
        }
    }

?>