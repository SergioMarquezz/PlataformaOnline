<?php

    require "./getters-setters.php";

    $new_course = new CourseCreate();


    class CourseCreate{


        private $create_course;

        public function CourseCreate(){

    
            $this->create_course = new  CreateCourse();
            $this->options();
        }

        public function options(){

            $option = $_POST['detect'];

            switch($option){

                case "save course":
                     $this->saveCourse();
                break;

                case "save modules":
                    $this->saveModules();
                break;

                case "save themes":
                    $this->saveThemes();
                break;

                case "course vacio":
                    $this->create_course->courseLasted();
                break;

                case "material save":
                    $this->saveMaterialVideo();
                break;

                case "material insert":

                    $course_id = $_POST['key_course'];
                    $theme_id = $_POST['key_theme'];
                    $link = $_POST['links'];
                  
                    $this->create_course->setIdCourse($course_id);      
                    $this->create_course->setIdTheme($theme_id);
                    $this->create_course->setLink($link);  
                   

                    $this->create_course->insertMaterial();
                break;

                case "show themes":
                    $this->create_course->idThemes();
                break;

                case "only link":
                    $id_course = $_POST['key_course'];
                    $id_theme = $_POST['key_theme'];
                    $links = $_POST['links'];

                    $this->create_course->setIdCourse($id_course);      
                    $this->create_course->setIdTheme($id_theme);
                    $this->create_course->setLink($links);
                    $this->create_course->insertLink();
                break;

                case "delete module":

                    $key_module = $_POST['key_module'];
                    
                    $this->create_course->setIdModule($key_module);

                    $this->create_course->deleteThemesModule();

                break;

                case "update module":
                    $key = $_POST['key'];
                    
                    $this->create_course->setIdModule($key);

                    $this->create_course->nameModule();
                break;
            }

        }

        public function setValuesCourse(){

            $title_bd = utf8_decode($_POST['title']);
            $lessons_bd = $_POST['les'];
            $hours_bd = $_POST['hour'];
            $start_bd = $_POST['start_date'];
            $end_bd = $_POST['end_date'];
            $descripcion_bd = utf8_decode($_POST['descrip']);
            $category_bd = $_POST['categories'];
            $decidir = $_POST['decidir'];

           $this->create_course->setTitle($title_bd);
           $this->create_course->setCategory($category_bd);
           $this->create_course->setLessons($lessons_bd);
           $this->create_course->setHours($hours_bd);
           $this->create_course->setDateStart($start_bd);
           $this->create_course->setDateEnd($end_bd);
           $this->create_course->setDescription($descripcion_bd);
           $this->create_course->setDecision($decidir);

        }

       
        public function saveCourse(){

            $this->setValuesCourse();
           
            
            $title =  $this->create_course->getTitle();
            $lessons = $this->create_course->getLessons();
            $hours = $this->create_course->getHours();
            $start = $this->create_course->getDateStart();
            $end = $this->create_course->getDateEnd();
            $descri = $this->create_course->getDescription();
            $category = $this->create_course->getCategory();
            $decidir = $this->create_course->getDecision();

            try{

                if($title == ""){

                    echo "title vacio";

                }
                else if($category == 0){

                    echo "categoria vacia";
                }

                else if($lessons == "" || $lessons == 0){

                    echo "clases vacias";
                }
                else if($hours == "" || $hours == 0){

                    echo "horas vacias";
                }
                else if($start == ""){

                    echo "inicio vacio";
                }
                else if($end == ""){

                    echo "fin vacio";
                }
                else if($descri == ""){

                    echo "descripcion vacia";
                }

                else if($decidir == "si"){
                

                    $save =  $this->create_course->courseInsert();

                    if($save == "save curso"){

                        echo "curso insert";
                    }
                }
            
            }catch(Exception $e){

                echo 'Excepción capturada (new Category): ',  $e->getMessage(), "\n";
            }   

        }

        public function saveModules(){

            try{

                $name_module =  utf8_decode($_POST['module']);
                $key_course = $_POST['course'];
                

                $this->create_course->setTitle($name_module);
                $this->create_course->setIdCourse($key_course);       

                $save_module = $this->create_course->modulesInsert();

                if($save_module == "save modules"){

                    echo "guardado";
                  
                }
                


            }catch(Exception $e){

                echo 'Excepción capturada (save Modules): ',  $e->getMessage(), "\n";
            }
        }

        public function saveThemes(){

            try{

                $name_theme = utf8_decode($_POST['theme']);
                $id_course = $_POST['id_course'];
                $id_module =  $this->create_course->moduleLasted();
                $id_category = $_POST['id_category'];

                $this->create_course->setTitle($name_theme);
                $this->create_course->setIdModule($id_module);
                $this->create_course->setCategory($id_category);
                $this->create_course->setIdCourse($id_course);     


                $msj_themes = $this->create_course->themesInsert();

                if($msj_themes == "save theme"){

                    echo "exito";
                }


            }catch(Exception $e){

                echo 'Excepción capturada (save Themes): ',  $e->getMessage(), "\n";
            }
        }

        public function saveMaterialVideo(){

            try{

                $this->create_course->materialInsertUpload();

            }catch(Exception $e){
             
                echo 'Excepción capturada (save Material Video): ',  $e->getMessage(), "\n";
            }
        }
    }

?>