function messageButtonSaveModule(modules,theme,curso,categoria){

    if(modules == ""){

        Swal.fire({
    
            title: "No hay un nombre para el módulo",
            text: "Escribe el nombre que tendrá este módulo",
            icon: "error",
            confirmButtonColor: '#092432',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
    
        });
    }
    else if(theme == ""){

        Swal.fire({
    
            title: "Faltan temas para este módulo",
            text: "Escribe el nombre del tema",
            icon: "error",
            confirmButtonColor: '#70b52c',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
    
        });
    }

    /*else if(file == undefined || $(visible).is(":visible")){

        Swal.fire({
            
            title: "Falta material para el tema",
            text: "Selecciona material o video para este tema",
            icon: "error",
            confirmButtonColor: '#70b52c',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
    
        });
    }

    else if(texto_btn == "Subir archivo o video" || texto_btn == "Cambiar material o video para el tema"){

        Swal.fire({
    
            title: "No has subido el material",
            text: "Antes de guardar el módulo sube el material correspondiente",
            icon: "error",
            confirmButtonColor: '#092432',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
    
        });
    }*/

    else{

        Swal.fire({
    
            title: "¿Estas seguro de guardar este módulo? ",
            text: "Al igual que el módulo todos sus temas quedaran guardados ",
            icon: "question",
            confirmButtonColor: '#092432',
            confirmButtonText: '¡SI!',
            showCancelButton: true,
            cancelButtonColor: '#bb1825',
            cancelButtonText: '¡NO!',
            allowOutsideClick: false
    
        }).then(result=>{
            if(result.value){

                saveModule(modules,curso,categoria);
            }
        })
    }
    
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
            button_color = '#092432';
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

function swalSimple(condition){

    switch(condition){

        case "modulo":
            Swal.fire({

                title: "Módulo registrado",
                text: "Si deseas agregar más módulos a tu curso presiona el botón de agregar nuevo módulo",
                icon: "success",
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
            break;
        case "curso":
            Swal.fire({

                title: "Curso registrado",
                text: "Su curso fue registrado en la plataforma es momento de crear los módulos y temas",
                icon: "success",
                timer: 10000,
                timerProgressBar: true,
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
            break;
        case "escribir tema":
            Swal.fire({
    
                title: "No se puede asignar un nuevo tema",
                text: "Escribe el nombre del tema y módulo actual",
                icon: "info",
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
            break;

          case "subir material":
            Swal.fire({
    
                title: "No se puede subir archivo",
                text: "Elije archivo o video para un tema",
                icon: "info",
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
            break;

        /*case "tema vacio":
            Swal.fire({

                title: "No puede asignar material y/o video",
                text: "Escribe primero el nombre del tema para asignar material y/o video",
                icon: "warning",
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
        
            });
            break;*/
    }
}


