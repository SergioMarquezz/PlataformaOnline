var value_question_one = $("#question-one");
var value_question_two = $("#question-two");
var value_question_three = $("#question-three");
var value_question_four = $("#question-four");
var value_question_five = $("#question-five");
var value_question_six = $("#question-six");
var value_question_seven = $("#question-seven");
var value_question_eight = $("#question-eight");
var value_question_nine = $("#question-nine");
var value_question_ten = $("#question-ten");

var label_one = $("#label-one");
var label_two = $("#label-two");
var label_three = $("#label-three");
var label_four = $("#label-four");
var label_five = $("#label-five");
var label_six = $("#label-six");
var label_seven = $("#label-seven");
var label_eight = $("#label-eight");
var label_nine = $("#label-nine");
var label_ten = $("#label-ten");

var value_answer_1_1 = $("#answer-1-1");
var value_answer_1_2 = $("#answer-1-2");
var value_answer_1_3 = $("#answer-1-3");
var value_answer_1_4 = $("#answer-1-4");

var value_answer_2_1 = $("#answer-2-1");
var value_answer_2_2 = $("#answer-2-2");
var value_answer_2_3 = $("#answer-2-3");
var value_answer_2_4 = $("#answer-2-4");

var value_answer_3_1 = $("#answer-3-1");
var value_answer_3_2 = $("#answer-3-2");
var value_answer_3_3 = $("#answer-3-3");
var value_answer_3_4 = $("#answer-3-4");

var value_answer_4_1 = $("#answer-4-1");
var value_answer_4_2 = $("#answer-4-2");
var value_answer_4_3 = $("#answer-4-3");
var value_answer_4_4 = $("#answer-4-4");

var value_answer_5_1 = $("#answer-5-1");
var value_answer_5_2 = $("#answer-5-2");
var value_answer_5_3 = $("#answer-5-3");
var value_answer_5_4 = $("#answer-5-4");

var value_answer_6_1 = $("#answer-6-1");
var value_answer_6_2 = $("#answer-6-2");
var value_answer_6_3 = $("#answer-6-3");
var value_answer_6_4 = $("#answer-6-4");

var value_answer_7_1 = $("#answer-7-1");
var value_answer_7_2 = $("#answer-7-2");
var value_answer_7_3 = $("#answer-7-3");
var value_answer_7_4 = $("#answer-7-4");

var value_answer_8_1 = $("#answer-8-1");
var value_answer_8_2 = $("#answer-8-2");
var value_answer_8_3 = $("#answer-8-3");
var value_answer_8_4 = $("#answer-8-4");

var value_answer_9_1 = $("#answer-9-1");
var value_answer_9_2 = $("#answer-9-2");
var value_answer_9_3 = $("#answer-9-3");
var value_answer_9_4 = $("#answer-9-4");

var value_answer_10_1 = $("#answer-10-1");
var value_answer_10_2 = $("#answer-10-2");
var value_answer_10_3 = $("#answer-10-3");
var value_answer_10_4 = $("#answer-10-4");




$(document).ready(function () {
    
    questionKeyUp();
    chooseAswerCorrect();
    showTitleCourses();
    selectCourse();
    btnAnswerCorrect();
});


function showTitleCourses(){

    $.post("../php/create-exam.php",{

        option: 'list courses'

    },function(data){

        var json = JSON.parse(data);

        var size = json.courses.length;

        for(var i = 0; i < size; i++){

            $("#title-select-course").append('<option value='+json.courses[i].id_course+'>'+json.courses[i].title+'</option>');

        }
    })
}

function saveQuestions(number,questions,id){



    Swal.fire({
        title: 'Pregunta numero '+number,
        text: 'La pregunta quedara guardada para este examen, ¿Quieres continuar?',
        icon: 'question',
        confirmButtonText: 'Si',
        confirmButtonColor: '#092432',
        cancelButtonColor: '#bb1825',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowOutsideClick: false

    }).then(result =>{

        if(result.value){

            $("#modal-answer-correct").modal('show');
          
            $.post("../php/create-exam.php",{

                option: 'insert questions',
                question_number: number,
                question: questions,
                id_course: id
        
            },function(response){
        
                console.log(response);
            })
        }
        else{
            $("#btn-"+number).attr('disabled', false);
        }
    })
}

function selectCourse(){

    $("#title-select-course").change(function (e) { 
        e.preventDefault();

        $("#div-questions").removeClass('disabled');
    });
}


