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
    obtenerArchivos();
    butonMaterial();
    selectThemes();
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

       // showThemesModuleSelect();

    $.ajax({
        type: "POST",
        url: "../php/create-course.php",
        data: {
            "identy": 'information modules',
            "id": id_corsue
        },

        success: function (response) {
            console.log(response);
            
            if(response != "sin modulos"){

                var json = JSON.parse(response);
                var size = json.modules_course.length;
      
                for(j = 0; j < size; j++){
    
                    id++;
                    var string = json.modules_course[j].name
                    var module_id = json.modules_course[j].id_module
                    var leer_espacios_blancos = string.trim();

                   
                  
                    contentCourseModules(leer_espacios_blancos,id,module_id);
                    
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

            console.log(param)
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

                        $("#ol-material").append('<li><a  href='+json.information_material[i].link+' target="_blank">'+json.information_material[i].link+'</a></li>');
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

            $("#btn-new-theme").attr('disabled',true);
         
            $("#col-modules [role='alert'],input[id=btn-new-theme"+id+"], input[id="+id+"], input[id=input-name-theme"+id+"], button[id=btn-modules-course"+id+"]").each(function(){

                    $(this).attr('disabled', true);
    
            });

            $("#col-modules [role='alert'] button[id= btn-add-material"+id+"]").each(function(){

                $(this).attr('disabled', false);

            });
            
            themesSave(categoria,courses);

            swalSimple("modulo");
                
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


function selectThemes(){

    $(document).on('change', '.custom-select',function(){

        $("#col-modules [role='alert'] div[id=div-files"+id+"] input[id=input-files"+id+"], input[id=input-links"+id+"] ").each(function(){
            
            $(this).attr('disabled', false);
        });
    })
}


function saveOnlyLink(){

    var id_theme;
    var link;

    $("#col-modules [role='alert'] div[id=div-material"+id+"] select[id=themes-select"+id+"] option:selected").each(function(){
            
        id_theme = $(this).val();
    });

    $("#col-modules [role='alert'] div[id=div-links"+id+"] input[id=input-links"+id+"]").each(function(){
            
        link  = $(this).val();
    });

    var id_value = value_course.value;


    $.post("../php/create-course-poo.php",{

        detect: "only link",
        links: link,
        key_theme: id_theme,
        key_course: id_value

    },function(datos){

        if(datos == "insertado link"){

            Swal.fire({

                title: "Link guardado correctamente",
                text: "¿Deseas agregar otro archivo o link a este tema?",
                icon: "success",
                showCancelButton: true,
                cancelButtonColor: '#bb1825',
                confirmButtonColor: '#092432',
                confirmButtonText: '¡Si Agregar!',
                cancelButtonText: 'No Agregar',
                allowOutsideClick: false
        
            }).then(result =>{

                if(result.value){

                    $("#col-modules [role='alert']  input[id=input-links"+id+"]").each(function(){
                            
                        $(this).val("");
                    });
                }
                else{
                        swalSimple("otro modulo");
                        $("#ad-module").attr('disabled', false);

                       $("#col-modules [role='alert'] button[id= btn-add-material"+id+"], .boton-file, input[id=input-links"+id+"], select[id=themes-select"+id+"]").each(function(){
                            
                            $(this).attr('disabled',true);
                        });
                }
            })
        }
    })
    
}


function butonMaterial(){


    $(document).on('click','.material-add',function(){

       var text_boton = $(this).text();

       if(text_boton == "Subir material o video" && $(".file"+id+"").is(":visible") && $(".liks"+id+"").val() == ""){

            swalSimple("subir material");
       }

       else if(text_boton == "Subir material o video"  && $(".liks"+id+"").val() != "" && $(".file"+id+"").is(":visible")){

            swalSimple("link only");
       }
       else if(text_boton == "Subir material o video" && !$(".file"+id+"").is(":visible") || !$(".file"+id+"").is(":visible") && $(".liks"+id+"").val() != "" && text_boton == "Subir material o video"){

            uploadFilesVideos();
       }
       else{

            $("#col-modules [role='alert'] div[id=div-material"+id+"]").each(function(){
            
                $(this).append('<select class="browser-default custom-select" id="themes-select'+id+'">'+
                                '<option disabled selected>Seleccionar tema</option>'+
                                '</select>');
            
            });
            $("#col-modules [role='alert'] div[id=div-files"+id+"]").each(function(){
            
                $(this).append('<input disabled type="file" class="custom-file-input boton-file file'+id+'" id="input-files'+id+'" lang="es">'+
                                '<label class="custom-file-label file'+id+'">Subir archivo</label>'+
                                '<label class="file'+id+'"><strong>Nota:</strong> Un video debe de pesar menos de 100 MB.</label>');
            
            });
            $("#col-modules [role='alert'] div[id=div-links"+id+"]").each(function(){
            
                $(this).append('<input disabled id=input-links'+id+' type="text" class="form-control liks'+id+'" placeholder="Link en internet">');
            
            });
        
            $.post("../php/create-course-poo.php",{

                detect: "show themes"
            },function(data){

                var json = JSON.parse(data);

                console.log(json);

                var tamanio = json.id_themes.length;

                for(var i = 0; i < tamanio; i++){

                    $("#col-modules [role='alert'] div[id=div-material"+id+"] select[id=themes-select"+id+"]").each(function(){
            
                        $(this).append('<option value='+json.id_themes[i].id_themes+'>'+json.id_themes[i].name+'</option>');
                    });
                }
            }); 
       }
       $(this).text("Subir material o video");
    }) 
}

function materialSave(id_course){

    var value_file;
    var them_id;
    var link;

    $("#col-modules [role='alert'] div[id=div-files"+id+"] input[id=input-files"+id+"]").each(function(){
            
        value_file = this.files[0];
    
    });

    $("#col-modules [role='alert'] div[id=div-material"+id+"] select[id=themes-select"+id+"] option:selected").each(function(){
            
        them_id = $(this).val();
    });

    $("#col-modules [role='alert'] div[id=div-links"+id+"] input[id=input-links"+id+"]").each(function(){
            
        link  = $(this).val();
    });

    var dataForm = new FormData();

    dataForm.append('files_material', value_file);
    dataForm.append('detect', "material insert");
    dataForm.append('key_course', id_course);  
    dataForm.append('key_theme', them_id);

    if(link != undefined){

        dataForm.append('links', link);
    }

    $.ajax({
        type: "POST",
        url: "../php/create-course-poo.php",
        data: dataForm,
        contentType: false,
        processData: false,
        cache: false, 
        success: function (response) {
            console.log(response);
        }
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
            swalSimple("curso");
        }
    })
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

        var boolean = false;

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


            
            if(value_module == "" || value_theme == "" ){
            
                swalSimple("escribir tema");
            }
       
            else{
    
                boolean = true;
            }

        if(boolean){

            addButtonTheme();
        }
    })
}

function addButtonTheme() {
    
        clave++;
       
        $("#col-modules [role='alert'] div[id=div-themes"+id+"]").each(function(){

        
            $(this).append('<input id=input-name-theme'+id+' type="text" class="form-control mt-4 class'+clave+'" placeholder="Escribe el nombre del tema">');
        
        });
}


function uploadFilesVideos(){

    var value_file;


    $("#col-modules [role='alert'] div[id=div-files"+id+"] input[id=input-files"+id+"]").each(function(){
            
        value_file = this.files[0];
       
    });


    Swal.fire({

        title: "Archivo listo para subirse",
        text: "El archivo "+value_file.name+" se guardará en la plataforma",
        icon: "info",
        showCancelButton: true,
        cancelButtonColor: '#bb1825',
        confirmButtonColor: '#092432',
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
                
                    if(response == "archivo almacenado"){

                        var id_value = value_course.value;

                        if(id_value == ""){
                                
                            $.post("../php/create-course-poo.php",{

                                detect: "course vacio",
                
                            },function(data){
            
                                materialSave(data);
                                
                            })
                        }
                        else{
                            materialSave(id_value);
                        }

                      

                        Swal.fire({

                            title: "El archivo fue guardado correctamente",
                            text: "¿Deseas agregar otro archivo a este tema?",
                            icon: "success",
                            showCancelButton: true,
                            cancelButtonColor: '#bb1825',
                            confirmButtonColor: '#092432',
                            confirmButtonText: '¡Si Agregar!',
                            cancelButtonText: 'No Agregar',
                            allowOutsideClick: false
                    
                        }).then(result =>{

                            if(result.value){

                                $("#col-modules [role='alert'] div[id=div-files"+id+"] .file"+id+"").each(function(){
            
                                    $(this).show();
                                 });

                                $("#col-modules [role='alert'] div[id=div-files"+id+"] input[id=input-file-name"+clave+"]").each(function(){
                    
                                    $(this).remove();
                                 });

                                 $("#col-modules [role='alert']  input[id=input-links"+id+"]").each(function(){
                            
                                    $(this).val("");
                                });
                                 
                            }
                            else{ 
                                
                                Swal.fire({

                                    title: "Elegir otro tema",
                                    text: "¿Quieres seleccionar otro tema para la subida de archivos y/o videos?",
                                    icon: "info",
                                    showCancelButton: true,
                                    cancelButtonColor: '#bb1825',
                                    confirmButtonColor: '#092432',
                                    confirmButtonText: 'Si',
                                    cancelButtonText: 'No',
                                    allowOutsideClick: false
                            
                                }).then(result =>{

                                    if(result.value){

                                        $("#col-modules [role='alert'] div[id=div-files"+id+"] .file"+id+"").each(function(){
            
                                            $(this).show();
                                         });
                                        
                                        $("#col-modules [role='alert'] div[id=div-files"+id+"] input[id=input-file-name"+clave+"]").each(function(){
                            
                                            $(this).remove();
                                         });
                                         $("#col-modules [role='alert']  input[id=input-links"+id+"]").each(function(){
                            
                                            $(this).val("");
                                        });
                                        
                                    }

                                    else{
                                        
                                        swalSimple("otro modulo");
                                        $("#ad-module").attr('disabled', false);

                                        $("#col-modules [role='alert'] button[id= btn-add-material"+id+"], input[id=input-file-name"+clave+"], input[id=input-links"+id+"], select[id=themes-select"+id+"]").each(function(){
                            
                                            $(this).attr('disabled',true);
                                        });
                                    }
                                });
                            
                            }
                          
                        })
                    }
                }
            });
        }
        else{
            $("#col-modules [role='alert'] div[id=div-files"+id+"] .file"+id+"").each(function(){
            
                $(this).show();
             });
            
            $("#col-modules [role='alert'] div[id=div-files"+id+"] input[id=input-file-name"+clave+"]").each(function(){

                $(this).remove();
             });

        }
    })
}

