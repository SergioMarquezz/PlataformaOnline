<?php

    session_start();

?>

<nav class="mb-1 navbar navbar-expand-lg navbar-dark m-auto navbar-ifpp">
    <a class="navbar-brand" href="#"><img src="../img/ifpp.png" width="60" height="60" class="d-inline-block align-top img-nav m-2" alt=""></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
        aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="#"><h5 class="text-white"><?php echo TITLEBAR ?></h5>
                    <span class="sr-only">(current)</span>
                </a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto nav-flex-icons">
          <a href="../views/create-course"><button class="btn btn-outline-light mr-3" id="button-instructor" type="button">Instructor(a)</button></a>
          <input id="input-type" type="hidden" value="<?php echo $_SESSION['type_user'] ?>">
          <button class="btn btn-outline-light mr-3" id="button-alumno" type="button">Alumno(a)</button>
            <li class="nav-item dropdown mt-2">
                <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <img src="../img/icons/user.png" class="">
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                    <a class="dropdown-item" href="#"><?php echo $_SESSION['name_user'].' '.$_SESSION['father'];?></a>
                    <a class="dropdown-item" href="<?php echo $_SESSION['name_user'];?>" id="close-session">Cerrar Sesión</a>
                </div>
            </li>
        </ul>
    </div>
</nav>