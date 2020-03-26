<?php

    if(!session_id()){

        session_start();
    }
?>

<div class="border-right" id="sidebar-wrapper">
    <div class="sidebar-heading text-white">Cursos Online </div>
    <div class="list-group list-group-flush">
        <a href="../views/ifpp-main" class="list-group-item list-group-item-action text-white">Menú Principal
            <img src="../img/icons/menu.png" class="menu">
        </a>
        <a href="../views/my-courses" id="my-courses" class="list-group-item list-group-item-action text-white">Mis Cursos
            <img src="../img/icons/online-course.png" class="online">
        </a>
        <a href="#" id="certificate" class="list-group-item list-group-item-action text-white">Constancias de <br> Acreditación
            <img src="../img/icons/certificate.png" style="font-size: 1.5em;" class="icon-certificate">
        </a>
        <a href="../views/all-courses" class="list-group-item list-group-item-action text-white">Todos los cursos
            <img src="../img/icons/teacher.png" class="ml-4">
        </a>
    </div>
    <input type="hidden" id="value-user" value="<?php echo  $_SESSION['num_employee']?>">
    <input type="hidden" id="value-pass" value="<?php echo  $_SESSION['password']?>">
    <input type="hidden" id="value-person" value="<?php echo $_SESSION['key_person'] ?>">
</div>