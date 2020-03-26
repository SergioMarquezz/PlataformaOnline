<?php require_once "../includes/links.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IFPP Menú Principal</title>
</head>
<body >
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
                <nav aria-label="breadcrumb" class="mt-3" id="nav2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#about" class="text-white">Acerca del IFPP</a></li>
                        <li class="breadcrumb-item"><a href="#mission" class="text-white">Misión</a></li>
                        <li class="breadcrumb-item"><a href="#vision" class="text-white">Visión</a></li>
                        <li class="breadcrumb-item"><a href="#objective" class="text-white">Objetivo</a></li>
                        <li class="breadcrumb-item"><a href="#h4-logotipo" class="text-white">Logo</a></li>
                        <li class="breadcrumb-item"><a data-toggle="modal" data-target="#exampleModal" class="text-white">Contacto IFPP</a></li>
                    </ol>
                </nav>
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
                                <img class="d-block w-100" src="../img/foto-lejos.jpg" alt="Foto auditorio">
                                <div class="mask rgba-black-light"></div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="view">
                                <img class="d-block w-100" src="../img/foto-grupal.jpg" alt="Foto grupal">
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="view">
                                <img class="d-block w-100" src="../img/curso-policia.jpg" alt="Curso policia">
                                <div class="mask rgba-black-slight"></div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="view">
                                <img class="d-block w-100" src="../img/curso-1.jpg" alt="Curso">
                                <div class="mask rgba-black-slight"></div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="view">
                                <img class="d-block w-100" src="../img/curso-2.jpg" alt="Cursos">
                                <div class="mask rgba-black-slight"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Fin de carousel-->
                <h4 class="mt-4" id="about"><strong>Instituto de Fórmación Profesional de la Procuraduría</strong></h4>
                <p class="text-justify">
                    Fue creado en 1998, como órgano auxiliar de la Procuraduría General de Justicia del estado, 
                    con el objeto de diseñar, operar y controlar los métodos y requisitos de selección y evaluación 
                    del personal como única instancia de ingreso a la institución, así como diseñar, operar y controlar 
                    los programas de formación inicial, actualización, especialización y capacitación continua, además de 
                    la elaboración y control del sistema de evaluación continua de los servidores públicos 
                    de la procuración de justicia.
                </p>
                <p class="text-justify">
                Este Instituto surge derivado de esa necesidad como Unidad Administrativa en los términos de la Ley Orgánica del Ministerio Público vigente, 
                en la que establece que cumplirá con las responsabilidades constitucionales legales establecidas; con la finalidad de realizar la capacitación,
                actualización, especialización y formación de los servidores públicos para el cumplimiento de las funciones que tienen asignadas, 
                siendo estas desempeñadas por personal con formación y desarrollo profesional.
                </p>
                <h4 class="mt-4" id="mission"><strong>Misión</strong></h4>
                <p class="text-justify">
                    Cumplir con mayor eficiencia y transparencia, dentro del marco de la ley, la tarea de procuración de justicia 
                    a través de capacitación continua, uso de tecnologías adecuadas para vigilar el cumplimiento del orden 
                    constitucional, en representación de los individuos de la sociedad y el Estado.<br> Esta misión debe realizarse con estricto apego a 
                    los principios constitucionales y a las leyes que la rigen, así como en plena observancia de los derechos humanos, 
                    requisito indispensable para la vigencia del Estado de Derecho.
                </p>
                <h4 class="mt-4" id="vision"><strong>Visión</strong></h4>
                <p class="text-justify">
                    Ser una Instituto de Formación Profesional con rostro humano, de excelencia en su servicio y con un alto compromiso social, 
                    integrado por servidoras/es públicos altamente capacitados que empleen tecnología de vanguardia para la 
                    capacitación de las servidoras/es públicos que estén capacitados para la Investigación del Delito y 
                    la Persecución del Delincuente en forma ágil, confiable, transparente y científica, siendo éticamente 
                    responsables al basar su actuación en el respeto a los Derechos Humanos para responder así a la demanda social
                    de justicia y seguridad;colocándose como una Institución Modelo en el tema de Procuración de Justicia.
                </p>
                <h4 class="mt-4" id="objective"><strong>Objetivo</strong></h4>
                <p class="text-justify">
                    Presentar propuestas de programas de capacitación y profesionalización científicos para aplicarlos a el personal 
                    de la Procuraduría, así como diseñar y ejecutar políticas, estrategias y acciones de cooperación entre los 
                    integrantes del Instituto, así como satisfacer las necesidades del personal de la Procuraduría que acude a 
                    capacitarse en el Instituto de Formación Profesional y que tenga las herramientas necesarias para que a su vez
                    brinde la adecuada procuración de justicia, en un marco de respeto pero a la vez libertad mediante la vigilancia 
                    del estricto cumplimiento de la ley apegándonos a la política Pública del Lic. Omar Fayad Meneses, 
                    Gobernador Constitucional del Estado. 
                </p>
                <h4 class="mt-4" id="h4-logotipo"><strong>Logo del instituto</strong></h4>
                <div class="row">
                    <div class="col-md-2 col-sm-12">
                        <img src="../img/ifpp.png" width="120" height="130" class="d-inline-block align-top img-nav m-2" alt="">
                    </div>
                    <div class="col-md-10 col-sm-12">
                        <p class="text-justify">La educación como columna vertebral del desarrollo social, como eje estratégico que vincula los ámbitos en 
                            los que se desenvuelve todo ser humano y que resulta ser prioritario, por lo que se hace necesario e 
                            indispensable que instituciones como la Procuraduría General de Justicia, al interior, conforme un Instituto
                            como unidad administrativa que coadyuve a mejorar el nivel profesional de los Servidores Públicos que 
                            integran a la Institución, en un proceso educativo basado en los principios constitucionales de legalidad, 
                            eficiencia, profesionalismo y honradez, con la finalidad de fortalecer y desarrollar sus competencias 
                            laborales.
                        </p>
                        <h6><strong>SÍMBOLOS QUE REPRESENTAN EL LOGOTIPO</strong></h6>
                        <p class="text-justify">
                            El águila ha sido un símbolo celeste, ave de luz y de iluminación, de altitud y profundidad del aire, 
                            debido a su capacidad de elevarse por las nubes y acercarse al sol. A su vez, es "el ojo que todo lo ve", 
                            la inteligencia y la racionalidad; el águila es visionaria.
                        </p>
                    </div>
                </div>
                <!-- Modal Contact-->
                <div class="modal fade top" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-frame modal-top" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-3 col-sm-12">
                                        <h5><strong>Horario:</strong> 9:00 a 23:00 horas.</h5>
                                    </div>
                                    <div class="col-md-9 col-sm-12">
                                        <h5><strong>Números de contacto: </strong> (01 771) 71 16941 y 79000 ext. 9822, 9823 y 9824</h5>
                                    </div>
                                </div>
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-6 col-sm-12">
                                        <h5><strong>Domicilio: </strong>Carretera México – Pachuca Km. 84.5, Circuito Sector Primario S/N,Centro Cívico, Pachuca de Soto, Hgo., C.P. 42083</h5>
                                    </div>
                                </div>
                                <div class="row justify-content-md-center mb-3">
                                    <div class="col-md-auto">
                                        <a href="https://www.facebook.com/IFPPH/" title="Ifpp Hidalgo" target="_blank">
                                            <img class=" mr-4" src="../img/icons/facebook.png" alt="Facebook">
                                        </a> 
                                        <a href="https://twitter.com/ifp_pgjh?lang=es" target="_blank" title="@IFP_PGJH">
                                            <img class=" mr-4" src="../img/icons/twitter.png" alt="Twitter">
                                        </a>
                                        <a href="mailto:ifp_pgj@hidalgo.gob.mx" title="ifp_pgj@hidalgo.gob.mx">
                                            <img class="mr-4" src="../img/icons/mail.png" alt="Gmail">
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
    <?php require_once "../includes/footer.php"?>
    <?php require_once "../includes/scripts.php"?>
    <script type="text/javascript" src="../js/ifpp-main.js"></script>
</body>
</html>

