var title = $("#course-title")
lessons = $("#course-lessons")
hours = $("#course-hours")
date_start = $("#course-start")
date_end = $("#course-end")
description = $("#text-description")
category = $("#category-instructor");
var value_course = document.getElementById("select-courses-existentes");
var id = 0;
var clave = 1;
var value_module;
var value_theme;
var text_boton;
var value_file;
$(document).ready(function () {
   
    document.getElementById("category-instructor").addEventListener('change', otherCategory);
    document.getElementById("btn-save-course").addEventListener('click',saveCourse);
    document.getElementById("button-add-course").addEventListener('click',function(){
        $("#modalCreateCourse").modal('hide');
    });

    document.getElementById("select-courses-existentes").addEventListener('change',closeModal);
   
    datePicker();
    validateLettersNumbers();
    selectCategory();
    coursesSelect();
    themesInformation();
    materialTheme();
    addModules();
    addNewTheme();
    addNewModule();
    modalArchivos();
    obtenerArchivos();
    $("#row-modules").slideUp();
    $("#modalCreateCourse").modal('show');
  
});


function coursesSelect(){

    $.ajax({
        type: "POST",
        url: "../php/create-course.php",
        data: {
            "identy": 'show courses'
        },
        success: function (response) {
          
            if(response != "sin titulo curso"){

                var json = JSON.parse(response);

                var size = json.courses_exis.length;
    
                for(i = 0; i < size; i++){
    
                    $("#select-courses-existentes").append("<option value="+json.courses_exis[i].id_course+">"+json.courses_exis[i].title+"</option>");
                }
            }
        }
    });
}

function closeModal(){

    var value = value_course.value;

    $("#modalCreateCourse").modal('hide');

    $.ajax({
        type: "POST",
        url: "../php/create-course.php",
        data: {
            "identy": 'information course',
            "id_course": value
        },
    
        success: function (response) {
            
            var json = JSON.parse(response);
            title.val(json.informtion_course.title);
            lessons.val(json.informtion_course.lessons);
            hours.val(json.informtion_course.hours);
            date_start.val(json.informtion_course.start);
            date_end.val(json.informtion_course.end);
            description.val(json.informtion_course.description);
           
            $("#category-instructor option").each(function(){

                if($(this).text() == json.informtion_course.category){
                    
                    $(this).prop('selected', true);
                }
                
            });
        }
    });

    title.attr('disabled',true);
    lessons.attr('disabled',true);
    hours.attr('disabled',true);
    date_start.attr('disabled',true);
    date_end.attr('disabled',true);
    description.attr('disabled', true);
    category.attr('disabled', true);

    modulesInformation();
}

function modulesInformation(){

        var id_corsue = value_course.value;
        $("#row-modules").slideDown();
        $("#btn-save-course").hide();

    $.ajax({
        type: "POST",
        url: "../php/create-course.php",
        data: {
            "identy": 'information modules',
            "id": id_corsue
        },

        success: function (response) {
            
            if(response != "sin modulos"){

                var json = JSON.parse(response);
                var size = json.modules_course.length;
      
                for(j = 0; j < size; j++){
    
                    id++;
                    var string = json.modules_course[j].name
                    var leer_espacios_blancos = string.trim();
                  
                    contentCourseModules(leer_espacios_blancos,id);
                    
                }
            }
                
        }
    });

}

function themesInformation(){
    
    $(document).on('click','#nav-themes-tabs',function(){

        var text = $(this).text();
        var text_sub = text.substr(21);

        var value = value_course.value;

        $("#modalThemesCourse").modal('show');

        $("#h5-modal-themes").text("Temas del módulo: " +text_sub);
        
        $.post("../php/create-course.php",{

            name_theme: text_sub,
            id_course: value,
            identy: 'information themes',
        },function (param){

            json = JSON.parse(param);

            if(json.msj == "sin temas"){

                $("#sin-temas").append("<h3>No hay temas para este modulo</h3>");
            }
            else{

                var size = json.information_themes.length;
          
                for(j = 0; j < size; j++){
        
    
                    $("#ol-themes").append('<li id="list-themes"><a>'+json.information_themes[j].name+'</a></li>');
                } 
            }
            
        })

        $("#ol-themes").empty();
        $("#sin-temas").empty();
    })
   
}

