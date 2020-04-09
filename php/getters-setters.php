<?php

    require_once "../core/main-bd.php";

    $new_course = new CreateCourse();

    $new_course->deleteThemesModule();

    class CreateCourse{

        private $title, $lessons, $hours, $start, $end, $descripcion, $category, $decision, $id_cour, $id_modu , $id_theme;

        private $tmp_file;
        private $name_file;
        private $type_file;
        private $size_file;
        private $link_file;
   
        private $directorio_word = '../material/Word/';
        private $directorio_pdf = '../material/PDF/';
        private $directorio_power = '../material/PowerPoint/';
        private $directorio_videos = '../videos/';
        private $directorio_img = '../img/upload/';


        public function getLink(){

            return $this->link_file;
        }

        public function setLink($new_link){

            $this->link_file = $new_link;
        }

        public function getTitle(){

            return $this->title;
        }

        public function setTitle($new_title){

            $this->title = $new_title;
        }

        public function getLessons(){

            return $this->lessons;
        }

        public function setLessons($new_lessons){

            $this->lessons = $new_lessons;
        }

        public function getHours(){

            return $this->hours;
        }

        public function setHours($new_hours){

            $this->hours = $new_hours;
        }

        public function getDateStart(){

            return $this->start;
        }

        public function setDateStart($new_start){

            $this->start = $new_start;
        }

        public function getDateEnd(){

            return $this->end;
        }

        public function setDateEnd($new_end){

            $this->end = $new_end;
        }

        public function getDescription(){

            return $this->descripcion;
        }

        public function setDescription($new_description){

            $this->descripcion = $new_description;
        }

        public function getCategory(){

            return $this->category;
        }

        public function setCategory($new_category){

            $this->category = $new_category;
        }

        public function getDecision(){

            return $this->decision;
        }

        public function setDecision($new_decision){

            $this->decision = $new_decision;
        }

        public function getIdCourse(){

            return $this->id_cour;
        }

        public function setIdCourse($new_id_course){

            $this->id_cour = $new_id_course;
        }

        public function getIdModule(){

            return $this->id_modu;
        }

        public function setIdModule($new_id_module){
            
            $this->id_modu = $new_id_module;
        }

        public function setIdTheme($theme){
            
            $this->id_theme = $theme;
        }

        public function courseInsert(){

            try{

                $insert_course = "INSERT INTO courses(title,total_lessons,total_hours,date_start,date_end,description,id_category,signed_student)
                VALUES('$this->title',$this->lessons,$this->hours,'$this->start','$this->end','$this->descripcion',$this->category,0)";
    
                $result_insert = executeQuery($insert_course);
    
                if($result_insert){
    
                    return "save curso";
                }

            }catch(Exception $e){

                echo 'Excepción capturada (course Insert): ',  $e->getMessage(), "\n";
            }
        }

        public function modulesInsert(){

            try{

                $modules_insert = "INSERT INTO modules(name,id_course)
                VALUES('$this->title','$this->id_cour')";
                

                $result_modules = executeQuery($modules_insert);

                if($result_modules){

                    return "save modules";

                }

            }catch(Exception $e){

                echo 'Excepción capturada (themes Insert):',  $e->getMessage(), "\n";
            }

        }

        public function moduleLasted(){

            try{

                $query_ultimo_module = "SELECT MAX(id_module) AS ultimo_module
                FROM modules";

                $result_ultimo_module = executeQuery($query_ultimo_module);

                if($result_ultimo_module){

                    $utlimo_module = odbc_result($result_ultimo_module,"ultimo_module");

                    return $utlimo_module;
                }

            }catch(Exception $e){

                echo 'Excepción capturada (module Lasted):',  $e->getMessage(), "\n";
            }
        }

        public function courseLasted(){

            try{

                $query_ultimo = "SELECT MAX(id_course) AS ultimo_curso
                FROM courses";

                $result_ultimo = executeQuery($query_ultimo);
                
                if($result_ultimo){

                    $utlimo = odbc_result($result_ultimo,"ultimo_curso");

                    echo $utlimo;
                }

            }catch(Exception $e){

                echo 'Excepción capturada (course Lasted):',  $e->getMessage(), "\n";
            }
        }

        public function themesInsert(){

            try{

                $insert_theme = "INSERT INTO themes(name,id_course,id_module,id_category)
                 VALUES('$this->title','$this->id_cour','$this->id_modu',$this->category)";
                
                $result_theme = executeQuery($insert_theme);

                if($result_theme){

                    return "save theme";
                }


            }catch(Exception $e){

                echo 'Excepción capturada (themes Insert):',  $e->getMessage(), "\n";
            }
        }

        public function materialInsertUpload(){
        
            try{
            
                $this->tmp_file = $_FILES['files_material']['tmp_name'];
                $this->name_file = $_FILES['files_material']['name'];
                $this->type_file = $_FILES['files_material']['type'];
                $this->size_file = $_FILES['files_material']['size'];

                
                if($this->type_file == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){

                     $path = $this->directorio_word.$this->name_file;
                     $this->moveFile($this->tmp_file,$path);
                }

                else if($this->type_file == "application/vnd.openxmlformats-officedocument.presentationml.presentation"){

                    $path = $this->directorio_power.$this->name_file;
                    $this->moveFile($this->tmp_file,$path);
                }

                else if($this->type_file == "application/pdf"){

                    $path = $this->directorio_pdf.$this->name_file;
                    $this->moveFile($this->tmp_file,$path);
                }

                else if($this->type_file == "image/png" || $this->type_file == "image/jpeg" ){

                    $path = $this->directorio_img.$this->name_file;
                    $this->moveFile($this->tmp_file,$path);
                }

                else if($this->type_file == "video/mp4"){

                    if($this->size_file > 101102727){

                        echo "Grande";
                    }
                    else{
                        $str_name = str_replace(" ","-",$this->name_file);

                        $path = $this->directorio_videos.$str_name;
                        $this->moveFile($this->tmp_file,$path);
                    }
                }                
              //  $insert_material = "INSERT INTO support_material(size_material,type_material,path_material,id_course,id_themes,name_material,)"

            }catch(Exception $e){

                echo 'Excepción capturada ( material Insert):',  $e->getMessage(), "\n";
            }
        }

        public function moveFile($tmp,$route){

            if(move_uploaded_file($tmp, $route)) {	

                echo "archivo almacenado";
            } else {

                echo "ocurrio un error";
            }
        }

        public function insertMaterial(){

            try{

                $this->name_file = $_FILES['files_material']['name'];
                $this->type_file = $_FILES['files_material']['type'];
                $this->size_file = $_FILES['files_material']['size'];

                switch($this->type_file){

                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        $route = $this->directorio_word.$this->name_file;
                        $this->insertVideosMaterial("material",$route);

                        if($this->link_file != ""){

                            $this->type_file = "link";

                            $this->insertLink();
                        }

                    break;
                    
                    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                        $route = $this->directorio_power.$this->name_file;
                        $this->insertVideosMaterial("material",$route);

                        if($this->link_file != ""){

                            $this->type_file = "link";

                            $this->insertLink();
                        }

                    break;
                  
                    case "image/png":
                        $route = $this->directorio_img.$this->name_file;
                        $this->insertVideosMaterial("material",$route);

                        if($this->link_file != ""){

                            $this->type_file = "link";

                            $this->insertLink();
                        }

                    break;

                    case "image/jpeg":
                        $route = $this->directorio_img.$this->name_file;
                        $this->insertVideosMaterial("material",$route);

                        if($this->link_file != ""){

                            $this->type_file = "link";
                            

                            $this->insertLink();
                        }

                    break;

                    case "application/pdf":
                        $route = $this->directorio_pdf.$this->name_file;
                        $this->insertVideosMaterial("material",$route);

                        if($this->link_file != ""){

                            $this->type_file = "link";
                            

                            $this->insertLink();
                        }

                    break;
                 
                    case "video/mp4":

                        $str_name = str_replace(" ","-",$this->name_file);

                        $route = "videos/".$str_name;

                        $this->insertVideosMaterial("video",$route);

                        if($this->link_file != ""){

                            $this->type_file = "link";

                            $this->insertLink();
                        }

                    break;

                }

            }catch(Exception $e){

                echo 'Excepción capturada (insert Material):',  $e->getMessage(), "\n";
            }
        }

        public function insertLink(){

            try{

             
                $this->type_file = "link";

                $insert_link = "INSERT INTO support_material(type_material,id_course,id_themes,link)
                                    VALUES('$this->type_file','$this->id_cour','$this->id_theme','$this->link_file')";
                    
                $result_link = executeQuery($insert_link);

                if($result_link){

                    echo "insertado link";
                }

            }catch(Exception $e){

                echo 'Excepción capturada (insert Link):',  $e->getMessage(), "\n";
            }
        }

        public function insertVideosMaterial($option,$route_bd){

            try{

                if($option == "material"){

                    $insert_material = "INSERT INTO support_material(size_material,type_material,path_material,id_course,id_themes,name_material)
                    VALUES('$this->size_file', '$this->type_file', '$route_bd', '$this->id_cour', '$this->id_theme', '$this->name_file')";

                    $result_insert = executeQuery($insert_material);

                    if($result_insert){

                        echo "insertado material";
                    }
                }

                else if($option == "video"){

                    $hoy = date("Y-m-d");  

                    $insert_video = "INSERT INTO video_url(url_video,id_course,percentage_video,date_upload,id_themes)
                                    VALUES('$route_bd','$this->id_cour',1,'$hoy','$this->id_theme')";

                    $result_video = executeQuery($insert_video);

                    if($result_video){

                       $this->urlMainEmpty();
                    }

                }
                


            }catch(Exception $e){

                echo 'Excepción capturada (insert Videos Material):',  $e->getMessage(), "\n";
            }
        }

        public function urlMainEmpty(){

            try{

                $query_url_empty = "SELECT id_url_main 
                                    FROM courses
                                    WHERE id_course = $this->id_cour";

                $result_url_main = executeQuery($query_url_empty);

                if($result_url_main){
                    
                    $url_empty = odbc_result($result_url_main,"id_url_main");

                    if($url_empty == ""){
                        
                        $id_url_main = $this->ultimoVideo();

                        $update_course = "UPDATE courses SET id_url_main = $id_url_main
                        WHERE id_course = $this->id_cour";

                        $result_update = executeQuery($update_course);

                        if($result_update){

                            "url course actualizado";
                        }
                    }
                }

            }catch(Exception $e){

                echo 'Excepción capturada (url Main Empty):',  $e->getMessage(), "\n";
            }
        }

        public function ultimoVideo(){

            try{

                $ultimo_video = "SELECT MAX(id_url) AS ultimo_url
                                FROM video_url
                                WHERE id_course = $this->id_cour";

                $result_ultimo_video = executeQuery($ultimo_video);

                if($result_ultimo_video){

                    $video_ultimo = odbc_result($result_ultimo_video,"ultimo_url");
                }

                return $video_ultimo;

            }catch(Exception $e){

                echo 'Excepción capturada (ultimo Video):',  $e->getMessage(), "\n";
            }
        }

        public function idThemes(){

            try{

                $id_module = $this->moduleLasted();

                $query_id_themes = "SELECT id_themes, name
                                    FROM themes
                                    WHERE id_module = $id_module";

                $resul_id = executeQuery($query_id_themes);

                if($resul_id){

                    while($id = odbc_fetch_array($resul_id)){

                        $json_id["id_themes"][] = array_map("utf8_encode", $id);
                        $id_json = json_encode($json_id); 
                    }
                    echo $id_json;
                }

            }catch(Exception $e){

                echo 'Excepción capturada (id Themes):',  $e->getMessage(), "\n";
            }
        }

        public function idThemesDelete(){

            try{

                $this->setIdModule(3200);

                $id_themes_delete = "SELECT id_themes
                                    FROM themes
                                    WHERE id_module = $this->id_modu";

                $resul_id_themes = executeQuery($id_themes_delete);

                if($resul_id_themes){

                    while($id_themes = odbc_fetch_array($resul_id_themes)){

                        $json_id["themes"][] = array_map("utf8_encode", $id_themes);
                    }

                    return $json_id["themes"];
                    
                }

            }catch(Exception $e){

                echo 'Excepción capturada (id Themes):',  $e->getMessage(), "\n";
            }
        }

        public function deleteThemesModule(){

           
            $size = count($this->idThemesDelete());

            for($i = 0; $i < $size; $i++){

                $id = $this->idThemesDelete()[$i]["id_themes"];

                $delete = "DELETE FROM support_material WHERE id_themes = $id";

                $resul_delet = executeQuery($delete);

                if($resul_delet){
                    echo "correct";
                }

               /* $result_select = executeQuery($select);

                if($result_select){

                    while($name = odbc_fetch_array($result_select)){

                        $json_name["themes"][] = array_map("utf8_encode", $name);
                    }
                    print_r($json_name);
                }*/
            }
        }

    }


?>