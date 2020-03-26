
$(document).ready(function () {
    
    document.getElementById("btn-start").addEventListener("click",start);
    document.getElementById("btn-registry").addEventListener("click",savePersons);
    document.getElementById("btn-continue").addEventListener("click",recoverPassword);
    document.getElementById("all-courses").addEventListener("click", allCourses);

    //Llamada de metodos
    fillInComboCountris();
    fillInComboState();
    fillInComboMunicipality();
    validateLettersNumbers();
    dateBirth();
    changeNumEmployee();
    disabledInputs();
    showVideos();

});

function allCourses(){

    Swal.fire({
        title: 'Debes iniciar sesión en la plataforma',
        text: 'Todos los cursos de la plataforma están disponibles una vez que hayas ingresado al menú principal',
        icon: 'warning',
        confirmButtonColor: '#092432',
        confirmButtonText: 'Entendido',
        allowOutsideClick: false

    }).then((result)=>{

        if(result.value){
            
            $("#modalLoginForm").modal('show');
        }
    })
}

//Funcion para iniciar sesión
function start(){

    var employee = document.getElementById("login-name").value;
    var password = document.getElementById("login-password").value;

    $.ajax({
        type: "POST",
        url: "php/main.php",
        data: {
            "option": 'login',
            "num_employee": employee,
            "pass": password
        },
   
        success: function (response) {
            
            if(response == "user rigth instructor"){

                Swal.fire({
                    title: 'Acceso concedido a la plataforma',
                    text: 'Tus credenciales son correctas, en el sistema eres Instructor(a) ¡BIENVENIDO(A)!',
                    icon: 'success',
                    confirmButtonColor: '#092432',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false

                }).then((result)=>{
                    if(result.value){

                        window.location.href = "views/ifpp-main";
                    }
                })
            }

            else if(response == "user rigth student"){


                Swal.fire({
                    title: 'Acceso concedido a la plataforma',
                    text: 'Tus credenciales son correctas, en el sistema eres Alumno(a) ¡BIENVENIDO(A)!',
                    icon: 'success',
                    confirmButtonColor: '#092432',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false

                }).then((result)=>{
                    if(result.value){

                        window.location.href = "views/ifpp-main";
                    }
                })

            }
            else if(response == "user incorrect"){

                Swal.fire({
                    title: 'Acceso denegado a la plataforma',
                    text: 'Verifica que tus credenciales para ingresar sean las correctas',
                    icon: 'error',
                    confirmButtonColor: '#bb1825',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false

                });
            }

        }
    });
}

function showVideos(){
    
    $.ajax({
        type: "POST",
        url: "php/main.php",
        data: {
            "option": 'show videos'
        },
        success: function (response) {

            if(response == "sin videos"){

                Swal.fire({
                    icon: 'info',
                    title: 'No hay cursos disponibles todavía',
                    text: 'Cuando se registren los cursos mas recientes se podrán ver aquí',
                    confirmButtonColor: '#092432',
                    confirmButtonText: 'Aceptar!',
                    allowOutsideClick: false
        
                  });
            }
            else{

                var json = JSON.parse(response);
        
                $("#video1").append("<source src="+json.url_videos[0].url_video+" type='video/mp4'>");
                $("#title-video1").text(json.url_videos[0].title);
                $("#text-video1").text(json.url_videos[0].description);

                $("#video2").append("<source src="+json.url_videos[1].url_video+" type='video/mp4'>");
                $("#title-video2").text(json.url_videos[1].title);
                $("#text-video2").text(json.url_videos[1].description);

                $("#video3").append("<source src="+json.url_videos[2].url_video+" type='video/mp4'>");
                $("#title-video3").text(json.url_videos[2].title);
                $("#text-video3").text(json.url_videos[2].description);

                $("#video4").append("<source src="+json.url_videos[3].url_video+" type='video/mp4'>");
                $("#title-video4").text(json.url_videos[3].title);
                $("#text-video4").text(json.url_videos[3].description);

                $("#video5").append("<source src="+json.url_videos[4].url_video+" type='video/mp4'>");
                $("#title-video5").text(json.url_videos[4].title);
                $("#text-video5").text(json.url_videos[4].description);

                $("#video6").append("<source src="+json.url_videos[5].url_video+" type='video/mp4'>");
                $("#title-video6").text(json.url_videos[5].title);
                $("#text-video6").text(json.url_videos[5].description);
            }
            
        }
    });
}
//Se llena el combo
//fill in = llenar
function fillInComboCountris(){

    $.ajax({
        type: "POST",
        url: "php/main.php",
        data: {
            "option": 'countries'
        },
        success: function (response) {

           var json = JSON.parse(response);
           var size = json.countries.length;
        
           for (rows = 0; rows < size; rows++){

             $("#registry-country").append("<option value="+json.countries[rows].id_country+">"+json.countries[rows].name+"</option>");
           }
        }
    });
}
//Se llena el combo
function fillInComboState(){

    $("#registry-country").change(function (e) { 
        e.preventDefault();
        $("#registry-state").empty();
        var value_country = document.getElementById("registry-country").value;
        
        $.ajax({
            type: "POST",
            url: "php/main.php",
            data: {
                "option": 'states',
                "country": value_country
            },
            success: function (response) {
                var json = JSON.parse(response);
                var size = json.states.length;

                for (rows = 0; rows < size; rows++){

                    $("#registry-state").append("<option value="+json.states[rows].id_state+">"+json.states[rows].name+"</option>");
                  }
            }
        });
    });
}
//Se llena el combo
function fillInComboMunicipality(){

    $("#registry-state").change(function (e) { 
        e.preventDefault();

        $("#registry-municipality").empty();
        var value_state = document.getElementById("registry-state").value;

        $.ajax({
            type: "POST",
            url: "php/main.php",
            data: {
                "option": 'cities',
                "states": value_state
            },
            success: function (response) {
                var json = JSON.parse(response);
                var size = json.cities.length;

                for(rows_id = 0; rows_id < size; rows_id++){

                    var options = "<option value="+json.cities[rows_id].id_city+">"+json.cities[rows_id].name+"</option>";
                    $("#registry-municipality").append(options);
                }
                
            }
        });
    });
}