function videoTheme(){

    $("#button-video").click(function (e) { 
        e.preventDefault();
        
        var texto = $("#h5-modal-material").text();
        var text_substr = texto.substr(32);

        $("#modalVideo").modal('show');

        $("#h5-modal-video").text("Video del tema: " + text_substr);
        
        $.post("../php/create-course.php",{

            theme_name: text_substr,
            identy: 'information video'
        },function(param){

            if(param != ""){

                $("#video-modal").append("<source src=../"+param+" type='video/mp4'>");
            }
            else{
                $("#div-modal-video").append('<h3>No hay un video para este tema</h3>');
            }
        })
        
        $("#div-modal-video").load(" #div-modal-video");
    });

    $("#btn-close").click(function (e) { 
        e.preventDefault();
       
        var video = document.getElementById("video-modal");
        video.pause();
    });
}


function materialTheme(){

   $(document).on('click','#list-themes',function(){

        $("#modalMaterialThemes").modal('show');
        var text = $(this).text();

        $("#h5-modal-material").text("Material de apoyo para el tema: " +text);

       $.post("../php/create-course.php",{

          identy: "information material",
          name_theme: text

       }, function (param) {  

            var json = JSON.parse(param);
            
            if(json.msj == "sin material"){

                $("#sin-material").append('<h3>No hay material de apoyo para este tema</h3>');
                
            }
            else{
                var size = json.information_material.length;

                for (i = 0; i < size; i++){

                    if(json.information_material[i].link != ""){

                        $("#ol-material").append('<li><a  href='+json.information_material[i].link+' target="_blank">'+json.information_material[i].name_material+'</a></li>');
                    }
                    else{
                        $("#ol-material").append('<li><a href=../material/'+json.information_material[i].path_material+' target="_blank">'+json.information_material[i].name_material+'</a></li>');
                    }

                }
            }
       })
       $("#ol-material").empty();
       $("#sin-material").empty();
   })

   videoTheme();

   
}

function datePicker(){

    $('#course-start, #course-end').datepicker({
        language: 'es',
        autoClose: true,
        minDate: new Date()
    })
}


function validateLettersNumbers(){

    //Solo letras
    $("#course-title").keypress(function (e) { 
        
        if(event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122 || event.charCode == 32 || event.charCode >= 192 && event.charCode <= 255){
            return true;
           }
           return false;
    })

    //Solo numeros
    $("#course-lessons, #course-hours").keypress(function (e) { 
        
        if(event.charCode >= 48 && event.charCode <= 57){
            return true;
           }
           return false;

    });

}

//Funcion para mostarar las categorias
function selectCategory(){

    $.ajax({
        type: "POST",
        url: "../php/create-course.php",
        data: {
            "identy": 'categorias instructor'
        },
        success: function (response) {
            
            if(response != "no hay categorias"){

                var json = JSON.parse(response);

                var size = json.category.length;
    
                for(j = 0; j < size; j++){
    
                    $("#category-instructor").append('<option value='+json.category[j].id_category+'>'+json.category[j].name+'</option>');
                }
            }
            $("#category-instructor").append('<option value="otra">Otra categoría</option>');

        }
        
    });

}

