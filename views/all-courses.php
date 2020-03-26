<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Cursos Agregados</title>
</head>
<body onload="nobackbutton();">
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
                <h1 class="mt-4">Todos los cursos</h1>
                <div class="card">
                    <div class="card-header row justify-content-end">
                        <div class="input-group mb-2 col-md-4 col-sm-12">
                            <div class="input-group-prepend">
                                <i class="fa fa-search form-control-feedback"></i>
                                <input type="text" class="form-control" id="search-course" placeholder="Titulo del curso">
                            </div>
                            <button class="btn-danger" id="button-search">Buscar</button>
                        </div>
                    </div>
                </div>
                <div class="card-body badge-light bq-success">
                    <div class="row justify-content-md-center">
                        <div class="col-md-auto">
                            <label for=""><strong>Filtrar por</strong></label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-sm-12">
                            <select class="browser-default custom-select" id="select-ordey-by">
                                <option selected disabled>Selecciona Opción</option>
                                <option value="1">Titulo: de la A a la Z</option>
                                <option value="2">Titulo: de la Z a la A</option>
                            </select>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <select class="browser-default custom-select" id="select-category">
                                <option selected disabled>Categoría</option>
                            </select>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <select class="browser-default custom-select" id="select-duration">
                            <option selected disabled>Duración del curso</option>
                                <option value="1">Un mes</option>
                                <option value="2">Dos meses</option>
                                <option value="3">Tres meses</option>
                                <option value="4">Cuatro meses</option>
                                <option value="5">Cinco meses</option>
                                <option value="6">Seis meses</option>
                                <option value="7">Siete meses</option>
                                <option value="8">Ocho meses</option>
                                <option value="9">Nueve meses</option>
                                <option value="10">Diez meses</option>
                                <option value="11">Once meses</option>
                                <option value="12">Doce meses</option>
                            </select>
                        </div>
                    </div>
                    <div id="row-all-courses">
                
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script type="text/javascript" src="../js/all-courses.js"></script>
</body>
</html>