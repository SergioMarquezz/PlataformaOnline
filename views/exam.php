<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Examen de acreditación</title>
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
            <div class="container-fluid">
                <div class="row mt-5">
                    <div class="col-md-3 col-sm-12">
                        <img src="../img/ifpp.png" width="200" height="200" alt="">
                    </div>
                    <div class="col-md-9 col-sm-12">
                        <h2><strong>¡Enhorabuena, has teminado el curso!</strong></h2>
                        <p>
                            <strong>
                                Es importante que realices un examen de evaluación y lo apruebes para poder
                                generarte tu constancia de acreditación.
                            </strong>
                        </p>
                        <p>
                            <strong>
                                El examen se ah eleborado con la información disponible en los videos del curso.
                                Para aprobar el examen necesitaras una calificación mínima de 6.
                            </strong>
                        </p>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-md-3 col-sm-12">
                        Tiempo de finalización 60 minutos
                        <div class="alert alert-warning" role="alert">
                            <p class="mt-2"><span id="minutes">0</span>:<span id="seconds">0</span></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <ol>
                            <li>¿Qué es un delito?</li>
                            <div class="custom-control custom-radio mt-3">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">a) Default unchecked</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <li class="mt-3">¿Qué es un homicidio?</li>
                            <div class="custom-control custom-radio mt-3">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <li class="mt-3">¿Qué es un secuestro?</li>
                            <div class="custom-control custom-radio mt-3">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <li class="mt-3">¿Qué es un robo?</li>
                            <div class="custom-control custom-radio mt-3">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <li class="mt-3">¿Qué es un homicidio doloso?</li>
                            <div class="custom-control custom-radio mt-3">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
                                <label class="custom-control-label" for="defaultUnchecked">b) Default unchecked</label>
                            </div>
                        </ol>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-6 col-sm-12">
                        <button class="btn btn-sm btn-success" id="" data-toggle="modal" data-target="#modal-qualification">Enviar respuestas</button>
                    </div>
                </div>
            </div>
            <!-- Modal qualification-->
            <div class="modal fade" id="modal-qualification" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-7 col-sm-12">
                                    <img src="../img/secuestro.png" alt="">
                                    <h4 class="card-title"><strong>Detención en robo de vehículos</strong></h4>
                                </div>
                                <div class="col-md-5 col-sm-12">
                                    <div class="alert alert-success alert-information-student" role="alert">
                                        <h4>Felicitaciones has aprobado el examen del curso</h4>
                                        <p>La calificación mínima para aprobar es de 6.</p>
                                    </div>
                                    <div class="alert alert-success alert-information-free" role="alert">
                                        <h4 class="text-center">Tu calificación final</h4>
                                        <p class="text-center">8</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-sm-12">
                                    <p>
                                        El examen lo has aprobado y puedes obtener tu constancia de acreditación
                                        la cual estará siempre disponible en tu perfil de la plataforma
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success">Obtener mi constancia</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
</body>
</html>