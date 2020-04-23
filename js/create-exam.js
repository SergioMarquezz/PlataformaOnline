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
});


function showModalAnswerCorrect(title_modal,answers1,answers2,answers3,answers4){

    
    $("#modal-answer-correct").modal('show');

    $("#title-question-modal").text(title_modal);

    $("#label-answer-1").text(answers1);
    $("#label-answer-2").text(answers2);
    $("#label-answer-3").text(answers3);
    $("#label-answer-4").text(answers4);
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



function chooseAswerCorrect(){

    var btns = document.getElementsByClassName("btn-save-questions").length;

    for(var i = 1; i <= btns; i++){

        $("#btn-"+i).click(function (e) { 
            e.preventDefault();
           
            var id_btn = $(this).attr('id');

            switch(id_btn){

                case "btn-1":
                    var question_one = value_question_one.val();
                    var one_label = label_one.text();
                    var answer_1_1 = value_answer_1_1.val();
                    var answer_1_2 = value_answer_1_2.val();
                    var answer_1_3 = value_answer_1_3.val();
                    var answer_1_4 = value_answer_1_4.val();
                    
                    showModalAnswerCorrect(one_label,answer_1_1,answer_1_2,answer_1_3,answer_1_4);
                    
                break;

                case "btn-2":
                    var question_two = value_question_two.val();
                    var two_label = label_two.text();
                    var answer_2_1 = value_answer_2_1.val();
                    var answer_2_2 = value_answer_2_2.val();
                    var answer_2_3 = value_answer_2_3.val();
                    var answer_2_4 = value_answer_2_4.val();

                    showModalAnswerCorrect(two_label,answer_2_1,answer_2_2,answer_2_3,answer_2_4);
                    
                    
                break;

                case "btn-3":
                    var question_three = value_question_three.val();
                    var three_label = label_three.text();
                    var answer_3_1 = value_answer_3_1.val();
                    var answer_3_2 = value_answer_3_2.val();
                    var answer_3_3 = value_answer_3_3.val();
                    var answer_3_4 = value_answer_3_4.val();

                    showModalAnswerCorrect(three_label,answer_3_1,answer_3_2,answer_3_3,answer_3_4);
                    
                break;

                case "btn-4":
                    var question_four = value_question_four.val();
                    var four_label = label_four.text();
                    var answer_4_1 = value_answer_4_1.val();
                    var answer_4_2 = value_answer_4_2.val();
                    var answer_4_3 = value_answer_4_3.val();
                    var answer_4_4 = value_answer_4_4.val();

                    showModalAnswerCorrect(four_label,answer_4_1,answer_4_2,answer_4_3,answer_4_4);
                    
                break;

                case "btn-5":
                    var question_five = value_question_five.val();
                    var five_label = label_five.text();
                    var answer_5_1 = value_answer_5_1.val();
                    var answer_5_2 = value_answer_5_2.val();
                    var answer_5_3 = value_answer_5_3.val();
                    var answer_5_4 = value_answer_5_4.val();

                    showModalAnswerCorrect(five_label,answer_5_1,answer_5_2,answer_5_3,answer_5_4);
                    
                break;

                case "btn-6":
                    var question_six = value_question_six.val();
                    var six_label = label_six.text();
                    var answer_6_1 = value_answer_6_1.val();
                    var answer_6_2 = value_answer_6_2.val();
                    var answer_6_3 = value_answer_6_3.val();
                    var answer_6_4 = value_answer_6_4.val();

                    showModalAnswerCorrect(six_label,answer_6_1,answer_6_2,answer_6_3,answer_6_4);
                    
                break;

                case "btn-7":
                    var question_seven = value_question_seven.val();
                    var seven_label = label_seven.text();
                    var answer_7_1 = value_answer_7_1.val();
                    var answer_7_2 = value_answer_7_2.val();
                    var answer_7_3 = value_answer_7_3.val();
                    var answer_7_4 = value_answer_7_4.val();

                    showModalAnswerCorrect(seven_label,answer_7_1,answer_7_2,answer_7_3,answer_7_4);
                    
                break;

                case "btn-8":
                    var question_eight = value_question_eight.val();
                    var eight_label = label_eight.text();
                    var answer_8_1 = value_answer_8_1.val();
                    var answer_8_2 = value_answer_8_2.val();
                    var answer_8_3 = value_answer_8_3.val();
                    var answer_8_4 = value_answer_8_4.val();

                    showModalAnswerCorrect(eight_label,answer_8_1,answer_8_2,answer_8_3,answer_8_4);
                    
                break;

                case "btn-9":
                    var question_nine = value_question_nine.val();
                    var nine_label = label_nine.text();
                    var answer_9_1 = value_answer_9_1.val();
                    var answer_9_2 = value_answer_9_2.val();
                    var answer_9_3 = value_answer_9_3.val();
                    var answer_9_4 = value_answer_9_4.val();

                    showModalAnswerCorrect(nine_label,answer_9_1,answer_9_2,answer_9_3,answer_9_4);
                    
                break;

                case "btn-10":
                    var question_ten = value_question_ten.val();
                    var ten_label = label_ten.text();
                    var answer_10_1 = value_answer_10_1.val();
                    var answer_10_2 = value_answer_10_2.val();
                    var answer_10_3 = value_answer_10_3.val();
                    var answer_10_4 = value_answer_10_4.val();

                    showModalAnswerCorrect(ten_label,answer_10_1,answer_10_2,answer_10_3,answer_10_4);
                    
                break;
               
            }
        });
    }

}