//Funcion para elegir otra categoria
function otherCategory(){

    var other_category = document.getElementById("category-instructor").value;

    if(other_category == "otra"){

        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Aceptar!',
            confirmButtonColor: '#092432',
            showCancelButton: true,
            cancelButtonColor: '#bb1825',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            inputAttributes: {
                maxlength: 50,
              }
          }).queue([
            {
              title: "Nueva Categoría",
              text: "La nueva categoría que escribas estará disponible para que otros instructores(as) la puedan elegir si lo requieren",
              inputPlaceholder: 'Escribe la categoría',
              
            },
            
          ]).then((result)=>{
              if(result.value){

                var texto = result.value.toString()
                var capitalize = texto[0].toUpperCase() + texto.slice(1);//Primera lentra en mayuscula

                Swal.fire({
                    title: 'La categoría '+capitalize+' sera guardada en la plataforma',
                    text: '¿Quieres continuar?',
                    icon: 'question',
                    confirmButtonText: 'Si',
                    confirmButtonColor: '#092432',
                    cancelButtonColor: '#bb1825',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    allowOutsideClick: false

                }).then((result)=>{

                    if(result.value){

                        categoryNew(capitalize);
                       
                    }
                })
              }
          })
    }
    
}

function categoryNew(category_new){

    $.ajax({
        type: "POST",
        url: "../php/create-course.php",
        data: {
            "new_category": category_new,
            "identy": 'new category'
        },
        success: function (response) {
            
            var json = JSON.parse(response)

            if(json.data.message == "category save"){

                $("#category-instructor").append('<option value='+json.data.lastes_id+' selected>'+category_new+'</option>');
                $("#category-instructor").attr('disabled', true);
            }
        }
    });
}

function saveCourse(){

    executeInsert("no");
    
}

