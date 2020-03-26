var id_course = getUrlParameter('course');
$(document).ready(function () {
  
    informationCourse();
    modules();
    urlVideo();
    
});

function informationCourse(){

    var description = getUrlParameter('desc'),
    title = getUrlParameter('title'),
    lessons = getUrlParameter('lessons'),
    hours = getUrlParameter('hours'),
    months = getUrlParameter('months');

    if(months == 1){

        var texto = "Mes";
    }
    else{
        texto = "Meses";
    }

    $("#strong-title").text(title);
    $("#hours").text(hours+" Horas totales");
    $("#months").text(months+" "+texto+" de clases");
    $("#lessons").text(lessons+" Clases totales");
    $("#card-description").text(description);
    
    verifyCourse(title);
}

function modules(){
   
  
   $("#div-modules").addClass('row');

    $.ajax({
        type: "POST",
        url: "../php/information-course.php",
        data: {
            "id_course": id_course,
            "option": "modules" 
        },
        success: function (response) {
            
            var json = JSON.parse(response);

            if(json == "without modules"){

                $("#div-modules").append(
                    "<div class='col-md-12 col-sm-12'>"+
                        "<div class='card mt-3 card-modules'>"+
                            "<div class='card-body'>"+
                                "<h2>No existen todavía módulos para este curso</h2>"+
                            "</div>"+
                        "</div>"+
                    "</div>"
                    );
            }
            else{

                var size = json.modules.length;
                
                for(row = 0; row < size; row++){

                    $("#div-modules").append(
                        "<div class='col-md-6 col-sm-12'>"+
                            "<div class='card mt-3 card-modules'>"+
                                "<div class='card-body'>"+
                                    json.modules[row].name+
                                "</div>"+
                            "</div>"+
                        "</div>"
                    );
                }
            } 
        }
    });
}

//Funcion que verifica en que curso esta registrado la persona
function verifyCourse(text){

    var user = document.getElementById("value-user").value;
    var pass = document.getElementById("value-pass").value;

    $("#course-lits").click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../php/information-course.php",
            data: {
                "num": user,
                "password": pass,
                "title" : text,
                "option" : 'signed up'
    
            },
            success: function (response) {
                var json = JSON.parse(response);

                if(text == json.signed_up.title){
                    
                    Swal.fire({
                        title: 'Inscripción al curso',
                        text: 'Ya estas inscrito, no puedes volver a inscribirte, accede a tu lista de cursos para que lo puedas ver',
                        icon: 'warning',
                        confirmButtonColor: '#092432',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false
    
                    });
                }

                else{

                    var id_stundet = document.getElementById("value-person").value;
                
                    addCourse(id_stundet,id_course);
                }
            }
        });
    });
}

//Funcion para insertar el alumno registrado en el curso 
function addCourse(student,course){

    Swal.fire({
        title: 'Inscripción al curso',
        text: '¿Estas seguro de querer agregar este curso a tu lista?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#092432',
        cancelButtonColor: '#bb1825',
        confirmButtonText: 'Si! Agregar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false

    }).then((result)=>{
        if(result.value){

            $.ajax({
                type: "POST",
                url: "../php/information-course.php",
                data: {
                    "option" : 'registry student course',
                    "key_stundet": student,
                    "key_course": course
                },
                success: function (response) {
                    var json = JSON.parse(response);

                    if(json.msj == "student registry"){

                        updateStudentCourse();
                    }
                }
            });
        }

    })
}

//Funcion para actualizar los estudiantes registrados
function updateStudentCourse(){

    $.ajax({
        type: "POST",
        url: "../php/information-course.php",
        data: {
            "option" : 'update student',
            "course_id": id_course
        },
        success: function (response) {
            
            var json = JSON.parse(response);

            if(json.message == "student update"){

                Swal.fire({
                    title: 'Eres un estudiante nuevo en el curso',
                    text: 'Podrás visualizar el contenido cuando inicies el curso',
                    icon: 'success',
                    confirmButtonColor: '#092432',
                    confirmButtonText: 'Entendido!',
                    allowOutsideClick: false

                }).then((result)=>{
                    if(result.value){

                        Swal.fire({
                            title: 'Te has registrado en el curso',
                            text: 'Ahora puedes empezar a realizar el curso',
                            icon: 'success',
                            confirmButtonColor: '#092432',
                            confirmButtonText: 'Ir a mis cursos',
                            allowOutsideClick: false
        
                        }).then((result)=>{
                            if(result.value){

                                 window.location.href = "my-courses";
                            }
                        })
                    }
                })
            }
        }
    });
}


//Funcion para obtener los valores de la url
function urlVideo(){

    var id = getUrlParameter('course');

    $.ajax({
        type: "POST",
        url: "../php/information-course.php",
        data: {
            "key_course": id,
            "option" : 'url'

        },
        success: function (response) {
            var json = JSON.parse(response);
            $("#video-source").append("<source src=../"+json.url_singned.url+" type='video/mp4'>");

            if(json.url_singned.students == 0){

                $("#singned-studnets").text("No hay alumnos inscritos todavía. INSCRIBETE SOLO CON AGREGAR ESTE CURSO A TU LISTA");
            }
            else{

                if(json.url_singned.students == 1){

                    var students = "alumno(a)";
                    var singned = "inscrito(a)"
                }

                else{
                    students = "alumnos(as)"
                    singned = "inscritos(as)"
                }

                $("#singned-studnets").text(json.url_singned.students+" "+students+" "+singned+" en este curso");
            }
        }
    });
}

function getUrlParameter(sParam) {
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
};