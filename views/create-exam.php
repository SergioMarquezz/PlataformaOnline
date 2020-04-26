<?php require_once "../includes/links.php" ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IFPP Crea examen</title>
</head>
<body>
    <header>
        <!--Navbar -->
        <?php require_once "../includes/navbar.php"?>
    </header>
    <div class="d-flex" id="wrapper">
        <?php require_once "../includes/navigation.php"?>

        <div id="page-content-wrapper">
            <button class="btn btn-sm btn-save-question text-white" id="menu-toggle">Mostrar Menú</button>
            <div class="container-fluid">
                <h1 class="mt-4">Crea tu examen para el curso </h1>
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="card mt-4">
                            <div class="card-header">
                                <div class="row">
                                <div class=" col-md-3 col-sm-12">
                                    <h5 class="">Cursos en la plataforma</h5>
                                </div>
                                <div class="col-md-9 col-sm-12">
                                    <select class="browser-default custom-select" id="title-select-course">
                                            <option selected disabled>Seleccionar curso</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 disabled" id="div-questions">
                                        <ol>
                                            <li>
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-one"></strong></label>
                                                    <input type="text" class="form-control" id="question-one" placeholder="Pregunta 1">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-1" id="answer-1-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-1" id="answer-1-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-1"  id="answer-1-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-1"  id="answer-1-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-1">Guardar pregunta 1</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-two"></strong></label>
                                                    <input type="text" class="form-control" id="question-two" placeholder="Pregunta 2">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-2" id="answer-2-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-2" id="answer-2-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-2" id="answer-2-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-2" id="answer-2-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-2">Guardar pregunta 2</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-three"></strong></label>
                                                    <input type="text" class="form-control" id="question-three" placeholder="Pregunta 3">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-3" id="answer-3-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-3" id="answer-3-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-3" id="answer-3-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-3" id="answer-3-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-3">Guardar pregunta 3</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-four"></strong></label>
                                                    <input type="text" class="form-control" id="question-four" placeholder="Pregunta 4">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-4" id="answer-4-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-4" id="answer-4-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-4" id="answer-4-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-4" id="answer-4-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-4">Guardar pregunta 4</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-five"></strong></label>
                                                    <input type="text" class="form-control" id="question-five" placeholder="Pregunta 5">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-5" id="answer-5-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-5" id="answer-5-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-5" id="answer-5-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-5" id="answer-5-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-5">Guardar pregunta 5</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-six"></strong></label>
                                                    <input type="text" class="form-control" id="question-six" placeholder="Pregunta 6">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-6" id="answer-6-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-6" id="answer-6-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-6" id="answer-6-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-6" id="answer-6-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-6">Guardar pregunta 6</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-seven"></strong></label>
                                                    <input type="text" class="form-control" id="question-seven" placeholder="Pregunta 7">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-7" id="answer-7-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-7" id="answer-7-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-7" id="answer-7-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-7" id="answer-7-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-7">Guardar pregunta 7</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-eight"></strong></label>
                                                    <input type="text" class="form-control" id="question-eight" placeholder="Pregunta 8">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-8" id="answer-8-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-8" id="answer-8-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-8" id="answer-8-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-8" id="answer-8-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-8">Guardar pregunta 8</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-nine"></strong></label>
                                                    <input type="text" class="form-control" id="question-nine" placeholder="Pregunta 9">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-9" id="answer-9-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-9" id="answer-9-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-9" id="answer-9-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-9" id="answer-9-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-9">Guardar pregunta 9</button></h5>
                                            </li>
                                            <li class="mt-5">
                                                <div class="form-group">
                                                    <label for="" class="col-form-label"><strong id="label-ten"></strong></label>
                                                    <input type="text" class="form-control" id="question-ten" placeholder="Pregunta 10">
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-10" id="answer-10-1" placeholder="Respuesta 1">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-10" id="answer-10-2" placeholder="Respuesta 2">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-10" id="answer-10-3" placeholder="Respuesta 3">
                                                    </div>
                                                    <div class="col-md-3 col-sm-12">
                                                        <input type="text" class="form-control answer-question-10" id="answer-10-4" placeholder="Respuesta 4">
                                                    </div>
                                                </div>
                                                <h5 class=""><button class="btn btn-sm btn-save-questions text-white" id="btn-10">Guardar pregunta 10</button></h5>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Modal answer correct-->
            <div class="modal fade"  data-backdrop="static" data-keyboard="false" id="modal-answer-correct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-notify modal-success" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-white" id="title-question-modal"></h5>
                                <button id="btn-close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                               <p>Elije la respuesta correcta para esta pregunta</p>
                               <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="radio-answer-1" name="name-radio-answers">
                                    <label class="custom-control-label" for="radio-answer-1" id="label-answer-1"></label>
                               </div>
                               <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="radio-answer-2" name="name-radio-answers">
                                    <label class="custom-control-label" for="radio-answer-2" id="label-answer-2"></label>
                               </div>
                               <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="radio-answer-3" name="name-radio-answers">
                                    <label class="custom-control-label" for="radio-answer-3" id="label-answer-3"></label>
                               </div>
                               <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="radio-answer-4" name="name-radio-answers">
                                    <label class="custom-control-label" for="radio-answer-4" id="label-answer-4"></label>
                               </div>
                            </div>
                            <div class="modal-footer">
                                <input type="text" id="input-value-question">
                                <input type="text" id="input-text-question">
                                <button class="btn text-white" id="btn-answer-correct">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script type="text/javascript" src="../js/create-exam.js"></script>
</body>
</html>