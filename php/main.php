<?php

    require_once "../core/main-bd.php";

    $options = $_POST['option'];


    //Switch para el control de que metodo se va ejecutar segun los datos en el AJAX 
    switch($options){

        case "countries":
            comboCountries();
        break;

        case "states":
            $id_country = $_POST['country'];
            comboState($id_country);
        break;

        case "cities":
            $id_state = $_POST['states'];
            comboMunicipality($id_state);
        break;

        case "insert persons":
            registry();
        break;

        case "count instructor":
            countInstructor();
        break;

        case "login":
            $employee = clearString($_POST['num_employee']);
            $password = clearString($_POST['pass']);

            startSesion($employee,$password);
        break;

        case "full name":
            $number = clearString($_POST['number_employee']);
            $both = clearString($_POST['birth']);

            selectPerson($number,$both);
        break;

        case "recover password":
            $pass_new = $_POST['new'];
            $employee_num = $_POST['employee'];
            $both_date = $_POST['both'];
            recoverPassword($pass_new,$employee_num,$both_date);
        break;

        case "show videos":
            videos();
        break;
    } 
    //Funcion para llenar combo de paises registro 
    function comboCountries(){

        try{
            
            $sql_countries = "SELECT id_country, name FROM countries;";
            $execute_sql = executeQuery($sql_countries);

            if($execute_sql){

                while($row = odbc_fetch_array($execute_sql)){

                    $json_countries["countries"][] = array_map("utf8_encode", $row);
                    $json= json_encode($json_countries);  
                }
                echo $json;
            }

            else{

                die( print_r(odbc_error(), true));
            }

        }catch(Exception $e){
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        }
        
    }
    //Funcion para llenar combo de estados registro 
    function comboState($id){

        try{
            
            $sql_states = "SELECT id_state, name FROM state
                              WHERE id_country = '$id'";
            
            $states = executeQuery($sql_states);

            if($states){

                while($rows = odbc_fetch_array($states)){

                    $json_states["states"][] = array_map("utf8_encode", $rows);
                    $state_json= json_encode($json_states);  
                }
                echo $state_json;
            }

        }catch(Exception $e){
            echo 'Excepción capturada 2: ',  $e->getMessage(), "\n";
        }   
    }
    //Funcion para llenar combo de municipios registro
    function comboMunicipality($key){

        try{
            
            $sql_cities = "SELECT id_city, name FROM cities
                           WHERE id_state = '$key' 
                           ORDER BY name";
            
            $cities = executeQuery($sql_cities);

            if($cities){

                while($rows = odbc_fetch_array($cities)){

                    $json_cities["cities"][] = array_map("utf8_encode", $rows);
                    $cities_json= json_encode($json_cities);  
                }
                echo $cities_json;
            }

        }catch(Exception $e){
            echo 'Excepción capturada 3: ',  $e->getMessage(), "\n";
        }   
    }

    //Funcion para contar cuantos instructores hay en la bd
    function countInstructor(){

        try{

            $count_instructor = "SELECT COUNT(id_person) + 1 AS count_persons FROM persons
            WHERE id_user = 2";

            $count = executeQuery($count_instructor);
            $column = odbc_result($count, "count_persons");

            $value_colum["value"] = $column;
            echo json_encode($value_colum);

        }catch(Exception $e){

            echo 'Excepción capturada 5:',  $e->getMessage(), "\n";
        }
                        
    }

    //Funcion para registrar a los usuarios del sistema
    function registry(){

        //Variables para el registro de personas
        $num_person = clearString($_POST['num']);
        $type_person = $_POST['id_user'];
        $name_person = utf8_decode(clearString($_POST['name']));
        $pat_person = utf8_decode(clearString($_POST['pat']));
        $mat_person = utf8_decode(clearString($_POST['mat']));
        $countries = $_POST['id_country'];
        $states = $_POST['id_state'];
        $municipality = $_POST['id_city'];
        $date_birth = $_POST['birth'];
        $password = utf8_decode(clearString($_POST['pass']));
        $gender_person = $_POST['gender'];

        try{
            //Validacion de campos en el form de registro
            
            //Guardar en base de datos
            $sql_insert = "INSERT INTO persons(name,last_name_pat,last_name_mat,date_birth,gender,number_employee, password,id_country,id_city,id_state,id_user)
                        VALUES('$name_person','$pat_person','$mat_person','$date_birth','$gender_person','$num_person','$password','$countries','$municipality','$states','$type_person')";

            $exec = executeQuery($sql_insert);
            if($exec){

                $msj['msj'] = "saved record";
                echo json_encode($msj);
            }
            else{
                echo "Row insertion failed.\n";  
             
            }
         
        }catch(Exception $e){

            echo 'Excepción capturada 4: ',  $e->getMessage(), "\n";
        }

    }

    //Funcion del login
    function startSesion($num,$pass){


        try{

            $sql_login = "SELECT p.id_person, p.name, p.last_name_pat, p.last_name_mat, p.gender, p.number_employee, p.password, 
            coun.name AS country, st.name AS state, cy.name AS municipality, u.type
            FROM persons p, countries coun, state st, cities cy, users u
            WHERE p.id_country = coun.id_country AND p.id_state = st.id_state 
            AND p.id_city = cy.id_city AND p.id_user = u.id_user 
            AND p.number_employee = '$num' AND p.password = '$pass'";

            $result_login = executeQuery($sql_login);

            $count = odbc_num_rows($result_login);

            if($count == 1){

                $id = odbc_result($result_login,"id_person");
                $name_user = utf8_encode(odbc_result($result_login,"name"));
                $last_pat = utf8_encode(odbc_result($result_login,"last_name_pat"));
                $last_mat = utf8_encode(odbc_result($result_login,"last_name_mat"));
                $country = utf8_encode(odbc_result($result_login,"country"));
                $state = utf8_encode(odbc_result($result_login,"state"));
                $city = utf8_encode(odbc_result($result_login,"municipality"));
                $type = utf8_encode(odbc_result($result_login,"type"));
                $employee_number = odbc_result($result_login,"number_employee");
                $pass = utf8_encode(odbc_result($result_login,"password"));

                session_start();

                $_SESSION['name_user'] = $name_user;
                $_SESSION['father'] = $last_pat;
                $_SESSION['mother'] = $last_mat;
                $_SESSION['countries'] = $country;
                $_SESSION['states'] = $state;
                $_SESSION['cities'] = $city;
                $_SESSION['type_user'] = $type;
                $_SESSION['num_employee'] = $employee_number;
                $_SESSION['password'] = $pass;
                $_SESSION['key_person'] = $id;

                if($type == "Instructor(a)"){

                    echo "user rigth instructor";
                }

                else if($type == "Alumno(a)"){

                    echo "user rigth student";
                }

       
            }
            else{
                echo "user incorrect";
            }

        }catch(Exception $e){
            echo 'Excepción capturada 6: ',  $e->getMessage(), "\n";
        }
 
    }

    function selectPerson($num_employee, $birth){

        try{

            $query_person = "SELECT name, last_name_pat, last_name_mat
            FROM persons
            WHERE number_employee = $num_employee AND date_birth = '$birth'";

            $result_person = executeQuery($query_person);

            $count_person = odbc_num_rows($result_person);

            if($count_person == 1){

                $names = utf8_encode(odbc_result($result_person,"name"));
                $father = utf8_encode(odbc_result($result_person,"last_name_pat"));
                $mother = utf8_encode(odbc_result($result_person,"last_name_mat"));

                $full_name['full_name'] = array("name" => $names.' '.$father.' '.$mother);

                echo json_encode($full_name);
            }
        }catch(Exception $e){

            echo 'Excepción capturada 7: ',  $e->getMessage(), "\n";
        }
    }

    function recoverPassword($new_pass,$number_employee,$birth_date){

       try{

        $query_recover = "UPDATE persons SET password = '$new_pass'
        WHERE number_employee = $number_employee AND date_birth = '$birth_date'";

        $recover = executeQuery($query_recover);

        if($recover){

            $message['message'] = "pass update";
            echo json_encode($message);
        }
        else{
            echo "Row insertion failed.\n";  
        
        }

       }catch(Exception $e){

        
        echo 'Excepción capturada 8: ',  $e->getMessage(), "\n";
       }
    }

    function videos(){

        try{

            $query_videos = "SELECT TOP 6 cour.id_course AS id_courses, vide.id_course AS id_videos, cour.title, cour.description, vide.url_video, vide.duration_video
            FROM courses cour, video_url vide
            WHERE cour.id_url_main = vide.id_url --AND cour.id_course = 1
            ORDER BY(cour.id_course) DESC";

            $result_videos = executeQuery($query_videos);

            if($result_videos){

                while($rows_videos = odbc_fetch_array($result_videos)){

                    $json_videos["url_videos"][] = array_map("utf8_encode", $rows_videos);
                    $videos_json= json_encode($json_videos);  
                }

                if(!isset($videos_json)){

                    echo "sin videos";
                }
                else{
                    echo $videos_json;

                }
            }

        }catch(Exception $e){

            echo 'Excepción capturada 9: ',  $e->getMessage(), "\n";
        }
    }
?>