function saveModule(name,courses,categoria){

    
    $.post("../php/create-course-poo.php",{

        module: name,
        course: courses,
        detect: "save modules",
    
    },function(params){
       
        if(params == "guardado"){

            $("#ad-module").attr('disabled', false);
            $("#btn-new-theme").attr('disabled',true);
         
            $("#col-modules [role='alert'],input[id=btn-new-theme"+id+"], input[id="+id+"], input[id=input-name-theme"+id+"], button[id=btn-modules-course"+id+"], button[id=button-files"+id+"]").each(function(){

                    $(this).attr('disabled', true);
    
            });
            themesSave(categoria,courses);

            Swal.fire({

                title: "Módulo registrado",
                text: "Si deseas agregar más módulos a tu curso presiona el botón de agregar nuevo módulo",
                icon: "success",
                confirmButtonColor: '#70b52c',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
                
        }
    
    })
}

function themesSave(catego,key_courses){

    $("#col-modules [role='alert'] input[id=input-name-theme"+id+"]").each(function(){
    
        var themes =  $(this).val()
     
       $.post("../php/create-course-poo.php",{

        theme: themes,
        id_course: key_courses,
        detect: "save themes",
        id_category: catego
        },function(params){

        })

    });
}

function executeInsert(decision_insert){

    var titulo = title.val(),
    lesons = lessons.val(),
    horas = hours.val(),
    start = date_start.val(),
    end = date_end.val(),
    catego = category.val(),
    descri = description.val();

    $.post("../php/create-course-poo.php",{

        title: titulo,
        les: lesons,
        hour: horas,
        start_date: start,
        end_date: end,
        descrip: descri,
        categories: catego,
        decidir: decision_insert,
        detect: "save course"
    },function(param){

        console.log(param);
        if(param != "curso insert"){
            messageInsert(param);
        }
        else{
            Swal.fire({

                title: "Curso registrado",
                text: "Su curso fue registrado en la plataforma es momento de crear los módulos y temas",
                icon: "success",
                timer: 10000,
                timerProgressBar: true,
                confirmButtonColor: '#70b52c',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
        }
    })
}

function messageInsert(validate){

    var title_swal, text_swal, icon_swal, button_color;
       
    switch(validate){

        case "title vacio":

            title_swal = "No hay un título para el curso";
            text_swal = "Escribe el título que tendra el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        case "categoria vacia":
            
            title_swal = "La categoría no esta seleccionada";
            text_swal = "Elige una categoría para el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        case "clases vacias":

            title_swal = "Debe existir un número de clases";
            text_swal = "Escriba el número de clases que tendra el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        case "horas vacias":

            title_swal = "Debe existir un número de horas";
            text_swal = "Escriba el número de horas que tendra el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        case "inicio vacio":

            title_swal = "No hay una fecha de inicio";
            text_swal = "Elija la fecha de inicio para el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        case "fin vacio":

            title_swal = "No hay una fecha de finalización";
            text_swal = "Elija la fecha en que terminara el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        case "descripcion vacia":

            title_swal = "El curso no tiene una descripción";
            text_swal = "Escribe una descripción para que los alumnos puedan tener una pequeña ídea de lo que tratara el curso";
            icon_swal = "warning";
            button_color = '#bb1825';

        break;

        default:
            
            title_swal = "¿Estas seguro de continuar?";
            text_swal = "El curso será registrado en la plataforma";
            icon_swal = "question";
            button_color = '#70b52c';
    }
    message(title_swal, text_swal, icon_swal, button_color, validate);
}

function message(title, text, icon, color, response){

    if(response != "descripcion vacia" && response != "fin vacio" && response != "inicio vacio" && response != "horas vacias"
    && response != "clases vacias" && response != "categoria vacia" && response != "title vacio"){

        Swal.fire({

            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            cancelButtonColor: '#bb1825',
            confirmButtonColor: color,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
    
        }).then(result =>{
            if(result.value){
                
                executeInsert("si"); 
                $("#row-modules").slideDown();
                $("#btn-save-course").hide();

                if(id == 0){

                    id = 1
                }
                contentCourse(id);

                $("#course-title").attr('disabled',true);
                $("#course-lessons").attr('disabled',true);
                $("#course-hours").attr('disabled',true);
                $("#course-start").attr('disabled',true);
                $("#course-end").attr('disabled',true);
                $("#text-description").attr('disabled',true);
                $("#category-instructor").attr('disabled',true);
            }
        })
    }else{

        Swal.fire({

            title: title,
            text: text,
            icon: icon,
            confirmButtonColor: color,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
    
        });
        
    }
}

function keypressModule(){

    $("#col-modules [role='alert'] input[id="+id+"]").each(function(){

        var name_module = $(this).val();
        $("#"+id).text("Módulo "+id+": "+name_module);

    });
}


function addNewModule(){

    $("#ad-module").click(function (e) { 
        e.preventDefault();
        id++;
        clave = 1;
        contentCourse(id);
             
        $(this).attr('disabled', true);

    });

}


function addNewTheme(){

    $(document).on('click','.buton-new-theme',function(){

        $("#col-modules [role='alert'] input[id=input-name-theme"+id+"]").each(function(){

            value_theme =  $(this).val();
        
        });

        $("#col-modules [role='alert'] input[id="+id+"]").each(function(){

            value_module  = $(this).val();
        
        });

        $("#col-modules [role='alert'] .input-file"+clave+"").each(function(){

            value_file = this.files[0];
        
        });

        $("#col-modules [role='alert']  button[id=button-files"+id+"]").each(function(){
           
            text_boton = $(this).text();
            
        });

        $("#col-modules [role='alert'] .input-file"+clave+"").each(function(){

            
            if(value_module == "" || value_theme == "" || value_file == undefined || $(this).is(":visible")){
            
                Swal.fire({
    
                    title: "No se puede asignar un nuevo tema",
                    text: "Escribe el nombre del tema y módulo actual, registra material y/o video para poder agregar un nuevo tema",
                    icon: "info",
                    confirmButtonColor: '#70b52c',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
            
                });
            }
            else if(text_boton == "Subir archivo o video"){
                alert("incolrrec");
            }
            else{
    
                addButtonTheme();
            }
        });
    })
}

function addButtonTheme() {
    
        clave++;
       
        $("#col-modules [role='alert'] div[id=div-themes"+id+"]").each(function(){

        
            $(this).append('<input id=input-name-theme'+id+' type="text" class="form-control mt-4 class'+clave+'" placeholder="Escribe el nombre del tema">');
        
        });

        $("#col-modules [role='alert'] div[id=div-files"+id+"]").each(function(){

            $(this).append('<div class="custom-file mt-4" id=custom'+clave+'>'+
                                '<input disabled type="file" class="custom-file-input boton-file input-file'+clave+'" id=files-course'+id+' lang="es">'+
                                '<label class="custom-file-label label-files'+clave+'" for="files-course">Subir archivo</label>'+
                                '<label id=label-strong'+clave+'><strong>Nota:</strong> Un video debe de pesar menos de 100 MB.</label>'+
                            '</div>');
          
        });

        
        $("#col-modules [role='alert'] div[id=div-buttons"+id+"]").each(function(){

            $(this).append('<button id=button-files'+id+' class="btn btn-md text-white file-boton mt-3">Selecionar material o video para el tema</button>');
        });

        $("#col-modules [role='alert']  button[id=button-files"+id+"]").each(function(){

           
            text_boton = $(this).text();
            
            if(text_boton == "Cambiar material o video para el tema"){

                $(this).attr('disabled', true); 

            }
        });
}

function modalArchivos(){
    

    $(document).on('click', '.file-boton',function(){

        
        $("#col-modules [role='alert']  button[id=button-files"+id+"]").each(function(){

           
            text_boton = $(this).text();
        });

            
        $("#col-modules [role='alert'] div[id=div-themes"+id+"] .class"+clave+"").each(function(){

            var name_theme = $(this).val();
     
            if(name_theme == ""){

                Swal.fire({

                    title: "No puede asignar material y/o video",
                    text: "Escribe primero el nombre del tema para asignar material y/o video",
                    icon: "warning",
                    confirmButtonColor: '#70b52c',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
            
                });
            }
            else if(text_boton == "Subir archivo o video"){
                
                uploadFilesVideos();
            
            }

            else if(text_boton == "Cambiar material o video para el tema"){

                 $("#col-modules [role='alert'] .input-file"+clave+", .label-files"+clave+", #label-strong"+clave+"").each(function(){

                    $(this).show();
                });
                $("#col-modules [role='alert']  input[id=input-name-file"+clave+"]").each(function(){

                   $(this).remove();
                });
            }
            else{
                
        
                $(".boton-file").attr('disabled', false);
            }
        });
    
    })
}

function uploadFilesVideos(){

    var value_file_name;

    $("#col-modules [role='alert'] .input-file"+clave+"").each(function(){

        value_file = this.files[0];
        value_file_name = this.files[0].name;
    
    });

    Swal.fire({

        title: "Archivo listo para subirse",
        text: "El archivo "+value_file_name+" se guardará en la plataforma",
        icon: "info",
        showCancelButton: true,
        cancelButtonColor: '#bb1825',
        confirmButtonColor: '#70b52c',
        confirmButtonText: '¡Si Guardar!',
        cancelButtonText: 'No Guardar',
        allowOutsideClick: false

    }).then(result =>{

        if(result.value){

            var dataForm = new FormData();

            dataForm.append('files_material', value_file);
            dataForm.append('detect', "material save");
    
            $.ajax({
                type: "POST",
                url: "../php/create-course-poo.php",
                data: dataForm,
                contentType: false,
                processData: false,
                cache: false, 
                success: function (response) {
                    console.log(response)
                }
            });
        }
        else{
            
            $("#col-modules [role='alert']  button[id=button-files"+id+"]").each(function(){

           
                $(this).text("Cambiar material o video para el tema");
            });
        }
    })
}

function obtenerArchivos(){

    var name_file;

    $(document).on('change','.boton-file',function(){

        $("#col-modules [role='alert'] .input-file"+clave+"").each(function(){

            console.log(this.files);
            name_file = this.files[0].name;
            $(this).hide();
        
        });

        $("#col-modules [role='alert'] .label-files"+clave+", #label-strong"+clave+"").each(function(){

            $(this).hide();
        
        });

        for(var i = 0; i < name_file.length; i++){

            if(name_file.charAt(i) == ' '){

                name_file = name_file.replace(" ", "-")
            }
        }

        $("#col-modules [role='alert']  div[id=custom"+clave+"]").each(function(){

            
            $(this).append('<input id=input-name-file'+clave+' type="text" class="form-control" value='+name_file+'>');

        });

        $("#col-modules [role='alert']  button[id=button-files"+id+"]").each(function(){

           
            $(this).text("Subir archivo o video");
        });

     
    })
}

function addModules(){

    $(document).on('click','.save-module',function(){

        var course_value = value_course.value;
        var catego = category.val();

        $("#col-modules [role='alert'] input[id="+id+"]").each(function(){

            value_module  = $(this).val();

            $("#col-modules [role='alert'] input[id=input-name-theme"+id+"]").each(function(){

                value_theme =  $(this).val();
            
            });
        
        });

        $("#col-modules [role='alert'] .input-file"+clave+"").each(function(){

            value_file = this.files[0];

            if(course_value == ""){

                $.post("../php/create-course-poo.php",{
    
                    detect: "course vacio",
    
                },function(data){
    
                    console.log(data);
    
                    if(value_module == ""){
    
                        Swal.fire({
    
                            title: "No hay un nombre para el módulo",
                            text: "Escribe el nombre que tendrá este módulo",
                            icon: "error",
                            confirmButtonColor: '#70b52c',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick: false
                    
                        });
                    }
                    else if(value_theme == ""){
    
                        Swal.fire({
    
                            title: "Faltan temas para este módulo",
                            text: "Escribe el nombre del tema",
                            icon: "error",
                            confirmButtonColor: '#70b52c',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick: false
                    
                        });
                    }
                    else{
                        Swal.fire({
    
                            title: "¿Estas seguro de guardar este módulo? ",
                            text: "Al igual que el módulo todos sus temas quedaran guardados ",
                            icon: "question",
                            confirmButtonColor: '#70b52c',
                            confirmButtonText: '¡SI!',
                            showCancelButton: true,
                            cancelButtonColor: '#bb1825',
                            cancelButtonText: '¡NO!',
                            allowOutsideClick: false
                    
                        }).then(result=>{
                            if(result.value){
    
                                saveModule(value_module,data,catego);
                            }
                        })
                    }
                })
                
            }else if(value_module == ""){
    
                Swal.fire({
    
                    title: "No hay un nombre para el módulo",
                    text: "Escribe el nombre que tendrá este módulo",
                    icon: "error",
                    confirmButtonColor: '#70b52c',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
            
                });
                
            }else if(value_theme == ""){
                
                Swal.fire({
    
                    title: "Faltan temas para este módulo",
                    text: "Escribe el nombre del tema",
                    icon: "error",
                    confirmButtonColor: '#70b52c',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
            
                });
            }

            else if(value_file == undefined || $(this).is(":visible")){

                Swal.fire({
    
                    title: "Falta material para el tema",
                    text: "Selecciona material o video para este tema",
                    icon: "error",
                    confirmButtonColor: '#70b52c',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
            
                });
            }
    
            else{
                Swal.fire({
    
                    title: "¿Estas seguro de guardar este módulo? ",
                    text: "Al igual que el módulo todos sus temas quedaran guardados ",
                    icon: "question",
                    confirmButtonColor: '#70b52c',
                    confirmButtonText: '¡SI!',
                    showCancelButton: true,
                    cancelButtonColor: '#bb1825',
                    cancelButtonText: '¡NO!',
                    allowOutsideClick: false
            
                }).then(result=>{
                    if(result.value){
                        saveModule(value_module,course_value,catego);
                    }
                })
            }
        
        });

    })
    
}

function contentCourse(key){

    $("#col-modules").append(
        "<div class='alert' role='alert'>"+
            "<h4 id="+key+">Módulo "+key+":</h4>"+
            "<div class='container'>"+
                "<div class='form-group'>"+
                    "<input onkeyup=keypressModule() id="+key+" type='text' class='form-control' placeholder='Escribe el nombre del modulo'>"+
                "</div>"+
                "<div class='row'>"+
                    "<div class='col-md-4 col-sm-12 mt-3'>"+
                        "<div class='form-group' id=div-themes"+key+">"+
                            "<input id=input-name-theme"+key+" type='text' class='form-control class"+clave+"' placeholder='Escribe el nombre del tema'>"+
                        "</div>"+
                    "</div>"+
                    "<div class='col-md-4 col-sm-12 mt-3' id=div-files"+key+">"+
                        "<div class='custom-file' id=custom"+clave+">"+
                            "<input disabled type='file' class='custom-file-input boton-file input-file"+clave+"' id=files-course"+key+" lang='es'>"+
                            "<label class='custom-file-label label-files"+clave+"' for=files-course"+key+">Subir archivo</label>"+
                            "<label id=label-strong"+clave+"><strong>Nota:</strong> Un video debe de pesar menos de 100 MB.</label>"+
                        "</div>"+
                    "</div>"+
                    "<div class='col-md-4 col-sm-12 mt-2' id=div-buttons"+key+">"+
                        "<button id=button-files"+key+" class='btn btn-md text-white file-boton'>Selecionar material o video para el tema</button>"+
                    "</div>"+
                "</div>"+
                "<div class='row justify-content-center mt-3'>"+
                    "<div class='col-md-3 col-sm-12'>"+
                      /*  "<video  width='220' height='140' controls id='mivideo'>"+
                            "<source src='../videos/Desarrollo.mp4' type='video/mp4'>"+
                        "</video>"+*/
                    "</div>"+
                "</div>"+
            "</div>"+
            "<div class='row'>"+
                "<div class='col-md-8 col-sm-12'>"+
                    "<button class='btn text-white save-module' id=btn-modules-course"+key+">Publicar módulo</button>"+
                "</div>"+
                "<div class='col-md-4 col-sm-12'>"+
                    "<input id=btn-new-theme"+key+" class='mt-3 buton-new-theme' title='Agregar nuevo tema al módulo' type='image' src='../img/icons/new-theme.png' width='48' height='48'>"+
                "</div>"+
            "</div>"+
        "</div>"
    );
 
}


function contentCourseModules(module, key){
    
    var nav = "navbar";

    $("#col-modules").append(
        '<div class="alert" role="alert">'+
            '<h4>Módulo '+key+': '+module+'</h4>'+
            '<div class="container">'+
                '<nav class="mt-5">'+
                    '<div class="nav nav-tabs" id="nav-tab" role="tablist">'+
                        '<a class="nav-item nav-link active text-danger" id="nav-themes-tabs" data-toggle="tab" href=#'+nav+key+' role="tab" aria-controls="nav-home" aria-selected="true">Ver temas del módulo '+module+'</a>'+
                    '</div>'+
                '</nav>'+
                '<div class="row">'+
                    '<div class="col-md-6 col-sm-12 mt-3">'+
                        '<div class="form-group">'+
                            '<input id="input-name-theme" type="text" class="form-control" placeholder="Escribe el nombre del tema">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6 col-sm-12 mt-3">'+
                        '<div class="custom-file">'+
                            '<input type="file" class="custom-file-input" id="files-course" lang="es">'+
                            '<label class="custom-file-label" for="files-course">Seleccionar material o video</label>'+
                            '<label><strong>Nota:</strong>El video debe de pesar menos de 4 GB.</label>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row justify-content-center mt-3">'+
                    '<div class="col-md-3 col-sm-12">'+
                        '<video  width="220" height="140" controls id="mivideo">'+
                            '<source src="../videos/Desarrollo.mp4" type="video/mp4">'+
                        '</video>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-md-8 col-sm-12">'+
                    '<button class="btn text-white" id="btn-modules-course">Actualizar módulo</button>'+
                '</div>'+
                '<div class="col-md-4 col-sm-12">'+
                    '<input class="mt-3" title="Agregar nuevo tema al módulo" type="image" src="../img/icons/new-theme.png" width="48" height="48">'+
                '</div>'+
            '</div>'+
        '</div>'
    );
 
}