//Se concatena la fecha de nacimiento
function birth(){

    var year = document.getElementById("registry-year").value;
    var month = document.getElementById("registry-month").value;
    var day = document.getElementById("registry-day").value;

   $("#birth").val(year+"-"+month+"-"+day);
}

function disabledInputs(){

    $("#registry-name").attr('disabled', true);
    $("#registry-father").attr('disabled', true);
    $("#registry-mother").attr('disabled', true);
    $("#registry-country").attr('disabled', true);
    $("#registry-state").attr('disabled', true);
    $("#registry-municipality").attr('disabled', true);
    $("#registry-password").attr('disabled', true);
    $("#registry-gender").attr('disabled', true);
    $("#registry-year").attr('disabled', true);
    $("#registry-month").attr('disabled', true);
    $("#registry-day").attr('disabled', true);
 
}

function enableInputs(){

    $("#registry-name").attr('disabled', false);
    $("#registry-father").attr('disabled', false);
    $("#registry-mother").attr('disabled', false);
    $("#registry-country").attr('disabled', false);
    $("#registry-state").attr('disabled', false);
    $("#registry-municipality").attr('disabled', false);
    $("#registry-password").attr('disabled', false);
    $("#registry-gender").attr('disabled', false);
    $("#registry-year").attr('disabled', false);
    $("#registry-month").attr('disabled', false);
    $("#registry-day").attr('disabled', false);
}

//Se cambia el input de numero de empleado
function changeNumEmployee(){

    $("input[name=type-user]").change(function (e) { 
        e.preventDefault();
        
        if($("#radio-student").is(':checked')){

            $("#registry-num").attr('disabled', false);
            $("#registry-num").val("");
            $("#text-employee").text("Número de empleado(a)");
            enableInputs();
            
        }
        else{

            $("#registry-num").attr('disabled', true);
            $("#text-employee").text("Número de instructor(a)");
            enableInputs();

            $.ajax({
                type: "POST",
                url: "php/main.php",
                data: {
                    "option": 'count instructor'
                },
                success: function (response) {
                    var json = JSON.parse(response);
                    
                    $("#registry-num").val(json.value);
                }
            });
        }
    });
}

//Se obtiene la fecha de nacimiento por cada input
function dateBirth(){

    $("#registry-day").change(function (e) { 
        e.preventDefault();
      
        birth();
    });

    $("#registry-year").keyup(function (e) { 
      
        birth();
    });

    $("#registry-month").change(function (e) { 
        e.preventDefault();
        
        birth();
    });
}

