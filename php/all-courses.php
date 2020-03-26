<?php

    require_once "../core/main-bd.php";

    $options = $_POST['indentify'];

    switch($options){

        case "all courses":
            showAllCourses();
        break;

        case "ordey asc":
            ordeyByAZ();
        break;

        case "ordey desc":
            ordeyByZA();
        break;

        case "categories":
            categories();
        break;

        case "diff month":
            $month_diff = $_POST['diff'];
            ordeyDurationForMonth($month_diff);
        break;

        case "ordey category":
            $key_category = $_POST['id_category'];
            ordeyForCategory($key_category);
        break;

        case "search":
            $search_course = $_POST['title'];
            searchCourse($search_course);
        break;

    } 
    //Funcion para mostrar todos los cursos al iniciar
    function showAllCourses(){
        
        try{

            $query_all_courses = "SELECT cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, cour.total_lessons,
            total_hours, DATEDIFF(MONTH, date_start, date_end) AS elapsed_month,  CASE WHEN DATEDIFF(MONTH, date_start, date_end) = 0 
            THEN DATEDIFF(DAY, date_start, date_end) END AS elapsed_day,vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url";
    
            $result_courses = executeQuery($query_all_courses);
    
            if($result_courses){
    
                while($all_courses = odbc_fetch_array($result_courses)){
    
                    $json_courses["all_courses"][] = array_map("utf8_encode", $all_courses);
                    $courses_json= json_encode($json_courses);  
                }

                if(!isset($courses_json)){

                    echo "sin courses";
                }
                else{

                    echo $courses_json;
                }
    
            }
        }catch(Exception $e){

            echo 'Excepción capturada 10: ',  $e->getMessage(), "\n";
        }

    }

    //Funcion para ordenar los cursos por titulo a-z
    function ordeyByAZ(){

        try{

            $query_ordey = "SELECT cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, cour.total_lessons,
            total_hours, DATEDIFF(MONTH, date_start, date_end) AS elapsed_month,  CASE WHEN DATEDIFF(MONTH, date_start, date_end) = 0 
            THEN DATEDIFF(DAY, date_start, date_end) END AS elapsed_day,vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url
            ORDER BY (cour.title)";
    
            $result_ordey = executeQuery($query_ordey);
    
            if($result_ordey){
    
                while($ordey_by = odbc_fetch_array($result_ordey)){
    
                    $json_ordey["all_courses"][] = array_map("utf8_encode", $ordey_by);
                    $ordey_json= json_encode($json_ordey);  
                }
    
                echo $ordey_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 11: ',  $e->getMessage(), "\n";
        }
    }

     //Funcion para ordenar los cursos por titulo z-a
    function ordeyByZA(){

        try{
            $query_desc = "SELECT cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, cour.total_lessons,
            total_hours, DATEDIFF(MONTH, date_start, date_end) AS elapsed_month,  CASE WHEN DATEDIFF(MONTH, date_start, date_end) = 0 
            THEN DATEDIFF(DAY, date_start, date_end) END AS elapsed_day,vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url
            ORDER BY (cour.title) DESC";
    
            $result_desc = executeQuery($query_desc);
    
            if($result_desc){
    
                while($ordey_desc = odbc_fetch_array($result_desc)){
    
                    $json_desc["all_courses"][] = array_map("utf8_encode", $ordey_desc);
                    $desc_json= json_encode($json_desc);  
                }
    
                echo $desc_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 12: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para llenar select de categorias
    function categories(){

        try{

            $sql_categories = "SELECT * FROM categories";

            $result_categories = executeQuery($sql_categories);
    
            if($result_categories){

                while($rows_categories = odbc_fetch_array($result_categories)){

                    $json_categories["categories"][] = array_map("utf8_encode", $rows_categories);
                    $categories_json = json_encode($json_categories);  

                }

                if(!isset($categories_json)){
                    
                    echo "sin categorias";
                }
                else{
                    echo $categories_json;
                }
            }

        }catch(Exception $e){

            echo 'Excepción capturada 13: ',  $e->getMessage(), "\n";
        }
        
    }

    //Funcion para ordenar los cursos por meses de duracion
    function ordeyDurationForMonth($diff_month){

        try{

            $query_month = "SELECT cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, cour.total_lessons,
            total_hours, DATEDIFF(MONTH, date_start, date_end) AS elapsed_month,  CASE WHEN DATEDIFF(MONTH, date_start, date_end) = 0 
            THEN DATEDIFF(DAY, date_start, date_end) END AS elapsed_day,vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url AND DATEDIFF(MONTH, date_start, date_end) = $diff_month";

            $result_month = executeQuery($query_month);

            if($result_month){

                while($month = odbc_fetch_array($result_month)){

                    $json_month["all_courses"][] = array_map("utf8_encode", $month);
                    $month_json = json_encode($json_month); 
                }

                echo $month_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 14: ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para ordenar los cursos por categoria
    function ordeyForCategory($id_category){

        try{

            $sql_ordey_category = "SELECT cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, cour.total_lessons,
            total_hours, DATEDIFF(MONTH, date_start, date_end) AS elapsed_month,  CASE WHEN DATEDIFF(MONTH, date_start, date_end) = 0 
            THEN DATEDIFF(DAY, date_start, date_end) END AS elapsed_day,vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url AND cour.id_category = $id_category";

            $result_ordey_category = executeQuery($sql_ordey_category);

            if($result_ordey_category){

                while($ordey_category = odbc_fetch_array($result_ordey_category)){

                    $json_ordey_category["all_courses"][] = array_map("utf8_encode", $ordey_category);
                    $ordey_category_json = json_encode($json_ordey_category); 

                }

                echo $ordey_category_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 15: ',  $e->getMessage(), "\n";
        }    
    }

    function searchCourse($title_course){

        try{

            $query_search = "SELECT cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, cour.total_lessons,
            total_hours, DATEDIFF(MONTH, date_start, date_end) AS elapsed_month, CASE WHEN DATEDIFF(MONTH, date_start, date_end) = 0 
            THEN DATEDIFF(DAY, date_start, date_end) END AS elapsed_day,vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url AND cour.title = '$title_course'";

            $result_search = executeQuery($query_search);

            if($result_search){

                while($search = odbc_fetch_array($result_search)){

                    $json_search["all_courses"][] = array_map("utf8_encode", $search);
                    $search_json = json_encode($json_search); 
                }

                echo $search_json;
            }

        }catch(Exception $e){

            echo 'Excepción capturada 16: ',  $e->getMessage(), "\n";
        }    
    }

?>