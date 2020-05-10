var id = getUrl('value');
var key_module;

$(document).ready(function () {

    document.getElementById("select-themes").addEventListener('click',selectTheme);
    document.getElementById("select-themes").addEventListener('click',materiales);
    document.getElementById("select-themes").addEventListener('click', updateDetail);


    information();
    courseModules();
    themes();

});


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

function information(){

    var title =  getUrl('title');
    var desc =  getUrl('descri');

    $("#nav-title").text(title);
    $("#paragraph-video").text(desc);

    console.log(id);
    $.ajax({
        type: "POST",
        url: "../php/start-course.php",
        data: {
            "key_video": id,
            "opition": "information"
        },
        success: function (response) {
            console.log(response)
            var json = JSON.parse(response);
   
            $("#h4-students").append("Estudiantes: "+json.lessons.students);
            $("#h4-lessons").append("Clases: "+json.lessons.total_lessons);
        }
    });
}

function courseModules(){

    $.ajax({
        type: "POST",
        url: "../php/start-course.php",
        data: {
            "opition": "modules course",
            "key_course": id
        },
       
        success: function (response) {

       
            var json = JSON.parse(response);
           
            var size = json.modules_course.length;
        
            for(module = 0; module < size; module++){

                $("#content-courses").append(
                    "<div class='col-md-12 col-sm-12'>"+
                        "<div class='card'>"+
                            "<div class='card-header'>"+
                                "<div class='row'>"+
                                    "<div class='col-md-8 col-sm-12'>"+
                                        "<h6 class='title-h6'>"+json.modules_course[module].name+"</h6>"+
                                    "</div>"+
                                    "<div class='col-md-4 col-sm-12'>"+
                                        "<a class='btn btn-sm text-white' id='btn-themes' href="+json.modules_course[module].id_module+">Temas</a>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"
    
                );
            }
        }
    });
}

function materiales(){

    $("#material-support").addClass('row');
    var theme =  $("#option-themes option:selected").val()

    $.ajax({
        type: "POST",
        url: "../php/start-course.php",
        data: {
            "opition": 'material course',
            "key_course": id,
            "key_theme": theme
        },

        success: function (response) {
     
            var json = JSON.parse(response);
           
            if(json == "without material"){

                
            }else{

                var size = json.materiales.length;

                for(i = 0; i < size; i++){
    
                    if(json.materiales[i].type_material == "link"){
    
                        $("#material-support").append("<a id='materiales-buttons' class='btn' href="+json.materiales[i].link+" target='_blank'>"+json.materiales[i].link+"</a>");
                    }
                    else{
    
                        $("#material-support").append("<a id='materiales-buttons' class='btn' href=../material/"+json.materiales[i].path_material+" target='_blank'>"+json.materiales[i].name_material+"</a>");
                    }
      
                }
            }
        }
    });
}

function themes(){

    $(document).on('click', '#btn-themes',function(e){

        e.preventDefault();
        var module = $(this).attr('href');
        key_module = module;
        $("#material-support").empty();
        $("#div-video").load(" #div-video");

        $.ajax({
            type: "POST",
            url: "../php/start-course.php",
            data: {
                "opition": "themes course",
                "course_id": id,
                "id_module": module
            },
            success: function (response) {
                
                var json = JSON.parse(response);
            

                if(json == "without themes"){
                    
                    Swal.fire({
                        title: 'No hay temas',
                        text: 'En este módulo todavía no hay temas para cursar',
                        icon: 'info',
                        confirmButtonColor: '#092432',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false
    
                    });
                }
                else{
                    $("#modalThemes").modal('show');
                    $("#option-themes").empty();
                    $("#option-themes").append('<option selected disabled>Elije un tema para cursar</option>')
                    var size = json.themes_course.length;

                    for(j = 0; j < size; j++){

                        $("#option-themes").append('<option value='+json.themes_course[j].id_themes+'>'+json.themes_course[j].name+'</option>');
                   
                    }
                }
            }
        });

    })
}

function selectTheme(){

   var theme =  $("#option-themes option:selected").val()
   var index = document.getElementById("option-themes").selectedIndex;

    if(index == 0){

        Swal.fire({
            title: 'No has elegido algún tema del módulo',
            text: 'Elije el tema para poder visualizar el video',
            icon: 'warning',
            confirmButtonColor: '#092432',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false

        });
    }else{

        $("#modalThemes").modal('hide');

        $.ajax({
            type: "POST",
            url: "../php/start-course.php",
            data: {
                "opition": "show video",
                "key_theme": theme
            },
            success: function (response) {
           
                var json = JSON.parse(response);

                if(json.videos.video == false){

                    Swal.fire({
                        title: 'No existe todavía un video para este tema',
                        text: 'Puedes continuar con el curso eligiendo otro tema de algún módulo',
                        icon: 'warning',
                        confirmButtonColor: '#092432',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false
            
                    });

                }else{

                    $("#video-start").append("<source id='source-video' src=../"+json.videos.video+" type='video/mp4'></source>");
                   
                   
                }
            }
        });
    }  
}


function updateDetail(){

    var theme =  $("#option-themes option:selected").val()
    var person = document.getElementById("value-person").value;
    var modules = key_module;

    $.ajax({
        type: "POST",
        url: "../php/start-course.php",
        data: {
            "key_person": person,
            "key_course": id,
            "key_module": modules,
            "key_themes": theme,
            "opition": 'update detail'
        },
        success: function (response) {
            
       
            if(response === ""){
                //Poner insert
                console.log("hols");
            }
        }
    });
}