function obtenerArchivos(){

    var name_file;

    $(document).on('change','.boton-file',function(){

            console.log(this.files[0]);
            name_file = this.files[0].name;
           
            $("#col-modules [role='alert'] div[id=div-files"+id+"] .file"+id+"").each(function(){
            
                $(this).hide();
             });
           // $(this).hide();

            for(var i = 0; i < name_file.length; i++){

                if(name_file.charAt(i) == ' '){
    
                    name_file = name_file.replace(" ", "-")
                }
            }

            $("#col-modules [role='alert'] div[id=div-files"+id+"]").each(function(){
         
                $(this).append('<input type="text" class="form-control" id="input-file-name'+clave+'" value='+name_file+'>');
            
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

            if(course_value == ""){

                $.post("../php/create-course-poo.php",{

                    detect: "course vacio",
    
                },function(data){
    
                    console.log(data);
                    messageButtonSaveModule(value_module,value_theme,data,catego);
                    
                })
                
                
            }
            else {
              
                messageButtonSaveModule(value_module,value_theme,course_value,catego);
                
            }
        
        });    
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
                    "<div class='col-md-12 col-sm-12 mt-3'>"+
                        "<div class='form-group' id=div-themes"+key+">"+
                            "<input id=input-name-theme"+key+" type='text' class='form-control class"+clave+"' placeholder='Escribe el nombre del tema'>"+
                        "</div>"+
                    "</div>"+
                    "<div class='col-md-4 col-sm-12'>"+
                        "<div class='form-group' id=div-material"+key+">"+
                           
                        "</div>"+
                    "</div>"+
                    "<div class='col-md-4 col-sm-12'>"+
                           "<div class='custom-file' id=div-files"+key+">"+

                           "</div>"+
                    "</div>"+
                    "<div class='col-md-4 col-sm-12'>"+
                           "<div class='from-group' id=div-links"+key+">"+

                           "</div>"+
                    "</div>"+
                "</div>"+
                "<div class='row justify-content-center mt-3'>"+
                    "<div class='col-md-12 col-sm-12'>"+
                     
                    "</div>"+
                "</div>"+
            "</div>"+
            "<div class='row'>"+
                "<div class='col-md-4 col-sm-12'>"+
                    "<button class='btn text-white save-module' id=btn-modules-course"+key+">Publicar módulo</button>"+
                "</div>"+
                "<div class='col-md-4 col-sm-12'>"+
                    "<button disabled class='btn text-white material-add' id=btn-add-material"+key+">Agregar material o video</button>"+
                "</div>"+
                "<div class='col-md-4 col-sm-12'>"+
                    "<input id=btn-new-theme"+key+" class='mt-3 buton-new-theme' title='Agregar nuevo tema al módulo' type='image' src='../img/icons/new-theme.png' width='48' height='48'>"+
                "</div>"+
            "</div>"+
        "</div>"
    );
 
}


function contentCourseModules(module, key, id_modules){
    
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
               /* '<div class="row">'+
                    '<div class="col-md-12 col-sm-12 mt-3">'+
                        '<div class="form-group">'+
                            '<input  type="text" class="form-control" placeholder="Escribe el nombre del tema">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-12 col-sm-12 mt-3">'+
                        "<div class='form-group' id=div-select-themes>"+
                           '<input type ="text" value='+id_modules+' class=input-id-module>'+
                           "<select class='browser-default custom-select' id=select-theme-module"+key+">"+
                                "<option selected disabled>Seleccionar tema</option>"+
                           "</select>"+
                        "</div>"+
                        '<div class="custom-file">'+
                            '<input type="file" class="custom-file-input" id="files-course" lang="es">'+
                            '<label class="custom-file-label" for="files-course">Seleccionar material o video</label>'+
                            '<label><strong>Nota:</strong>El video debe de pesar menos de 4 GB.</label>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row justify-content-center mt-3">'+
                    '<div class="col-md-3 col-sm-12">'+
                       
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-md-8 col-sm-12">'+
                    '<button class="btn text-white btn-update-module" id="btn-modules-course">Actualizar módulo</button>'+
                '</div>'+
                '<div class="col-md-4 col-sm-12">'+
                    '<input class="mt-3" title="Agregar nuevo tema al módulo" type="image" src="../img/icons/new-theme.png" width="48" height="48">'+
                '</div>'+
            '</div>'+*/
        '</div>'
    );
 
}