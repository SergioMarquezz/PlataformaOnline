<?php

    if(isset($_GET['name_user'])){

        session_start();
        session_unset();
        session_destroy();

        echo "cerrar";
    }else{
        echo "abierto";
    }

?>