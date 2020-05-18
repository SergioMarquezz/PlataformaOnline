<?php 
    require_once "../includes/links.php";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Iniciar curso</title>
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
            <div class="container-fluid mt-4">
                <div class="row justify-content-end">
                    <div class="col-md-4 col-sm-12">
                        <h6 for="" style="font-size: 25px;">Mis Avances</label>
                        <div class="progress mb-3" style="height: 25px;" id="bar-progress"> 
                            <div id=barra-progreso class="progress-bar progress-bar-striped bg-success" role="progressbar"></div>
                        </div>
                    </div>
                </div>
                <nav class="navbar navbar-dark" style="background-color: #4B515D;">
                    <a class="navbar-brand" href="#" id="nav-title"></a>
                    <div class="row justify-content-end">
                        <div class="col-md-12 col-sm-12">
                            <input type="hidden" id="input-id-video">
                            <button class="btn btn-sm btn-content text-white" id="btn-full-screen">Pantalla completa</button>
                            <button class="btn btn-sm btn-content text-white" id="btn-play-pause">Play/Pause</button>
                            <button class="btn btn-sm btn-content text-white" id="btn-anterior">Anterior</button>
                            <button class="btn btn-sm btn-content text-white" id="btn-siguiente">Siguiente</button>
                        </div>
                    </div>
                </nav>
                <div class="row">
                    <div class="col-md-8 col-sm-12">
                        <div id="div-video">
                         
                        </div>
                        <h2 class="mt-3">Acerca de este curso</h2>
                        <hr>
                        <div class="row">
                            <div class="col-md-4 col-sm-12">
                                <h4 id="h4-students"></h4>
                            </div>
                            <div class="col-md-8 col-sm-12">
                                <h4 id="h4-lessons"></h4>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <h4>Disponible en cualquier momento desde cualquier lugar</h5>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <h4>Constancia de acreditación</h5>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <h4>Descripción</h5>
                                <p id="paragraph-video"></p>
                            </div>
                        </div>
                    </div>
                   <div class="col-md-4 col-sm-12">
                      <h2 class="mt-4">Contenido del curso</h2>
                           <div class="scroll-videos">
                           <div id="accordion">
                                <div id="content-courses" class="row">
                            
                                </div>
                                <h2 class='mt-4'></h2>
                                <div class='row'>
                                    <div class="col-md-12 col-sm-12">
                                        <div class="card">
                                            <div class="card-header">
                                                <div class='row'>
                                                    <div class="col-md-8 col-sm-12">
                                                        <h6 class='title-h6'><strong>Materiales de apoyo</strong></h5>
                                                       
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <a id="show-material" class="btn btn-sm text-white"  data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" aria-controls="collapseOne">
                                                            ver
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="collapseOne" class='collapse' aria-labelledby="collapseOne" data-parent='#accordion'>
                                            <div class="card-body">
                                                <ol class="flex-column" id="material-support">
                                                    
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                    <div class="card">
                                        <div class="card-header">
                                            <div class="row">
                                            <div class="col-md-7 col-sm-12">
                                            <h4 class='title-h6'><strong>Examen final</strong></h4>
                                        </div>
                                        <div class="col-md-5 col-sm-12">
                                            <a id="btn-evaluation" class="btn btn-sm text-white">
                                                Realizar
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
     
        <!-- Modal temas-->
        <div class="modal fade"  data-backdrop="static" data-keyboard="false" id="modalThemes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Temas del módulo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <p>Selecciona un tema de este módulo para ir avanzando y puedas terminar el curso</p>
            <select class="browser-default custom-select" id="option-themes">

            </select>
            </div>
            <div class="modal-footer">
                <button type="button" id="select-themes" class="btn text-white">Seleccionar</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script type="text/javascript" src="../js/start-course.js"></script>
</body>
</html>