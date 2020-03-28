function messageButtonSaveModule(modules,theme,file,visible,texto_btn,curso,categoria){

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

    else if(file == undefined || $(visible).is(":visible")){

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
    }

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

