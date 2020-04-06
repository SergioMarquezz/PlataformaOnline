$(document).ready(function () {
    
    $.ajax({
        url: "../includes/check-session.php",
        
        success: function (response) {
            var json = JSON.parse(response); 
        
            if(json.session == false){

                window.location.href = "https://192.168.1.76/PlataformaIFPP";
            }
        }
    });

    closeSession();
});


function closeSession(){

    var name_user = $("#close-session").attr('href');

    $("#close-session").click(function (e) { 
        e.preventDefault();
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Tu sesión se cerrará",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#092432',
            cancelButtonColor: '#bb1825',
            confirmButtonText: '¡Estoy seguro!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              
                $.ajax({
 
                    url: "../includes/close-session.php?name_user="+name_user,
                    success: function (response) {
        
                        if(response == "cerrar"){
        
                            window.location.href = "https://192.168.1.76/PlataformaIFPP";
                        }
                    }
                });
            }
          })
    });


}