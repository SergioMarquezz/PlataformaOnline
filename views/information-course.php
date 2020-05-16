<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Información de curso</title>
</head>
<body>
    <header>
        <!--Navbar -->
        <?php require_once "../includes/navbar.php"?>
    </header>
    <div class="d-flex" id="wrapper">
        <!-- Sidebar -->
        <?php require_once "../includes/navigation.php"?>
        
        <div id="page-content-wrapper">
            <button class="btn btn-sm btn-success" id="menu-toggle">Mostrar Menú</button>
            <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-md-5 col-sm-12">
                        <video id="video-source" class="embed-responsive embed-responsive-16by9">
                            
                        </video>
                        <h4 class="card-title"><strong id="strong-title"></strong></h4>
                    </div>
                    <div class="col-md-7 col-sm-12 mt-3">
                        <div class="alert alert-dark alert-information-student" role="alert" id="singned-studnets">
                           
                        </div>
                        <div class="alert alert-success alert-information-free" role="alert">
                            ESTE CURSO ES GRATUITO PUEDES ACCEDER AL CONTENIDO EN CUALQUIER MOMENTO
                        </div>
                        <div class="alert alert-success alert-information-free" role="alert">
                            INSCRIBETE SOLO CON AGREGAR ESTE CURSO A TU LISTA
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-12">
                        <h6><strong>Este curso incluye</strong></h6>
                        <ul>
                            <li id="hours"></li>
                            <li id="months"></li>
                            <li id="lessons"></li>
                            <li>Acceso ilimiltado</li>
                            <li>Constancia de acreditación</li>
                        </ul>
                       <button class="btn btn-success mr-3" id="course-lits">Agregar a mi lista de cursos</button>
                    </div>
                    <div class="col-md-8 col-sm-12">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="description-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                    Descripción del curso
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="modules-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                    Módulos del curso
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="themes-tab" data-toggle="tab" href="#themes" role="tab" aria-controls="themes" aria-selected="false">
                                    Todos los temas del curso
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="card card-description mt-3">
                                    <div class="card-body" id="card-description">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade modules" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div id="div-modules">
                                
                                </div>
                            </div>
                            <div class="tab-pane fade modules" id="themes" role="tabpanel" aria-labelledby="themes-tab">
                                <div id="div-themes">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script type="text/javascript" src="../js/information-course.js"></script>
</body>
</html>