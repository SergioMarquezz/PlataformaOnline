<?php

    require_once "../core/main-bd.php";

    $op = $_POST["opition"];
    
    switch($op){

        case "information":
            videoAndLessons();
        break;

        case "modules course":
            modulesCourse();
        break;

        case "themes course":
            themesCourse();
        break;

        case "show video":
            showVideos();
        break;

        case "material course":
            showMaterial();
        break;

        case "update detail":
            modulesNull();
        break;

        case "show all videos":
            showAllVideos();
        break;
    }

    //Funcion para mostrar total de clases y estudiantes totales del curso
    function videoAndLessons(){

        try{

            $key = $_POST['key_video'];

            $query_lessons = "SELECT cour.total_lessons, cour.signed_student, vide.url_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url AND cour.id_course = $key";

            $result_lessons = executeQuery($query_lessons);

            if($result_lessons){

                $lessons = odbc_result($result_lessons,"total_lessons");
                $students = odbc_result($result_lessons,"signed_student");
                $video = utf8_encode(odbc_result($result_lessons,"url_video"));

                $json_lessons["lessons"] = array("total_lessons"=>$lessons, "url"=>$video, "students"=>$students);
                $lesson_json= json_encode($json_lessons);
                
                echo  $lesson_json;
            }

        }catch(Exception $e){
            echo 'Excepción capturada 18: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para mostrar los modulos del curso 
    function modulesCourse(){

        $key_course = $_POST['key_course'];

        try{

            $query_modules_course = "SELECT id_module, name
                                     FROM modules
                                     WHERE id_course = $key_course";

            $result_modules_course = executeQuery($query_modules_course);

            if($result_modules_course){

                while($modules_course = odbc_fetch_array($result_modules_course)){

                    $json_modules["modules_course"][] = array_map("utf8_encode", $modules_course);
                    $json= json_encode($json_modules);  
                }

                echo $json;
            }

        }catch(Exception $e){
            echo 'Excepción capturada 19: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para mostrar los temas del curso
    function themesCourse(){

        $id_course = $_POST['course_id'];
        $module = $_POST['id_module'];

        try{

            $sql_themes = "SELECT id_themes, name
                           FROM themes
                           WHERE id_course = $id_course AND id_module = $module";

            $result_themes = executeQuery($sql_themes);

            if($result_themes){

                while($themes = odbc_fetch_array($result_themes)){

                    $json_themes["themes_course"][] = array_map("utf8_encode", $themes);
                    $themes_json= json_encode($json_themes);  
                }

                if(!isset($themes_json)){

                    echo json_encode("without themes");
                }
                else{
                    echo $themes_json;
                }

               
            }

        }catch(Exception $e){
            echo 'Excepción capturada 20: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para mostrar los videos de cada tema
    function showVideos(){

        try{

            $id_themes = $_POST['key_theme'];

            $query_videos = "SELECT url_video, duration_video
                             FROM video_url
                             WHERE id_themes = $id_themes";

            $result_videos = executeQuery($query_videos);

            if($result_videos){

                $url = utf8_encode(odbc_result($result_videos, "url_video"));
                $duration = odbc_result($result_videos,"duration_video");

                $data['videos'] = array('video' => $url, "duration"=>$duration);
                echo json_encode($data);
            }

        }catch(Exception $e){

            echo 'Excepción capturada (show videos): ',  $e->getMessage(), "\n";
        }
    }

   /*function updateDurationVideo(){

        try{

        }catch(Exec)
    }*/

    function showAllVideos(){
        try{

            $id = $_POST['key'];

            $query_all_videos = "SELECT id_url,url_video
                             FROM video_url WHERE id_course = $id";

            $result_alll_videos = executeQuery($query_all_videos);

            if($result_alll_videos){
                while($all_videos = odbc_fetch_array($result_alll_videos)){
                    $json_all_videos["all_videos"][] = array_map("utf8_encode", $all_videos);
                    $all_videos_json= json_encode($json_all_videos); 
                }
                echo $all_videos_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada (show videos): ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para mostrar los material de apoyo segun el tema del curso
    function showMaterial(){

        try{

            $course_key = $_POST['key_course'];
            $themes_key = $_POST['key_theme'];

            $sql_material = "SELECT path_material, name_material, type_material, link
                             FROM support_material
                             WHERE id_course = $course_key AND id_themes = $themes_key";

            $result_material = executeQuery($sql_material);

            if($result_material){

                while($material = odbc_fetch_array($result_material)){

                    $json_material["materiales"][] = array_map("utf8_encode", $material);
                    $material_json= json_encode($json_material);  
                }

                if(!isset($material_json)){

                    echo json_encode("without material");
                }
                else{
                    echo  $material_json;
                }
            }

                

        }catch(Exception $e){

            echo 'Excepción capturada (show material): ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para seleccionar los modulos vacios de la tabla de detalle cursos para despues actualizarlos
    function modulesNull(){

        try{

            $person = $_POST['key_person'];
            $course = $_POST['key_course'];
            $module = $_POST['key_module'];
            $themes = $_POST['key_themes'];

            $query_null = "SELECT id_module, id_themes, id_detail
                           FROM detail_course
                           WHERE id_person = $person AND id_course = $course";

            $result_null = executeQuery($query_null);

            if($result_null){

                while($null = odbc_fetch_array($result_null)){
 
                    if($null['id_module'] == ""){

                        $datil = $null['id_detail'];

                        $update_detail = " UPDATE detail_course SET id_module = $module, id_themes = $themes
                                           WHERE id_person = $person AND id_course = $course AND id_detail = $datil";

                        $result_detail = executeQuery($update_detail);

                        if($result_detail){

                             echo "update detaile";
                
                        }
                    }
                }

            }

        }catch(Exception $e){

            echo 'Excepción capturada (modules null): ',  $e->getMessage(), "\n";
        }
    }

?>