//Funcion para realizar el registro a base de datos
function savePersons(){

        var num_employee = document.getElementById("registry-num").value;
        var name = document.getElementById("registry-name").value;
        var father = document.getElementById("registry-father").value;
        var mother = document.getElementById("registry-mother").value;
        var country = document.getElementById("registry-country").value;
        var state = document.getElementById("registry-state").value;
        var municipality = document.getElementById("registry-municipality").value;
        var password = document.getElementById("registry-password").value;
        var gender = document.getElementById("registry-gender").value;
        var birth = document.getElementById("birth").value;
        var year = document.getElementById("registry-year").value;
        var type_user = $("input[name=type-user]:checked").val();

        var index_country = document.getElementById("registry-country").selectedIndex;
        var index_month = document.getElementById("registry-month").selectedIndex;
        var index_day = document.getElementById("registry-day").selectedIndex;
        var index_gender = document.getElementById("registry-gender").selectedIndex;

        var text_country = $("#registry-country option:selected").text();
        var text_state = $("#registry-state option:selected").text();
        var text_municipality = $("#registry-municipality option:selected").text();

        //Validaciones del registro
        if(num_employee == ""){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Escribe tu numero de empleado para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
              });
        
            document.getElementById("registry-num").style.borderColor = "red";
            document.getElementById("registry-num").focus();
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            
        }

        else if(name == ""){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Escribe tu nombre para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-name").focus();
            document.getElementById("registry-name").style.borderColor = "red";
            document.getElementById("registry-num").style.borderColor = "#044c70";
        }
        else if(father == ""){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Escribe tu apellido paterno para que tu registro se pueda completar',
                confirmButtonText: 'Aceptar!',
                confirmButtonColor: '#092432',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-father").focus();
            document.getElementById("registry-father").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(mother == ""){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Escribe tu apellido materno para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-mother").focus();
            document.getElementById("registry-mother").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(index_country == 0){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Elige un país para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-country").focus();
            document.getElementById("registry-country").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(year == ""){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Escribe tu año de nacimiento para que tu registro se pueda completar',
                confirmButtonText: 'Aceptar!',
                confirmButtonColor: '#092432',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-year").focus();
            document.getElementById("registry-year").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(index_month == 0){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Elige tu mes de nacimiento para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-month").focus();
            document.getElementById("registry-month").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(index_day == 0){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Elige tu día de nacimiento para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-day").focus();
            document.getElementById("registry-day").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(password == ""){

            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Tienes que escribir una contraseña para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-password").focus();
            document.getElementById("registry-password").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-gender").style.borderColor = "#044c70";
        }

        else if(index_gender == 0){
            
            Swal.fire({
                icon: 'error',
                title: 'Faltan datos en el registro',
                text: 'Elige tu sexo para que tu registro se pueda completar',
                confirmButtonColor: '#092432',
                confirmButtonText: 'Aceptar!',
                allowOutsideClick: false
        
                });
            document.getElementById("registry-gender").focus();
            document.getElementById("registry-gender").style.borderColor = "red";
            document.getElementById("registry-name").style.borderColor = "#044c70";
            document.getElementById("registry-num").style.borderColor = "#044c70";
            document.getElementById("registry-father").style.borderColor = "#044c70";
            document.getElementById("registry-mother").style.borderColor = "#044c70";
            document.getElementById("registry-country").style.borderColor = "#044c70";
            document.getElementById("registry-year").style.borderColor = "#044c70";
            document.getElementById("registry-month").style.borderColor = "#044c70";
            document.getElementById("registry-day").style.borderColor = "#044c70";
            document.getElementById("registry-password").style.borderColor = "#044c70";

        }

        else{

            var user;;

            if(type_user == 2){

                user = "Instructor(a)";
            }

            else if(type_user == 3){
                
                user = "Alumno(a)";
            }

            else{
                user = "sin definir";
            }

            //Mensaje final del registro
            Swal.fire({
                title: '<h2>Tus datos de registro</h2>',
                icon: 'info',
                html: '<b>Verifica que todos tus datos sean correctos</b>' +
                  '<p>Número de empleado(a) o instructor(a): '+num_employee+'</p><p>Tu nombre: '+name+' '+father+' '+mother+'</p>' +
                  '<p>País: '+text_country+'</p><p>Estado: '+text_state+'</p><p>Municipio: '+text_municipality+'</p>' +
                  '<p>Fecha de nacimiento: '+birth+'</p>'+
                  '<p>Sexo: '+gender+'</p><p>Tu contraseña: '+password+'</p>' +
                  '<p>En la plataforma serás: '+user+'</p>',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Los datos son correctos!',
                confirmButtonColor: '#092432',
                cancelButtonColor: '#bb1825',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false
              }).then((result) => {
                if (result.value) {
                    //Se ejecuta el php con ajax
                     $.ajax({
                        type: "POST",
                        url: "php/main.php",
                        data: {
                            "option": 'insert persons',
                            "num": num_employee,
                            "id_user": type_user,
                            "name": name,
                            "pat": father,
                            "mat": mother,
                            "id_country": country,
                            "id_state": state,
                            "id_city": municipality,
                            "birth": birth,
                            "pass": password,
                            "gender" : gender
                        },
                        success: function (response) {
                            var json = JSON.parse(response);
                            
                            if(json.msj == "saved record"){
                                
                                Swal.fire({
                                    title: 'Te has registrado en la plataforma',
                                    text: 'Podrás iniciar sesión con tu cuenta la próxima vez que quieras acceder',
                                    icon: 'success',
                                    confirmButtonText: 'Enterado',
                                    confirmButtonColor: '#092432',
                                    allowOutsideClick: false

                                }).then((result)=>{
                                    if(result.value){

                                        location.reload();
                                    }
                                })
                            }
                        }
                    });
                
                }
              })
        }
}

function recoverPassword(){

    var value_birth = document.getElementById("recover-birth").value;
    var value_number = document.getElementById("recover-num").value;

    $.ajax({
        type: "POST",
        url: "php/main.php",
        data: {
            "option": 'full name',
            "number_employee": value_number,
            "birth": value_birth
        },
        success: function (response) {

            $("#modalLoginForm").modal('hide');
            
            var json = JSON.parse(response);
            var string

            Swal.mixin({
                input: 'password',
                confirmButtonText: 'Siguiente &rarr;',
                confirmButtonColor: '#092432',
                cancelButtonColor: '#bb1825',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
                allowOutsideClick: false,
                inputAttributes: {
                    maxlength: 50,
                  }
              }).queue([
                {
                  title: json.full_name.name,
                  text: "Escribe una nueva contraseña para poder acceder a la plataforma",
                  inputPlaceholder: 'Nueva contraseña',
                  
                },
                
              ]).then((result) => {

                
                if (result.value != "") {
                  
                    var values = result.value;
                    string = values.toString();

                  Swal.mixin({
                    icon: "info",
                    html: `
                        Es importante que la recuerdes para poder acceder a la plataforma 
                        ¡Tu contraseña será:
                      <strong>${string}</strong>!
                    `,
                    confirmButtonText: 'Estoy seguro(a)',
                    cancelButtonText: 'Cancelar',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#092432',
                    cancelButtonColor: '#bb1825',
                  }).queue([
                      {
                          title:'Tu nueva contraseña será guardada'
                      },
                  ]).then((result)=>{
                      if(result.value){

                        var employee_num = document.getElementById("recover-num").value;
                        var both = document.getElementById("recover-birth").value;
                        
                         $.ajax({
                              type: "POST",
                              url: "php/main.php",
                              data: {
                                  "option": 'recover password',
                                  "new": string,
                                  "employee": employee_num,
                                  "both": both
                                  
                              },
                              success: function (response) {
                                  
                                var json = JSON.parse(response);
                             
                                if(json.message == "pass update"){

                                    Swal.fire({
                                        title: 'Has actualizado tu contraseña',
                                        text: 'Recuerda utilizar la nueva contraseña para poder acceder a la plataforma',
                                        icon: 'success',
                                        confirmButtonText: 'Entendido',
                                        confirmButtonColor: '#092432',
                                        allowOutsideClick: false
    
                                    }).then((result)=>{
                                        if(result.value){
    
                                            location.reload();
                                        }
                                    })
                                }
                              }
                          });
                      }
                      else if(result.dismiss === 'cancel'){
                          
                      }
                  })
                }
                else{
                    Swal.fire({
                        title: 'La contraseña no puede ser vacia',
                        text: 'Escribe una nueva contraseña para poder acceder a la plataforma',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#092432',
                        allowOutsideClick: false

                    })
                }
              })
        }
        
    });
}

//Funcion para validar caracteres de los inputs
function validateLettersNumbers(){

    //Solo letras
    $("#registry-name, #registry-father, #registry-mother, #recover-name").keypress(function (e) { 
        
        if(event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122 || event.charCode == 32){
            return true;
           }
           return false;
    })

    //Solo numeros
    $("#registry-num, #registry-year, #login-name, #recover-num").keypress(function (e) { 
        
        if(event.charCode >= 48 && event.charCode <= 57){
            return true;
           }
           return false;

    });
}