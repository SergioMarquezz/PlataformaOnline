<?php
    require_once "core/configGeneral.php";
    $year = date("Y");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php echo COMPANY ?></title>
    
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="md/css/mdb.css">
    <link rel="stylesheet" href="bootstrap/css/styles.css">

    <link rel="icon" href="img/logo_hgo.png">

</head>
<body>
    <header>
        <!--Navbar-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-ifpp">
            <a class="navbar-brand" href="#"><img src="img/ifpp.png" width="60" height="60" class="d-inline-block align-top img-nav m-2" alt=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="basicExampleNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                <a class="nav-link" href="#"><h5 class="text-white"><?php echo TITLEBAR ?></h5>
                    <span class="sr-only">(current)</span>
                </a>
                </li>
            </ul>
            <form class="form-inline">
                <div class="md-form my-0">
                    <button class="btn btn-outline-light mr-3" type="button" data-toggle="modal" data-target="#modalLoginForm">Iniciar Sesión</button>
                    <button class="btn btn-outline-light mr-3" type="button" data-toggle="modal" data-target="#modalRegistry">Registrate</button>
                </div>
            </form>
            </div>
        </nav>
        <!--Navbar-->
        <nav class="navbar navbar-expand-lg navbar-light navbar2">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="basicExampleNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                    </li>
                </ul>
                <form class="form-inline">
                    <a class="text-dark mr-sm-4" href="#"><b class="text-white">Cursos</b></a>
                    <a class="text-dark mr-sm-4" href="#"><b class="text-white">Preguntas frecuentes</b></a>
                    <a class="text-dark mr-sm-4" href="#"><b class="text-white">Autores</b></a>
                    <a class="text-dark mr-sm-4" href="#"><b class="text-white">Acerca de la plataforma</b></a>
                    <a class="text-dark mr-sm-4" href="#"><b class="text-white">Contacto</b></a>
                </form>
            </div>
        </nav>
    </header>

    <!--Carousel--> 
    <div id="carousel-example-2" class="carousel slide carousel-fade" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-2" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-2" data-slide-to="1"></li>
            <li data-target="#carousel-example-2" data-slide-to="2"></li>
            <li data-target="#carousel-example-2" data-slide-to="3"></li>
            <li data-target="#carousel-example-2" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <div class="view">
                    <img class="d-block w-100" src="img/portada-ifpph.jpg" alt="Portada IFPPH">
                    <div class="mask rgba-black-light"></div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="view">
                    <img class="d-block w-100" src="img/ifpp afuera.jpg" alt="IFPPH Afuera">
                </div>
            </div>
            <div class="carousel-item">
                <div class="view">
                    <img class="d-block w-100" src="img/auditorio-frente.jpg" alt="Foto audiatrio">
                    <div class="mask rgba-black-slight"></div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="view">
                    <img class="d-block w-100" src="img/dia-naranja.jpg" alt="Dia naranja">
                    <div class="mask rgba-black-slight"></div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="view">
                    <img class="d-block w-100" src="img/dia-maestro.jpg" alt="Dia del maestro">
                    <div class="mask rgba-black-slight"></div>
                </div>
            </div>
        </div>
    </div>
    <!--Fin de carousel-->
    <main class="container-fluid mt-4">
        <section>
            <h1>Cursos impartidos recientemente</h1>
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <div class="card">
                        <video class="embed-responsive embed-responsive-16by9" autoplay muted id="video1">
                            
                        </video>
                        <div class="card-body">
                            <h4 class="card-title" id="title-video1"></h4>
                            <p class="card-text" id="text-video1"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="card">
                        <video class="embed-responsive embed-responsive-16by9" autoplay muted id="video2">
                          
                        </video>
                        <div class="card-body">
                            <h4 class="card-title" id="title-video2"></h4>
                            <p class="card-text" id="text-video2"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="card">
                        <video class="embed-responsive embed-responsive-16by9" autoplay muted id="video3">
                          
                        </video>
                        <div class="card-body">
                            <h4 class="card-title" id="title-video3"></h4>
                            <p class="card-text" id="text-video3"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-4 col-sm-12">
                    <div class="card">
                        <video class="embed-responsive embed-responsive-16by9" autoplay muted id="video4">
                            
                        </video>
                        <div class="card-body">
                            <h4 class="card-title" id="title-video4"></h4>
                            <p class="card-text" id="text-video4"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="card">
                        <video class="embed-responsive embed-responsive-16by9" autoplay muted id="video5">
                            
                        </video>
                        <div class="card-body">
                            <h4 class="card-title" id="title-video5"></h4>
                            <p class="card-text" id="text-video5"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="card">
                        <video class="embed-responsive embed-responsive-16by9" autoplay muted id="video6">
                           
                        </video>
                        <div class="card-body">
                            <h4 class="card-title" id="title-video6"></h4>
                            <p class="card-text" id="text-video6"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row justify-content-md-center">
                    <div class="col-md-auto">
                        <button type="button" class="btn text-white" id="all-courses">Ver todos los cursos</button>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
              <div class="row mt-5">
                <div class="col-md-6 col-sm-12">
                    <h3>Desde tu casa, 100% Online</h3>
                    <p class=" text-justify">
                        Cursos online que podrás aprovechar al máximo accediendo desde cualquier ordenador o 
                        dispositivo con conexión a internet en cualquier momento sin importar tu distancia y ubicación. 
                        Solo inicia sesión y disfruta de cada curso que tenemos para ti
                    </p>
                </div>
                <div class="col-md-6 col-sm-12">
                    <h3>Regístrate y haz el curso de tu preferencia</h3>
                    <p class=" text-justify">
                        Si aún no tienes un perfil en nuestra plataforma, es momento de que te registres y 
                        puedas acceder a nuestros cursos que tenemos para ti, ampliaras tus conocimientos en los temas de tu interés.
                    </p>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-6 col-sm-12">
                    <h3>Cursos para trabajadores de la PGJEH</h3>
                    <p class=" text-justify">
                        Nuestros cursos van dirigidos al personal adscrito/a en la PGJEH con la finalidad de fortalecer sus conocimientos. 
                        A través de esta plataforma aprenderás desde los temas más básicos hasta los más avanzados. 
                        <br> ¡Explora nuestro catálogo de cursos y busca el más adecuado para ti!
                    </p>
                </div>
                <div class="col-md-6 col-sm-12">
                    <h3>Recursos siempre disponibles</h3>
                    <p class=" text-justify">
                        Los materiales están siempre a tu disposición. Ingresa al curso que más se adapte a tus necesidades; 
                        es importarte que realices todo el curso y que superes el examen, posteriormente obtengas tu constancia 
                        de acreditación por parte del instituto
                    </p>
                </div>
              </div>
                <div class="container">
                    <div class="row justify-content-md-center mb-3">
                        <div class="col-md-auto">
                           <a href="https://www.facebook.com/IFPPH/" title="IFPPH Hidalgo" target="_blank">
                                <img class=" mr-4" src="img/icons/facebook.png" alt="Facebook">
                            </a> 
                           <a href="https://twitter.com/ifp_pgjh?lang=es" target="_blank" title="@IFP_PGJH">
                               <img class=" mr-4" src="img/icons/twitter.png" alt="Twitter">
                            </a>
                           <a href="mailto:ifp_pgj@hidalgo.gob.mx" title="ifp_pgj@hidalgo.gob.mx">
                               <img class="mr-4" src="img/icons/mail.png" alt="Gmail">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!--Modal Login-->
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-notify modal-success" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold text-white">Inicia Sesión con tu Cuenta</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">
                    <div class="form-group">
                        <label for="login-name" class="col-form-label"><strong>Usuario</strong></label>
                        <input maxlength="4" type="text" class="form-control" id="login-name" placeholder="Ingresa tu numero de empleado(a) ó instuctor(a)">
                    </div>
                    <div class="form-group">
                        <label for="login-password" class="col-form-label"><strong>Contraseña</strong></label>
                        <input maxlength="50" type="password" class="form-control" id="login-password" placeholder="Escribe tu contraseña">
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn text-white" id="btn-start">Inicia Sesión</button>
                </div>
                <a data-toggle="modal" data-target="#modalRecoverForm" class="text-center mb-3 recover-password"><strong>¿Has olvidado la contraseña?</strong></a>
                <label for="" class="text-center mb-3"><strong>¿No tienes una cuenta?</strong><a data-toggle="modal" data-target="#modalRegistry" class="registry">&nbsp;&nbsp;<strong>Registrate</strong></a></label>
            </div>
        </div>
    </div>
       <!--Modal Recuperar contraseña-->
       <div class="modal fade" data-backdrop="static" data-keyboard="false" id="modalRecoverForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-notify modal-success" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold text-white">Recupera tu contraseña</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">
                    <div class="form-group">
                        <label for="" class="text-justify">
                            Es importante que proporciones correctamente tu número de empleado(a) instructor(a) 
                            junto con tu fecha de nacimiento para poder detectar que realmente estas registrado(a) 
                            en la plataforma y puedas recuperar tu contraseña.
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="recover-num" class="col-form-label"><strong id="text-employee">Número de empleado(a) o instrcutor(a) </strong></label>
                        <input maxlength="4" type="text" class="form-control inputs-registry" id="recover-num">
                    </div>
                    <div class="form-group">
                        <label for="recover-birth" class="col-form-label"><strong>Fecha de nacimiento</strong></label>
                        <input maxlength="4" type="date" class="form-control inputs-registry" id="recover-birth">
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn text-white" id="btn-continue">Continuar</button>
                </div>
            </div>
        </div>
    </div>
    <!--Modal registry-->
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="modalRegistry" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-notify modal-success modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title w-100 text-white" id="myModalLabel"><strong>Completa tus datos</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-warning" role="alert">
                    La información que registres es la que se usara para generar tus constancias de que has realizado el curso, 
                    procura llenar correctamente cada campo. No podrás cambiar los datos a excepción de tu contraseña
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12 mt-3">
                        <div>
                            <label><strong>Tipo de usuario</strong></label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input value="2" type="radio" class="custom-control-input" id="radio-instructor" name="type-user">
                            <label class="custom-control-label" for="radio-instructor">Instructor(a)</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input value="3" type="radio" class="custom-control-input" id="radio-student" name="type-user">
                            <label class="custom-control-label" for="radio-student">Alumno(a)</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="registry-num" class="col-form-label"><strong id="text-employee">Número de empleado(a)</strong></label>
                            <input maxlength="4" type="text" class="form-control inputs-registry" id="registry-num">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label for="registry-name" class="col-form-label"><strong>Nombre</strong></label>
                            <input maxlength="30" type="text" class="form-control inputs-registry" id="registry-name">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label for="registry-father" class="col-form-label"><strong>Apellido Paterno</strong></label>
                            <input maxlength="40" type="text" class="form-control inputs-registry" id="registry-father">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label for="registry-mother" class="col-form-label"><strong>Apellido Materno</strong></label>
                            <input maxlength="40" type="text" class="form-control inputs-registry" id="registry-mother">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label for="registry-country" class="col-form-label"><strong>País</strong></label>
                            <select class="browser-default custom-select inputs-registry" id="registry-country">
                                <option selected>Seleccionar</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label for="registry-state" class="col-form-label"><strong>Estado</strong></label>
                            <select class="browser-default custom-select inputs-registry" id="registry-state">
                                <option selected>Seleccionar</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label for="registry-municipality" class="col-form-label"><strong>Municipio</strong></label>
                            <select class="browser-default custom-select inputs-registry" id="registry-municipality">
                                <option selected>Seleccionar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="container mt-4">
                <div class="row justify-content-md-center">
                    <div class="col-md-auto">
                        <label for=""><strong>Fecha de nacimiento</strong></label>
                    </div>
                    <input type="hidden" id="birth">
                </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <input maxlength="4" type="text" class="form-control inputs-registry" id="registry-year" placeholder="Año">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <select class="browser-default custom-select inputs-registry" id="registry-month">
                                <option selected disabled>Mes</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <select class="browser-default custom-select inputs-registry" id="registry-day">
                                <option selected disabled>Día</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="registry-password" class="col-form-label"><strong>Contraseña</strong></label>
                            <input maxlength="50" type="password" class="form-control inputs-registry" id="registry-password">
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="registry-gender" class="col-form-label"><strong>Sexo</strong></label>
                            <select class="browser-default custom-select inputs-registry" id="registry-gender">
                                <option selected>Sin seleccionar</option>
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                            </select>
                        </div>
                    </div>
                </div>
               <!-- <div class="row">
                    <div class="col-md-12 col-sm-12">
                       <strong>
                           <label for="" class="text-justify">
                            Al registrarte, aceptas los <a href="" class="condition">términos y condiciones</a> y estarás de acuerdo
                            con la <a href="" class="politics">política de privacidad</a>
                            </label>
                            <label for="">¿Ya tienes una cuenta? <a href="" class="login-registry">Inicia Sesión</a></label>
                       </strong>
                    </div>
                </div>-->
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row m-auto">
                        <button type="button" class="btn btn-lg text-white" id="btn-registry">Registrarme</button>
                    </div>
                </div>
                
            </div>
            </div>
        </div>
    </div>
    <!--Footer-->

    <div class="container-fluid">
        <div class="row footer text-center">
            <div class="col-md-4 col-sm-12 mt-4">
                <img src="img/logo_hgo.png" width="55" height="55" class="d-inline-block align-top img-nav" alt="">
                <p class="text-white">Procuraduría General de Justicia</p>
            </div>
            <div class="col-md-4 col-sm-12 mt-2">
                <img src="img/escudo_blanco.svg" width="70" height="70" class="d-inline-block align-top img-nav" alt="">
                <p class="text-white">&copy; <?php echo $year?> Gobierno del Estado de hidalgo</p>
            </div>
            <div class="col-md-4 col-sm-12 mt-4">
                <strong class="text-white">Contacto</strong><br>
                <label for="" class="text-white">Carretera México – Pachuca Km 84.5, Centro Cívico</label> <br>
                <label for="" class="text-white">Pachuca de Soto, Hidalgo, México</label><br>
                <label for="" class="text-white">+52 (01 771) 71 16941 y 79000 Ext. 9822,9823,9824</label>
            </div>
        </div>
    </div>
   
    <script type="text/javascript" src="bootstrap/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="bootstrap/js/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="md/js/mdb.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  
</body>
</html>