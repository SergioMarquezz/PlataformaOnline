<?php
    
    require_once "../core/main-bd.php";
    require "./getters-setters.php";

    $ident = $_POST['identy'];

    switch($ident){

        case "categorias instructor":
            categoriesInstructor();
        break;

        case "new category":
            newCategory();
        break;

        case "show courses":
            courses();
        break;

        case "information course":
            informationCourse();
        break;

        case "information modules":
            informationModules();
        break;

        case "information themes":
            informationThemes();
        break;

        case "information material":
            informationMaterial();
        break;

        case "information video":
            informationVideo();
        break;

        case "show modules themes":
            showThemesModule();
        break;

        case "update name module":
            updateNameModule();
        break;

        case "update name theme":
            updateNameTheme();
        break;

        case "update url course":
            updateEmptyIdUrl();
        break;

        case "delete one theme":
            deleteOneThemeUpdate();
        break;
    }
   
    //FUncion para mostrar todas las categorias
    function categoriesInstructor(){

        try{

            $sql_category = "SELECT * FROM categories";

            $result_category = executeQuery($sql_category);
    
            if($result_category){

                while($rows_category = odbc_fetch_array($result_category)){

                    $json_category["category"][] = array_map("utf8_encode", $rows_category);
                    $category_json = json_encode($json_category);  

                }

                if(!isset($category_json)){

                    echo "no hay categorias";
                }
                else{

                    echo $category_json;
                }
                
            }

        }catch(Exception $e){

            echo 'Excepción capturada (categories Instructor): ',  $e->getMessage(), "\n";
        }
        
    }

    //Funcion para agregar una nueva categoria
    function newCategory(){

        try{

            $category_new = clearString($_POST['new_category']);

            $utf8 = utf8_decode($category_new);

            $new_category = "INSERT INTO categories(name)
                             VALUES('$utf8')";

            $result_new_category = executeQuery($new_category);

            if($result_new_category){
            
                $array = array("data" => array(

                    "message" =>'category save',
                    "lastes_id" => latestId()
                ));

                $json_data = json_encode($array);

                echo $json_data;
            }


        }catch(Exception $e){

            echo 'Excepción capturada (new Category): ',  $e->getMessage(), "\n";
        }
    }

    //Funcion que devuelve la ultima categoria registrada 
    function latestId(){

        try{

            $latest_id = "SELECT MAX(id_category) AS latest_id
                         FROM categories";

            $result_latest = executeQuery($latest_id);

            if($result_latest){

                $id_lastest = odbc_result($result_latest, "latest_id");
            }

            return $id_lastest;

        }catch(Exception $e){

            echo 'Excepción capturada (latestId): ',  $e->getMessage(), "\n";
        }
    }

    //Funcion para mostrar todos los titulos de los cursos
    function courses(){

        try{

            $query_courses = "SELECT id_course, title 
                              FROM courses";

            $result_courses = executeQuery($query_courses);
            
            if($result_courses){

                while($courses = odbc_fetch_array($result_courses)){

                    $json_courses["courses_exis"][] = array_map("utf8_encode", $courses);
                    $courses_json = json_encode($json_courses);  
                }

                if(!isset($courses_json)){

                    echo "sin titulo curso";
                }
                else{
                    
                    echo  $courses_json;
                }

            }

        }catch(Exception $e){

            echo 'Excepción capturada (courses): ',  $e->getMessage(), "\n";
        }
    }

    function informationCourse(){

        try{

            $id = $_POST['id_course'];

            $query_information = "SELECT cour.title, cour.total_hours, cour.total_lessons, cour.date_start, cour.date_end, cour.description, catego.name
            AS category
            FROM courses cour, categories catego
            WHERE cour.id_category = catego.id_category 
            AND cour.id_course = $id";

            $result_information = executeQuery($query_information);

            if($result_information){

                $title = odbc_result($result_information, "title");
                $hours = odbc_result($result_information, "total_hours");
                $lessons = odbc_result($result_information, "total_lessons");
                $start = odbc_result($result_information, "date_start");
                $end = odbc_result($result_information, "date_end");
                $description = odbc_result($result_information, "description");
                $category = odbc_result($result_information, "category");

                $data_information = array('informtion_course' => array(

                    "id" => $id,
                    "title" => utf8_encode($title),
                    "hours" => $hours,
                    "lessons" => $lessons,
                    "start" => $start,
                    "end" => $end,
                    "description"  => utf8_encode($description),
                    "category" => utf8_encode($category)
                ));

                $json_information = json_encode($data_information);

                echo $json_information;
            }

        }catch(Exception $e){

            echo 'Excepción capturada (information Course): ',  $e->getMessage(), "\n";
        
        }
    }

    function informationModules(){

        try{

            $key_course = $_POST['id'];

            $information_modules = "SELECT name,id_module 
                                    FROM modules 
                                    WHERE id_course = $key_course";

            $result_modules = executeQuery($information_modules);

            if($result_modules){

                while($modules = odbc_fetch_array($result_modules)){

                    $json_modules["modules_course"][] = array_map("utf8_encode", $modules);
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

            echo 'Excepción capturada (information Modules): ',  $e->getMessage(), "\n";
        }
    }

    function informationThemes(){

        try{

            $theme = $_POST['name_theme'];
            $course = $_POST['id_course'];

            $utf8_name = utf8_decode($theme);

            $information_themes = "SELECT them.name, them.id_themes
            FROM themes them, modules modu
            WHERE them.id_module = modu.id_module 
            AND them.id_course = $course AND modu.name = '$utf8_name'";

            $result_information = executeQuery($information_themes);

            if($result_information){

                while($theme = odbc_fetch_array($result_information)){

                    $json_theme["information_themes"][] = array_map("utf8_encode", $theme);
                    $themes_json = json_encode($json_theme);  
                }

                if(!isset($themes_json)){

                    $msj['msj'] = "sin temas";
                    echo json_encode($msj);
                }
                else{
                    echo $themes_json;
                }
            }

        }catch(Exception $e){

            echo 'Excepción capturada (information Themes): ',  $e->getMessage(), "\n";
        }
    }

    function showThemesModule(){

        try{

            $module = $_POST['id_module'];

            $show_themes = "SELECT id_themes, name
                            FROM themes
                            WHERE id_module = $module";

            $result_themes = executeQuery($show_themes);

            if($result_themes){

                while($themes = odbc_fetch_array($result_themes)){

                    $json_themes["themes_module"][] = array_map("utf8_encode", $themes);
                    $themes_json = json_encode($json_themes);  
                }

                echo $themes_json;

            }


        }catch(Exception $e){

            echo 'Excepción capturada (show Themes Module): ',  $e->getMessage(), "\n";
        }
    }

    function informationMaterial(){

        try{

            $name_theme = $_POST['name_theme'];

            $utf8_name = utf8_decode($name_theme);

            $sql_material = "SELECT sup.path_material, sup.name_material, sup.link, them.name
            FROM support_material sup, themes them
            WHERE sup.id_themes = them.id_themes AND them.name = '$utf8_name'";

            $result_material = executeQuery($sql_material);

            if($result_material){

                while($material = odbc_fetch_array($result_material)){

                    $json_material["information_material"][] = array_map("utf8_encode", $material);
                    $material_json = json_encode($json_material);  
                }

                if(!isset($material_json)){

                    $msj['msj'] = "sin material";
                    echo json_encode($msj);
                }
                else{

                    echo $material_json;
                }
                
            }

        }catch(Exception $e){

            echo 'Excepción capturada (information Material): ',  $e->getMessage(), "\n";
        }
    }

    function informationVideo(){

        try{

           $theme_name = $_POST['theme_name'];
           $utf8_theme = utf8_decode($theme_name);

            $sql_video = "SELECT vid.url_video
            FROM video_url vid, themes them
            WHERE vid.id_themes = them.id_themes AND them.name = '$utf8_theme'";

            $result_video = executeQuery($sql_video);

            if($result_video){

                $url = odbc_result($result_video, "url_video");

                echo utf8_encode($url);
            }

        }catch(Exception $e){

            echo 'Excepción capturada (information Video): ',  $e->getMessage(), "\n";
        }
    }

    function updateNameModule(){

        try{

            $name_module = utf8_decode($_POST['name_module']);
            $id_module = $_POST['id_module'];

            $update_name_module = "UPDATE modules SET name = '$name_module' WHERE id_module = $id_module";

            $result_name_module = executeQuery($update_name_module);

            if($result_name_module){

                echo "name update";
            }

        }catch(Exception $e){

            echo 'Excepción capturada (update Name Module): ',  $e->getMessage(), "\n";
        }
    }

    function updateNameTheme(){

        try{

            $new_name_theme = utf8_decode($_POST['new_theme']);
            $key_theme = $_POST['id_theme'];

            $update_name_theme = "UPDATE themes SET name = '$new_name_theme'
            WHERE id_themes = $key_theme";

            $result_name_theme = executeQuery($update_name_theme);

            if($result_name_theme){
                echo "theme update";
            }

        }catch(Exception $e){
            echo 'Excepción capturada (update Name Theme): ',  $e->getMessage(), "\n";
        }
    }


    function updateEmptyIdUrl(){

        try{

            $id_course = $_POST['key_course'];
                
            $update_empty = "UPDATE courses SET id_url_main = ' '
            WHERE id_course = $id_course";

            executeQuery($update_empty);


        }catch(Exception $e){

            echo 'Excepción capturada (update Empty Id Url):',  $e->getMessage(), "\n";
        }
    }

    function deleteOneThemeUpdate(){

        try{

            $create_course = new CreateCourse();
        
            $id_theme = $_POST['key_theme'];

            $msj_video = $create_course->deleteVideoServer($id_theme);

            if($msj_video != 'theme without videos'){

                for($i = 0; $i < count($create_course->deleteVideoServer($id_theme)); $i++){

                    $path_video = $create_course->deleteVideoServer($id_theme)[$i]["url_video"];
                    unlink("../".$path_video);
                 }
                 updateEmptyIdUrl();
            }
            for($j = 0; $j < count($create_course->deleteMaterialServer($id_theme)); $j++){

                $path_material = $create_course->deleteMaterialServer($id_theme)[$j]["path_material"];

                if($path_material != ""){
                    unlink($path_material);
                }
             }

            $delete_one_theme = "DELETE FROM themes WHERE id_themes = $id_theme";
            $delete_one_material = "DELETE FROM support_material WHERE id_themes = $id_theme";
            $delete_one_video = "DELETE FROM video_url WHERE id_themes = $id_theme";

            $result_delete_one_theme = executeQuery($delete_one_theme);
            executeQuery($delete_one_material);
            executeQuery($delete_one_video);

            if($result_delete_one_theme){
                echo "theme delete";
            }

        }catch(Exception $e){
            echo 'Excepción capturada (delete One Theme Update):',  $e->getMessage(), "\n";
        }
    }
?>