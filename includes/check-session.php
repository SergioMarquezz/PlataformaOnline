<?php

session_start();

if(isset($_SESSION['name_user'])){

    $session['session'] = true;
    print json_encode($session);
    

}else{
    
    $session['session'] = false;
    print json_encode($session);
    
}

?>