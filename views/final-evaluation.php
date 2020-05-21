<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Fin del Curso</title>
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
                                El examen se ah eleborado con la información disponible en los videos y material de apoyo de cada
                                tema del curso. Para aprobar el examen necesitaras una calificación mínima de 6.
                                
                            </strong>
                        </p>
                        <p>
                            <strong class="h4">Importante:</strong> <label for="">Al obtener tu constancia de 
                                acreditación podrás verla en tu perfil cada ves que la requieras y si lo deseas
                                tendras la opción de descargarla e imprimirla.
                            </label>
                        </p>
                       <a href=""><button class="btn btn-sm btn-success" id="start-exam">Comenzar Examen</button></a>
                      <strong>*Recuerda que solo tendrás 1 hora para realizar el examen despues de ese tiempo
                          el examen se cerrara automaticamente* ¡Mucho Exito! </strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script>
        
        function getUrl(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
        
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
        
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        }
        $("#start-exam").click(function (e) { 
            e.preventDefault();
            window.location.href = 'exam?idcourse='+getUrl('course');
        });
    </script>
</body>
</html>