function showModalAnswerCorrect(title_modal,answers1,answers2,answers3,answers4){

    
    $("#title-question-modal").text(title_modal);

    $("#label-answer-1").text(answers1);
    $("#label-answer-2").text(answers2);
    $("#label-answer-3").text(answers3);
    $("#label-answer-4").text(answers4);

    $("#radio-answer-1").val(answers1);
    $("#radio-answer-2").val(answers2);
    $("#radio-answer-3").val(answers3);
    $("#radio-answer-4").val(answers4);
}

function questionKeyUp(){

    $("#question-one, #question-two, #question-three, #question-four, #question-five, #question-six, #question-seven, #question-eight, #question-nine, #question-ten").keyup(function (e) { 
        
        var one = value_question_one.val();
        var two =  value_question_two.val();
        var three = value_question_three.val();
        var four = value_question_four.val();
        var five = value_question_five.val();
        var six = value_question_six.val();
        var seven = value_question_seven.val();
        var eight = value_question_eight.val();
        var nine = value_question_nine.val();
        var ten = value_question_ten.val();

        label_one.text("¿ "+one+" ? ");
        label_two.text("¿ "+two+" ? ");
        label_three.text("¿ "+three+" ? ");
        label_four.text("¿ "+four+" ? ");
        label_five.text("¿ "+five+" ? ");
        label_six.text("¿ "+six+" ? ");
        label_seven.text("¿ "+seven+" ? ");
        label_eight.text("¿ "+eight+" ? ");
        label_nine.text("¿ "+nine+" ? ");
        label_ten.text("¿ "+ten+" ? ");
    });
}

function message(){

    Swal.fire({
        title: 'Pregunta o respuestas vacías',
        text: 'Escribe la pregunta y todas sus posibles respuestas para poder guardarla',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#092432',
        allowOutsideClick: false

    });
}


function saveAnswers(text_number){

    var number_answer_question_1 = document.getElementsByClassName("answer-question-1").length;
    var number_answer_question_2 = document.getElementsByClassName("answer-question-2").length;
    var number_answer_question_3 = document.getElementsByClassName("answer-question-3").length;
    var number_answer_question_4 = document.getElementsByClassName("answer-question-4").length;
    var number_answer_question_5 = document.getElementsByClassName("answer-question-5").length;
    var number_answer_question_6 = document.getElementsByClassName("answer-question-6").length;
    var number_answer_question_7 = document.getElementsByClassName("answer-question-7").length;
    var number_answer_question_8 = document.getElementsByClassName("answer-question-8").length;
    var number_answer_question_9 = document.getElementsByClassName("answer-question-9").length;
    var number_answer_question_10 = document.getElementsByClassName("answer-question-10").length;


    switch(text_number){

        case "1":
            answers(number_answer_question_1,text_number)
            break;

        case "2":
            answers(number_answer_question_2,text_number)
            break;

        case "3":
            answers(number_answer_question_3,text_number)
            break;

        case "4":
            answers(number_answer_question_4,text_number)
            break;

        case "5":
            answers(number_answer_question_5,text_number)
            break;

        case "6":
            answers(number_answer_question_6,text_number)
            break;

        case "7":
            answers(number_answer_question_7,text_number)
            break;

        case "8":
            answers(number_answer_question_8,text_number)
            break;

        case "9":
            answers(number_answer_question_9,text_number)
            break;

        case "10":
            answers(number_answer_question_10,text_number)
            break;

    }
}


function answers(number_answer,num){

    for(var i = 1; i <= number_answer; i++){
        
        $.post("../php/create-exam.php",{

            option: 'insert answer',
            number_answer: i,
            answer: $("#answer-"+num+"-"+i).val(),
            key_course: $("#title-select-course option:selected").val(),
           
          },function(datos){
    
            console.log(datos);
          })
    }
}

