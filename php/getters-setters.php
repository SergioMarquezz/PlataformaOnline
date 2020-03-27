<?php

    require_once "../core/main-bd.php";

    class CreateCourse{

        private $title, $lessons, $hours, $start, $end, $descripcion, $category, $decision, $id_cour, $id_modu;


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

                $directorio_word = '../material/Word/';
                $directorio_pdf = '../material/PDF/';
                $directorio_power = '../material/PowerPoint/';
                $directorio_videos = '../videos/';
                $directorio_img = '../img/upload/';
            
                $tmp_file = $_FILES['files_material']['tmp_name'];
                $name_file = $_FILES['files_material']['name'];
                $type_file = $_FILES['files_material']['type'];
                $size_file = $_FILES['files_material']['size'];

                
                if($type_file == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){

                     $path = $directorio_word.$name_file;
                     $this->moveFile($tmp_file,$path);
                }

                else if($type_file == "application/vnd.openxmlformats-officedocument.presentationml.presentation"){

                    $path = $directorio_power.$name_file;
                    $this->moveFile($tmp_file,$path);
                }

                else if($type_file == "application/pdf"){

                    $path = $directorio_pdf.$name_file;
                    $this->moveFile($tmp_file,$path);
                }

                else if($type_file == "image/png" || $type_file == "image/jpeg" ){

                    $path = $directorio_img.$name_file;
                    $this->moveFile($tmp_file,$path);
                }

                else if($type_file == "video/mp4"){

                    if($size_file > 101102727){

                        echo "Grande";
                    }
                    else{
                        $path = $directorio_videos.$name_file;
                        $this->moveFile($tmp_file,$path);
                    }
                }                
              //  $insert_material = "INSERT INTO support_material(size_material,type_material,path_material,id_course,id_themes,name_material,)"

            }catch(Exception $e){

                echo 'Excepción capturada ( material Insert):',  $e->getMessage(), "\n";
            }
        }

        public function moveFile($tmp,$route){

            if(move_uploaded_file($tmp, $route)) {	

                echo "El archivo se ha almacenado en forma exitosa.<br>";
            } else {

                echo "Ha ocurrido un error, por favor inténtelo de nuevo.<br>";
            }
        }

    }


?>