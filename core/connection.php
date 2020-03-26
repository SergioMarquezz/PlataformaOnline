<?php

    //Constantes para conexion local
    $user = "ingsergio";
    $pass = "ingsergiomarquez";
    $server = "localhost";
    $database = "IfppCursos";

     //Lineas de conexion a base de datos
    $conne = "Driver={SQL Server Native Client 11.0};Server=$server;Database=$database;";
    $connection = odbc_connect($conne, $user, $pass);
 
?>