function btnAnswerCorrect(){

    $("#btn-answer-correct").click(function (e) { 
        e.preventDefault();
       
        var value_num = $("#input-value-question").val();
        var text_question = $("#input-text-question").val();
        var radio_select = $('input:radio[name=name-radio-answers]:checked').val();

        Swal.fire({
            title: '¿Esta seguro de la respuesta?',
            text: 'La respuesta quedara guardada',
            icon: 'question',
            confirmButtonText: 'Si',
            confirmButtonColor: '#092432',
            cancelButtonColor: '#bb1825',
            cancelButtonText: 'No',
            showCancelButton: true,
            allowOutsideClick: false
    
        }).then(result=>{

            if(result.value){

                saveAnswers(value_num);
                $("#modal-answer-correct").modal('hide');

                $.post("../php/create-exam.php",{

                    respuesta: radio_select,
                    text_answer: text_question,
                    option:  'answer correct'
                },function(data){

                    console.log(data);
                })
            }
        })

 
    });
}

function chooseAswerCorrect(){

    var btns = document.getElementsByClassName("btn-save-questions").length;
    

    for(var i = 1; i <= btns; i++){

        $("#btn-"+i).click(function (e) { 
            e.preventDefault();
           
            var id_btn = $(this).attr('id');
            var number_button = $(this).text().substr(17);
            var option_id = $("#title-select-course option:selected").val();


            switch(id_btn){

                case "btn-1":
                    var question_one = value_question_one.val();
                    var one_label = label_one.text();
                    var answer_1_1 = value_answer_1_1.val();
                    var answer_1_2 = value_answer_1_2.val();
                    var answer_1_3 = value_answer_1_3.val();
                    var answer_1_4 = value_answer_1_4.val();

                    if(label_one.text() != "" && value_answer_1_1.val() != "" && value_answer_1_2.val() != "" && value_answer_1_3.val() != "" && value_answer_1_4.val() != ""){

                        showModalAnswerCorrect(one_label,answer_1_1,answer_1_2,answer_1_3,answer_1_4);
                        saveQuestions(number_button,question_one,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_one);
                        $("#btn-1").attr('disabled', true);
                    }
                    else{
                         
                        message();
                    }
                    
                break;

                case "btn-2":
                    var question_two = value_question_two.val();
                    var two_label = label_two.text();
                    var answer_2_1 = value_answer_2_1.val();
                    var answer_2_2 = value_answer_2_2.val();
                    var answer_2_3 = value_answer_2_3.val();
                    var answer_2_4 = value_answer_2_4.val();

                    if(label_two.text() != "" && value_answer_2_1.val() != "" && value_answer_2_2.val() != "" && value_answer_2_3.val() != "" && value_answer_2_4.val() != ""){

                        showModalAnswerCorrect(two_label,answer_2_1,answer_2_2,answer_2_3,answer_2_4);
                        saveQuestions(number_button,question_two,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_two);
                        $("#btn-2").attr('disabled', true)
                    }
                    else{
                        message();
                    } 
                    
                break;

                case "btn-3":
                    var question_three = value_question_three.val();
                    var three_label = label_three.text();
                    var answer_3_1 = value_answer_3_1.val();
                    var answer_3_2 = value_answer_3_2.val();
                    var answer_3_3 = value_answer_3_3.val();
                    var answer_3_4 = value_answer_3_4.val();

                    if(label_three.text() != "" && value_answer_3_1.val() != "" && value_answer_3_2.val() != "" && value_answer_3_3.val() != "" && value_answer_3_4.val() != ""){

                        showModalAnswerCorrect(three_label,answer_3_1,answer_3_2,answer_3_3,answer_3_4);
                        saveQuestions(number_button,question_three,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_three);
                        $("#btn-3").attr('disabled', true)
                    }
                    else{

                        message();
                    }
                    
                break;

                case "btn-4":
                    var question_four = value_question_four.val();
                    var four_label = label_four.text();
                    var answer_4_1 = value_answer_4_1.val();
                    var answer_4_2 = value_answer_4_2.val();
                    var answer_4_3 = value_answer_4_3.val();
                    var answer_4_4 = value_answer_4_4.val();

                    if(label_four.text() != "" && value_answer_4_1.val() != "" && value_answer_4_2.val() != "" && value_answer_4_3.val() != "" && value_answer_4_4.val() != ""){

                        showModalAnswerCorrect(four_label,answer_4_1,answer_4_2,answer_4_3,answer_4_4);
                        saveQuestions(number_button,question_four,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_four);
                        $("#btn-4").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;

                case "btn-5":
                    var question_five = value_question_five.val();
                    var five_label = label_five.text();
                    var answer_5_1 = value_answer_5_1.val();
                    var answer_5_2 = value_answer_5_2.val();
                    var answer_5_3 = value_answer_5_3.val();
                    var answer_5_4 = value_answer_5_4.val();

                    if(label_five.text() != "" && value_answer_5_1.val() != "" && value_answer_5_2.val() != "" && value_answer_5_3.val() != "" && value_answer_5_4.val() != ""){

                        showModalAnswerCorrect(five_label,answer_5_1,answer_5_2,answer_5_3,answer_5_4);
                        saveQuestions(number_button,question_five,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_five);
                        $("#btn-5").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;

                case "btn-6":
                    var question_six = value_question_six.val();
                    var six_label = label_six.text();
                    var answer_6_1 = value_answer_6_1.val();
                    var answer_6_2 = value_answer_6_2.val();
                    var answer_6_3 = value_answer_6_3.val();
                    var answer_6_4 = value_answer_6_4.val();

                    if(label_six.text() != "" && value_answer_6_1.val() != "" && value_answer_6_2.val() != "" && value_answer_6_3.val() != "" && value_answer_6_4.val() != ""){

                        showModalAnswerCorrect(six_label,answer_6_1,answer_6_2,answer_6_3,answer_6_4);
                        saveQuestions(number_button,question_six,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_six);
                        $("#btn-6").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;

                case "btn-7":
                    var question_seven = value_question_seven.val();
                    var seven_label = label_seven.text();
                    var answer_7_1 = value_answer_7_1.val();
                    var answer_7_2 = value_answer_7_2.val();
                    var answer_7_3 = value_answer_7_3.val();
                    var answer_7_4 = value_answer_7_4.val();

                    if(label_seven.text() != "" && value_answer_7_1.val() != "" && value_answer_7_2.val() != "" && value_answer_7_3.val() != "" && value_answer_7_4.val() != ""){

                        showModalAnswerCorrect(seven_label,answer_7_1,answer_7_2,answer_7_3,answer_7_4);
                        saveQuestions(number_button,question_seven,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_seven);
                        $("#btn-7").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;

                case "btn-8":
                    var question_eight = value_question_eight.val();
                    var eight_label = label_eight.text();
                    var answer_8_1 = value_answer_8_1.val();
                    var answer_8_2 = value_answer_8_2.val();
                    var answer_8_3 = value_answer_8_3.val();
                    var answer_8_4 = value_answer_8_4.val();

                    if(label_eight.text() != "" && value_answer_8_1.val() != "" && value_answer_8_2.val() != "" && value_answer_8_3.val() != "" && value_answer_8_4.val() != ""){

                        showModalAnswerCorrect(eight_label,answer_8_1,answer_8_2,answer_8_3,answer_8_4);
                        saveQuestions(number_button,question_eight,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_eight);
                        $("#btn-8").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;

                case "btn-9":
                    var question_nine = value_question_nine.val();
                    var nine_label = label_nine.text();
                    var answer_9_1 = value_answer_9_1.val();
                    var answer_9_2 = value_answer_9_2.val();
                    var answer_9_3 = value_answer_9_3.val();
                    var answer_9_4 = value_answer_9_4.val();

                    if(label_nine.text() != "" && value_answer_9_1.val() != "" && value_answer_9_2.val() != "" && value_answer_9_3.val() != "" && value_answer_9_4.val() != ""){

                        showModalAnswerCorrect(nine_label,answer_9_1,answer_9_2,answer_9_3,answer_9_4);
                        saveQuestions(number_button,question_nine,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_nine);
                        $("#btn-9").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;

                case "btn-10":
                    var question_ten = value_question_ten.val();
                    var ten_label = label_ten.text();
                    var answer_10_1 = value_answer_10_1.val();
                    var answer_10_2 = value_answer_10_2.val();
                    var answer_10_3 = value_answer_10_3.val();
                    var answer_10_4 = value_answer_10_4.val();

                    if(label_ten.text() != "" && value_answer_10_1.val() != "" && value_answer_10_2.val() != "" && value_answer_10_3.val() != "" && value_answer_10_4.val() != ""){

                        showModalAnswerCorrect(ten_label,answer_10_1,answer_10_2,answer_10_3,answer_10_4);
                        saveQuestions(number_button,question_ten,option_id);
                        $("#input-value-question").val(number_button);
                        $("#input-text-question").val(question_ten);
                        $("#btn-10").attr('disabled', true)
                    }
                    else{
                        message();
                    }
                    
                break;
               
            }
        });
    }

}