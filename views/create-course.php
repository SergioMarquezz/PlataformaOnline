<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Crea tu curso</title>
    <link rel="stylesheet" href="../bootstrap/css/datepicker.min.css">
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
            <div class="container-fluid">
                <h1 class="mt-4">Crea el programa de tu curso</h1>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-title" class="col-form-label"><strong>Elige un título para el curso</strong></label>
                                            <input type="text" class="form-control" id="course-title" placeholder="Título del curso">
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-12">
                                        <div class="form-group" id="category">
                                            <label for="course-category" class="col-form-label"><strong>¿A que categoría pertenece?</strong></label>
                                            <select class="browser-default custom-select" id="category-instructor">
                                                <option selected>Seleccionar</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-lessons" class="col-form-label"><strong>Total de clases durante el curso</strong></label>
                                            <input type="number" maxlength="3" class="form-control" min="0" id="course-lessons" placeholder="Escribe el numero de clases">
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-hours" class="col-form-label"><strong>Total de horas del curso</strong></label>
                                            <input type="number"  maxlength="3" class="form-control" min="0" id="course-hours" placeholder="Escribe el numero de horas">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-start" class="col-form-label"><strong>Fecha de inicio del curso</strong></label>
                                            <input type="text" class="form-control" id="course-start" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-end" class="col-form-label"><strong>Fecha de fin del curso</strong></label>
                                            <input type="text" class="form-control" id="course-end" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-end" class="col-form-label"><strong>Descripción del curso</strong></label>
                                            <textarea name="" id="text-description" cols="40" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button class="ml-3 btn text-white float-right" id="btn-save-course">Continuar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="row-modules">
                                    <div class="col-md-12 col-sm-12" id="col-modules">
                                        <h4 class="mt-4 h5-shape">Empieza a darle forma a tu curso creando secciones, clases y agregando videos</h5>
                                        <div class="row mt-5">
                                            <div class="col-md-6 col-sm-12">
                                                <h4 class="mt-5">Contenido del curso</h4>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <input id="ad-module" class="mt-3" title="Agregar nuevo modulo" type="image" src="../img/icons/new-theme.png" width="48" height="48">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn text-white" id="btn-finish-program">Finalizar módulos</button> 
                            </div>
                        </div>
                    </div>
                </div>
                  <!-- Modal cursos-->
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div class="modal fade"  data-backdrop="static" data-keyboard="false" id="modalCreateCourse" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-notify modal-success" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-white" id="exampleModalLabel">Cursos existentes</h5>
                                    </div>
                                    <div class="modal-body">
                                        <p><strong>Si tu curso ya esta registrado y quieres solo agregar un nuevo tema o módulo, 
                                                    selecciona el que corresponda; si deseas crear un nuevo curso, presiona el boton nuevo.
                                        </strong></p>
                                        <select class="browser-default custom-select" id="select-courses-existentes">
                                                <option value="" selected disabled>Seleccionar</option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="button-add-course" class="btn text-white">Nuevo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                <!-- Modal temas curso-->
                <div class="modal fade"  data-backdrop="static" data-keyboard="false" id="modalThemesCourse" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-notify modal-success" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-white" id="h5-modal-themes"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div id="sin-temas">
                                
                                </div>
                                <ol id="ol-themes">
                                    
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal material themes-->
                <div class="modal fade"  data-backdrop="static" data-keyboard="false" id="modalMaterialThemes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-notify modal-success" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-white" id="h5-modal-material"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div id="sin-material">
                                
                                </div>
                                <ol id="ol-material">
                                    
                                </ol>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="button-video" class="btn text-white">Video del tema</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal video-->
                <div class="modal fade"  data-backdrop="static" data-keyboard="false" id="modalVideo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-notify modal-success" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-white" id="h5-modal-video"></h5>
                                <button id="btn-close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div id="div-modal-video">
                                    <video class="embed-responsive embed-responsive-16by9" id="video-modal" controls>

                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!--Modal update course-->
                <div class="modal fade top" data-backdrop="static" data-keyboard="false" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-frame modal-notify modal-top modal-success" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-white" id="">Actualización de módulo</h5>
                                <button id="" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" id="value-id-module">
                                <p><strong> Puedes realizar cambios para este módulo.</strong>
                                    <ul>
                                        <li>
                                            <strong>Actualizar nombre del módulo:</strong> Solo escribe el nuevo nombre del módulo y presiona el botón guardar actualización
                                        </li>
                                        <li>
                                            <strong>Actualizar nombre de algún tema:</strong> Selecciona el tema que deseas actualizar, cambia el nombre y despues presiona el botón guardar actualización
                                        </li>
                                        <li>
                                            <strong>Eliminar un tema: </strong> Selecciona el tema que quieres eliminar y posteriormente presiona el botón eliminar tema seleccionado
                                        </li>
                                        <li>
                                            <strong>Agregar material de apoyo o video para un tema:</strong> Selecciona el tema al que desea agregar material o video y suba el contenido 
                                        </li>
                                        <li>
                                            <strong>Agregar nuevo tema para el módulo:</strong> Simplemente escribe el nombre de un nuevo tema y presiona el botón de agregar tema
                                        </li>
                                    </ul>
                                </p>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12">
                                        <select class="browser-default custom-select options" id="select-options">
                                            <option selected disabled value="0">¿Qué desea actualizar?</option>
                                            <option value="1">El nombre del módulo</option>
                                            <option value="2">El nombre de un tema</option>
                                            <option value="3">Agregar un nuevo tema</option>
                                            <option value="4">Eliminar un tema</option>
                                            <option value="5">Agregar material de apoyo o video para un tema</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-start" class="">Cambiar nombre del módulo</label>
                                            <input disabled type="text" class="form-control" id="update_name">
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-start" class="">Temas del módulo</label>
                                            <select disabled class="browser-default custom-select" id="update-themes">
                                                    
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-start" class="">Cambiar nombre del tema</label>
                                            <input disabled type="text" class="form-control" id="input-new-theme">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <label for="course-start" class="">Nombre de un nuevo tema</label>
                                            <input disabled type="text" class="form-control" id="input-new-theme-update">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <label class="" for="">Subir archivo o video</label>
                                        <div class="custom-file">
                                            <input disabled type="file" class="custom-file-input" id="customFileLang" lang="es">
                                            <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button disabled type="button" id="btn-update-new-theme" class="btn text-white">Agregar tema</button>
                                <button disabled type="button" id="btn-delete-theme" class="btn text-white">Eliminar tema seleccionado</button>
                                <button disabled type="button" id="btn-update-actualizacion" class="btn text-white">Guardar actualización</button>       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script src="../js/create-course.js"></script>
    <script src="../js//messages-swal.js"></script>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script src="../bootstrap/js/datepicker.min.js"></script>
    <script src="../bootstrap/js/datepicker.es.js"></script>
</body>
</html>