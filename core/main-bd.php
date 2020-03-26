<?php

    require_once "connection.php";

     function clearString($string){
            
        $string = trim($string);
        $string = stripslashes($string);
        $string = str_ireplace("<script>", "", $string);
        $string = str_ireplace("</script>", "", $string);
        $string = str_ireplace("<script src", "", $string);
        $string = str_ireplace("<script type=", "", $string);
        $string = str_ireplace("SELECT * FROM", "", $string);
        $string = str_ireplace("DELETE  FROM", "", $string);
        $string = str_ireplace("INSERT INTO", "", $string);
        $string = str_ireplace("--", "", $string);
        $string = str_ireplace("==", "", $string);
        $string = str_ireplace("{", "", $string);
        $string = str_ireplace("}", "", $string);
        $string = str_ireplace("[", "", $string);
        $string = str_ireplace("]", "", $string);

        return $string;
    }

    function randomNumber($letter, $lenght,$number){

        for($i=1; $i<=$lenght; $i++){
            $number = rand(0,9);
            $letter.= $number;
        }

        return $letter."-".$number;
    }



    function executeQuery($query){
         
        global $connection;
        $execute = odbc_exec($connection,$query) or die (odbc_errormsg());
        return $execute;
    }


?>