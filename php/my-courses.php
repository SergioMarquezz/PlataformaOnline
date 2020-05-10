<?php

    require_once "../core/main-bd.php";

    listCourses();

    function listCourses(){

        $number = $_POST['num'];
        $pass = $_POST['password'];

        try{
            $query_list_course = "SELECT DISTINCT cour.id_course, title, description, url_video
            FROM detail_course 
            INNER JOIN persons p ON detail_course.id_person = p.id_person
            INNER JOIN courses cour ON detail_course.id_course = cour.id_course
            INNER JOIN video_url ON cour.id_url_main = video_url.id_url
            WHERE p.number_employee = $number AND p.password = '$pass'";
    
            $result_list = executeQuery($query_list_course);
    
            if($result_list){
     
                while($list = odbc_fetch_array($result_list)){
    
                    $json_list["my_courses"][] = array_map("utf8_encode", $list);
                    $list_json= json_encode($json_list); 

                }
                
                if(!isset($list_json)){
    
                    echo json_encode("without courses");
                }
                else{
                    echo $list_json;
                }
                
            }


        }catch(Exception $e){

            echo 'Excepción capturada 17: ',  $e->getMessage(), "\n";
        }    
    }

?>