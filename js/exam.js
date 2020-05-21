var student = $('#full_name_student');
var id_course = valueUrl('idcourse');
var title_course = $('#title-course-exam');

var question_one = $('#one-question');
var question_two = $('#two-question');
var question_three = $('#three-question');
var question_four = $('#four-question');
var question_five = $('#five-question');
var question_six = $('#six-question');
var question_seven = $('#seven-question');
var question_eigth = $('#eigth-question');
var question_nine = $('#nine-question');
var question_ten = $('#ten-question');

$(document).ready(function () {
	chronometer();
	questionsShow();
	fullNameStuden();
	titleCourses();
	answersShow();
});

function chronometer() {
	var accountant_seconds = 0;
	var accountant_minutes = 0;

	var seconds = document.getElementById('seconds');
	var minutes = document.getElementById('minutes');

	var chronometer = setInterval(function () {
		if (accountant_seconds == 60) {
			accountant_seconds = 0;
			accountant_minutes++;
			minutes.innerHTML = accountant_minutes;

			if (accountant_minutes == 2) {
				accountant_minutes = 0;
				clearInterval(chronometer);
				Swal.fire({
					title: 'Tiempo finalizado',
					text: 'Los 60 minutos permitidos en el examen han finalizado',
					icon: 'warning',
					confirmButtonColor: '#092432',
					confirmButtonText: 'Continuar',
					allowOutsideClick: false,
				});
			}
		}
		seconds.innerHTML = accountant_seconds;
		accountant_seconds++;
	}, 1000);
}

function questionsShow() {
	$.post(
		'../php/exam.php',
		{
			key_course: id_course,
			option: 'questions show',
		},
		function (param) {
			var json = JSON.parse(param);
			console.log(json);
			question_one.val("¿"+json.all_questions[0].question+"?");
			question_two.val("¿"+json.all_questions[1].question+"?");
			question_three.val("¿"+json.all_questions[2].question+"?");
			question_four.val("¿"+json.all_questions[3].question+"?");
			question_five.val("¿"+json.all_questions[4].question+"?");
			question_six.val("¿"+json.all_questions[5].question+"?");
			question_seven.val("¿"+json.all_questions[6].question+"?");
			question_eigth.val("¿"+json.all_questions[7].question+"?");
			question_nine.val("¿"+json.all_questions[8].question+"?");
			question_ten.val("¿"+json.all_questions[9].question+"?");
		}
	);
}

function postAnswers(name, input, num) {
	var str;
	var str_name = name.length;
	for(var n = 0; n <= str_name; n++){

		str = name.substring(1, n-1)  
	}
	$.post(
		'../php/exam.php',
		{
			option: 'show answers',
			course_key: id_course,
			name_question: str,
		},
		function (params) {
			var json = JSON.parse(params);

			for (var q = 0; q <= input; q++) {
				//  console.log($('#label-correct-'+num+'-'+(q+1)).attr('for'));
				//console.log(json.all_answers_question[q].answer);
				$('#label-correct-' + num + '-' + (q + 1)).text(json.all_answers_question[q].answer);
			}
		}
	);
}

function answersShow() {
	var number_inputs_questions = document.getElementsByClassName('input-questions-course').length;
	var inputs = document.getElementsByClassName('input-1').length;
	setTimeout(function () {
		for (var c = 1; c <= number_inputs_questions; c++) {
			switch (c) {
				case 1:
					postAnswers(question_one.val(), inputs, 1);
					break;
				case 2:
					postAnswers(question_two.val(), inputs, 2);
					break;
				case 3:
					postAnswers(question_three.val(), inputs, 3);
					break;
				case 4:
					postAnswers(question_four.val(), inputs, 4);
					break;
				case 5:
					postAnswers(question_five.val(), inputs, 5);
					break;
				case 6:
					postAnswers(question_six.val(), inputs, 6);
					break;
				case 7:
					postAnswers(question_seven.val(), inputs, 7);
					break;
				case 8:
					postAnswers(question_eigth.val(), inputs, 8);
					break;
				case 9:
					postAnswers(question_nine.val(), inputs, 9);
					break;
				case 10:
					postAnswers(question_ten.val(), inputs, 10);
					break;
			}
		}
	}, 3000);
}

function fullNameStuden() {
	var key_person = $('#value-person').val();
	var name_student = student.text();

	$.post(
		'../php/exam.php',
		{
			student_id: key_person,
			option: 'full name student',
		},
		function (param) {
			student.text(name_student + ' ' + param);
		}
	);
}

function titleCourses() {
	var title = title_course.text();

	$.post(
		'../php/exam.php',
		{
			id_course: id_course,
			option: 'title course',
		},
		function (param) {
			title_course.text(title + ' ' + param);
		}
	);
}

function valueUrl(sParam) {
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
