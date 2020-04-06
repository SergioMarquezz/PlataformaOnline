window.onload = function(){

    window.location.hash = "no-back-button";
  
    window.location.hash = "Again-No-back-button" //chrome

    window.onhashchange = function (){

        window.location.hash = "no-back-button";
    }

}

$(document).ready(function () {
    hideButtonInstructor();
   
});

function hideButtonInstructor(){

    var type_user = document.getElementById("input-type").value;

    if(type_user == "Instructor(a)"){

        $("#button-instructor").show();
        $("#button-alumno").hide();
        $("#my-courses").hide();
        $("#certificate").hide();
        buttonDenied();
    }

    else{
        $("#button-instructor").hide();
        $("#exam").hide();
    }
     
}

function buttonDenied(){

    $(document).on('click', '#access-course', function(event) {

        event.preventDefault()

        Swal.fire({
            title: 'La plataforma te detecto que eres Instructor(a)',
            text: 'Acceso denegado, únicamente puedes crear cursos como instructor(a), aquí se podrá ver tu curso cuando lo hayas creado',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#092432',
            allowOutsideClick: false

        })
        
    });
   
}
