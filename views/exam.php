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
                    <div class="col-md-9 col-sm-9 mt-5">
                        <h4 id="full_name_student">Alumno(a):</h4>
                        <h4 id="title-course-exam">Curso:</h4>
                        <h4>Fecha de realización: <?php echo date("d-m-Y"); ?></h4>
                    </div>
                    <div class="col-md-3 col-sm-12">
                        <h4>Tiempo de finalización 60 minutos</h4>
                        <div class="alert alert-warning" role="alert" id="time-exam">
                            <p class="mt-2 text-center" id="time-trascurrido">Tiempo Transcurrido<br><span id="minutes"> 0</span><span id="dos-points">:</span><span id="seconds">0</span></p>
                            <p></p>
                        </div>
                    </div>
               
                </div>
                <div class="row" id="div-radio">
                    <div class="col-md-6 col-sm-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>1</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="one-question" disabled>
                            <input type="hidden" class="form-control" id="1-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input input-1" id="answer-correct-1-1" name="name-answer-correct-1">
                            <label class="custom-control-label" for="answer-correct-1-1" id="label-correct-1-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input  input-2" id="answer-correct-1-2" name="name-answer-correct-1">
                            <label class="custom-control-label" for="answer-correct-1-2" id="label-correct-1-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input input-1" id="answer-correct-1-3" name="name-answer-correct-1">
                            <label class="custom-control-label" for="answer-correct-1-3" id="label-correct-1-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input input-1" id="answer-correct-1-4" name="name-answer-correct-1">
                            <label class="custom-control-label" for="answer-correct-1-4" id="label-correct-1-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>2</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="two-question" disabled>
                            <input type="hidden" class="form-control" id="2-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-2-1" name="name-answer-correct-2">
                            <label class="custom-control-label" for="answer-correct-2-1" id="label-correct-2-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-2-2" name="name-answer-correct-2">
                            <label class="custom-control-label" for="answer-correct-2-2" id="label-correct-2-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-2-3" name="name-answer-correct-2">
                            <label class="custom-control-label" for="answer-correct-2-3" id="label-correct-2-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-2-4" name="name-answer-correct-2">
                            <label class="custom-control-label" for="answer-correct-2-4" id="label-correct-2-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>3</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="three-question" disabled>
                            <input type="hidden" class="form-control" id="3-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-3-1" name="name-answer-correct-3">
                            <label class="custom-control-label" for="answer-correct-3-1" id="label-correct-3-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-3-2" name="name-answer-correct-3">
                            <label class="custom-control-label" for="answer-correct-3-2" id="label-correct-3-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-3-3" name="name-answer-correct-3">
                            <label class="custom-control-label" for="answer-correct-3-3" id="label-correct-3-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-3-4" name="name-answer-correct-3">
                            <label class="custom-control-label" for="answer-correct-3-4" id="label-correct-3-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>4</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="four-question" disabled>
                            <input type="hidden" class="form-control" id="4-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-4-1" name="name-answer-correct-4">
                            <label class="custom-control-label" for="answer-correct-4-1" id="label-correct-4-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-4-2" name="name-answer-correct-4">
                            <label class="custom-control-label" for="answer-correct-4-2" id="label-correct-4-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-4-3" name="name-answer-correct-4">
                            <label class="custom-control-label" for="answer-correct-4-3" id="label-correct-4-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-4-4" name="name-answer-correct-4">
                            <label class="custom-control-label" for="answer-correct-4-4" id="label-correct-4-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>5</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="five-question" disabled>
                            <input type="hidden" class="form-control" id="5-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-5-1" name="name-answer-correct-5">
                            <label class="custom-control-label" for="answer-correct-5-1" id="label-correct-5-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-5-2" name="name-answer-correct-5">
                            <label class="custom-control-label" for="answer-correct-5-2" id="label-correct-5-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-5-3" name="name-answer-correct-5">
                            <label class="custom-control-label" for="answer-correct-5-3" id="label-correct-5-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-5-4" name="name-answer-correct-5">
                            <label class="custom-control-label" for="answer-correct-5-4" id="label-correct-5-4"></label>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>6</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="six-question" disabled>
                            <input type="hidden" class="form-control" id="6-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-6-1" name="name-answer-correct-6">
                            <label class="custom-control-label" for="answer-correct-6-1" id="label-correct-6-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-6-2" name="name-answer-correct-6">
                            <label class="custom-control-label" for="answer-correct-6-2" id="label-correct-6-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-6-3" name="name-answer-correct-6">
                            <label class="custom-control-label" for="answer-correct-6-3" id="label-correct-6-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-6-4" name="name-answer-correct-6">
                            <label class="custom-control-label" for="answer-correct-6-4" id="label-correct-6-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>7</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="seven-question" disabled>
                            <input type="hidden" class="form-control" id="7-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-7-1" name="name-answer-correct-7">
                            <label class="custom-control-label" for="answer-correct-7-1" id="label-correct-7-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-7-2" name="name-answer-correct-7">
                            <label class="custom-control-label" for="answer-correct-7-2" id="label-correct-7-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-7-3" name="name-answer-correct-7">
                            <label class="custom-control-label" for="answer-correct-7-3" id="label-correct-7-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-7-4" name="name-answer-correct-7">
                            <label class="custom-control-label" for="answer-correct-7-4" id="label-correct-7-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>8</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="eigth-question" disabled>
                            <input type="hidden" class="form-control" id="8-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-8-1" name="name-answer-correct-8">
                            <label class="custom-control-label" for="answer-correct-8-1" id="label-correct-8-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-8-2" name="name-answer-correct-8">
                            <label class="custom-control-label" for="answer-correct-8-2" id="label-correct-8-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-8-3" name="name-answer-correct-8">
                            <label class="custom-control-label" for="answer-correct-8-3" id="label-correct-8-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-8-4" name="name-answer-correct-8">
                            <label class="custom-control-label" for="answer-correct-8-4" id="label-correct-8-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>9</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="nine-question" disabled>
                            <input type="hidden" class="form-control" id="9-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-9-1" name="name-answer-correct-9">
                            <label class="custom-control-label" for="answer-correct-9-1" id="label-correct-9-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-9-2" name="name-answer-correct-9">
                            <label class="custom-control-label" for="answer-correct-9-2" id="label-correct-9-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-9-3" name="name-answer-correct-9">
                            <label class="custom-control-label" for="answer-correct-9-3" id="label-correct-9-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-9-4" name="name-answer-correct-9">
                            <label class="custom-control-label" for="answer-correct-9-4" id="label-correct-9-4"></label>
                        </div>
                        <div class="input-group mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b>10</b></span>
                            </div>
                            <input type="text" class="form-control input-questions-course" id="ten-question" disabled>
                            <input type="hidden" class="form-control" id="10-question-hidden" >
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mt-3">
                            <input type="radio" class="custom-control-input" id="answer-correct-10-1" name="name-answer-correct-10">
                            <label class="custom-control-label" for="answer-correct-10-1" id="label-correct-10-1"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-10-2" name="name-answer-correct-10">
                            <label class="custom-control-label" for="answer-correct-10-2" id="label-correct-10-2"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-10-3" name="name-answer-correct-10">
                            <label class="custom-control-label" for="answer-correct-10-3" id="label-correct-10-3"></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="answer-correct-10-4" name="name-answer-correct-10">
                            <label class="custom-control-label" for="answer-correct-10-4" id="label-correct-10-4"></label>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12 col-sm-12">
                        <button class="btn btn-block btn-success mb-4 mt-5" id="submit-answers">Enviar respuestas</button>
                    </div>
                </div>
            </div>
             <!-- Modal qualification-->
            <div class="modal fade top" data-backdrop="static" data-keyboard="false" id="modalqualification" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-frame modal-notify modal-top modal-success" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title w-100 text-white" id="myModalLabel">Mis resultados</h4>
                                <button id="" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <div class="row">
                                <div class="col-md-7 col-sm-12">
                                <video class="embed-responsive embed-responsive-16by9" id="video-modal">
                                    <source src="../videos/Qué-es-word-y-para-que-sirve.mp4" type="video/mp4">
                                </video>
                                <h4 class="card-title"><strong id="title-course-result"></strong></h4>
                                </div>
                                <div class="col-md-5 col-sm-12">
                                    <h2 class="mb-4" id="h4-name-student"></h2>
                                    <div class="alert-information-student" role="alert">
                                        <h2 id="felicitaciones" class="text-justify"></h2>
                                        <p id="the-calification" class="text-justify">La calificación mínima para aprobar es de 6.</p>
                                    </div>
                                    <div class="alert-information-free" role="alert">
                                        <h2 class="text-center">Tu calificación final</h2>
                                        <p class="text-center" id="qualification"></p>
                                    </div>
                                    <h5 class="text-justify" id="text-exam-aprobado">
                                      
                                    </h5>
                                </div>
                            </div>
                                <div class="row col-md-6 col-sm-6">
                                    <ul class="list-group">
                                        <li class="list-group-item list-group-item-info justify-content-between align-items-center">
                                            Total de preguntas
                                            <span class="badge badge-info badge-pill" id="span_total"></span>
                                        </li>
                                        <li class="list-group-item list-group-item-success justify-content-between align-items-center">
                                            Respuestas correctas
                                            <span class="badge badge-success badge-pill" id="span_correct"></span>
                                        </li>
                                        <li class="list-group-item list-group-item-danger justify-content-between align-items-center">
                                            Respuestas incorrectas
                                            <span class="badge badge-danger badge-pill" id="span_incorrect"></span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="row mt-5">
                                    <div class="col-md-4 col-sm-4">
                                        <ul class="list-group">
                                            <li class="list-group-item justify-content-between align-items-center list-result text-white">Pregunta</li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-1"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-2"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-3"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-4"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-5"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-6"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-7"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-8"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-9"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-question-10"></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4 col-sm-4">
                                        <ul class="list-group">
                                            <li class="list-group-item justify-content-between align-items-center list-result text-white">Respuesta correcta</li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-1"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-2"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-3"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-4"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-5"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-6"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-7"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-8"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-9"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="list-answer-10"></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4 col-sm-4">
                                        <ul class="list-group">
                                            <li class="list-group-item justify-content-between align-items-center list-result text-white">Tu respuesta</li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-1"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-2"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-3"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-4"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-5"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-6"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-7"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-8"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-9"></li>
                                            <li class="list-group-item justify-content-between align-items-center" id="your-answer-10"></li>
                                        </ul>
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
    <script type="text/javascript" src="../js/exam.js"></script>
</body>
</html>