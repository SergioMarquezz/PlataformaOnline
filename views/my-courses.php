<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Mis Cursos</title>
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
                <h1 class="mt-4">Mis cursos</h1>
                    <div class="alert alert-dark" role="alert" id="alert-message">
                       <h4>Todavía no has empezado ningún curso...</h4>
                       <p>Accede al <a href="all-courses"><strong class="list-courses">listado de cursos</strong></a> donde podrás buscar y filtrar los cursos que ofrecemos,
                          elige alguno que quieras empezar.
                       </p>
                    </div>
                <div id="div-my-courses">
        
                </div>
            </div>
        </div>
    </div>
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
    <script type="text/javascript" src="../js/my-courses.js"></script>
</body>
</html>