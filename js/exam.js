var student = $('#full_name_student');
var id_course = valueUrl('idcourse');
var title_course = $('#title-course-exam');
var key_person = $('#value-person');

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

var one_id_hide = $('#1-question-hidden');
var two_id_hide = $('#2-question-hidden');
var three_id_hide = $('#3-question-hidden');
var four_id_hide = $('#4-question-hidden');
var five_id_hide = $('#5-question-hidden');
var six_id_hide = $('#6-question-hidden');
var seven_id_hide = $('#7-question-hidden');
var eigth_id_hide = $('#8-question-hidden');
var nine_id_hide = $('#9-question-hidden');
var ten_id_hide = $('#10-question-hidden');


$(document).ready(function () {
	questionsShow();
	fullNameStuden();
	titleCourses();
	answersShow();
	btnSubmitAnswers();
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

			if (accountant_minutes == 60) {
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
			question_one.val('¿' + json.all_questions[0].question + '?');
			question_two.val('¿' + json.all_questions[1].question + '?');
			question_three.val('¿' + json.all_questions[2].question + '?');
			question_four.val('¿' + json.all_questions[3].question + '?');
			question_five.val('¿' + json.all_questions[4].question + '?');
			question_six.val('¿' + json.all_questions[5].question + '?');
			question_seven.val('¿' + json.all_questions[6].question + '?');
			question_eigth.val('¿' + json.all_questions[7].question + '?');
			question_nine.val('¿' + json.all_questions[8].question + '?');
			question_ten.val('¿' + json.all_questions[9].question + '?');

			one_id_hide.val(json.all_questions[0].id_question);
			two_id_hide.val(json.all_questions[1].id_question);
			three_id_hide.val(json.all_questions[2].id_question);
			four_id_hide.val(json.all_questions[3].id_question);
			five_id_hide.val(json.all_questions[4].id_question);
			six_id_hide.val(json.all_questions[5].id_question);
			seven_id_hide.val(json.all_questions[6].id_question);
			eigth_id_hide.val(json.all_questions[7].id_question);
			nine_id_hide.val(json.all_questions[8].id_question);
			ten_id_hide.val(json.all_questions[9].id_question);
		}
	);
}

function postAnswers(name, input, num) {
	var str;
	var str_name = name.length;
	for (var n = 0; n <= str_name; n++) {
		str = name.substring(1, n - 1);
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
				$('#label-correct-' + num + '-' + (q + 1)).text(json.all_answers_question[q].answer);

				$('#answer-correct-' + num + '-' + (q + 1)).val(json.all_answers_question[q].id_answers);
			}
		}
	);
}

function answersShow() {
	var number_inputs_questions = document.getElementsByClassName('input-questions-course').length;
	var inputs = document.getElementsByClassName('input-1').length;
	setTimeout(function () {
		chronometer();
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
	var name_student = student.text();

	$.post(
		'../php/exam.php',
		{
			student_id: key_person.val(),
			option: 'full name student',
		},
		function (param) {
			student.text(name_student + ' ' + param);
			$("#h4-name-student").text(param);
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
			$("#title-course-result").text(param);
		}
	);
}

function insertDetail(){

	var i = 1;
	var valor_answer, valor_question;

	for (i; i <= 10; i++) {
		valor_question = $('#' + i + '-question-hidden').val();
		valor_answer = $('input:radio[name=name-answer-correct-' + i + ']:checked').val();
		var id_person = key_person.val();

			$.post(
				'../php/exam.php',
				{
					course: id_course,
					person: id_person,
					question: valor_question,
					answer: valor_answer,
					option: 'insert detail',
				},
				function (data) {
				}
			);
		}
}


function showYourAnswer(){

	var answer_correct, your_answer;
	var qualification = 0;

	$.post('../php/exam.php',{
		course_clave: id_course,
		option: 'yours answers exam'
	},function(params){
		var json = JSON.parse(params);
		console.log(json)
		
		var tam = json.your_answers.length;
		for(var j = 1; j <= tam; j++){
			$("#your-answer-"+j).text(json.your_answers[j-1].answer);
			answer_correct = json.your_answers[j-1].correct_answer;
			your_answer = json.your_answers[j-1].answer_student;
			var html = $("#your-answer-"+j).html();
			
			if(answer_correct == your_answer){
				$("#your-answer-"+j).addClass('list-group-item-success');
				$("#your-answer-"+j).html(html + '&nbsp;&nbsp; <span class="badge badge-success"><i class="fa fa-check" aria-hidden="true"></i></span>');
				qualification++;
			}
			else{
				$("#your-answer-"+j).addClass('list-group-item-danger');
				$("#your-answer-"+j).html(html + '&nbsp;&nbsp; <span class="badge badge-danger"><i class="fa fa-times" aria-hidden="true"></i></span>');
			}
		}
		$("#qualification").text(qualification);
	
		if(qualification >= 6){
			$(".alert-information-student, .alert-information-free").addClass('alert');
			$("#felicitaciones").text('Felicitaciones has aprobado el examen del curso');
			$("#text-exam-aprobado").text('El examen lo has aprobado y puedes obtener tu constancia de acreditación la cual estará siempre disponible en tu perfil de la plataforma');
		}
		else{
			$(".alert-information-student, .alert-information-free").addClass('reprobado');
			$("#felicitaciones").text('Lo sentimos, no aprobaste el examen');
			$("#text-exam-aprobado").text('Aprueba el examen para conseguir tu constancia de acreditación y la puedas tener siempre disponible en tu perfil de la plataforma')
		}
	})
	
}

function showResultados(){

	var total_questions = $("#span_total");
	var correct = $("#span_correct");
	var incorrect = $("#span_incorrect");

	$.post('../php/exam.php',{
		course_id: id_course,
		option: 'resultado exam'
	},function(param){
		var json = JSON.parse(param);
		total_questions.text(json.resultados[2].resultado);
		correct.text(json.resultados[0].resultado);
		incorrect.text(json.resultados[1].resultado);

	})
	$.post('../php/exam.php',{
		clave_course: id_course,
		option: 'question answers exam'
	},function(params){
		var json = JSON.parse(params);
		console.log(json)
		
		var tam = json.questions_answers.length;
		for(var i = 1; i <= tam; i++){
			
			$("#list-question-"+i).text(json.questions_answers[i-1].question);
			$("#list-answer-"+i).text(json.questions_answers[i-1].answer);
			
			
		}
	})
	showYourAnswer();
}

function btnSubmitAnswers() {
	$('#submit-answers').click(function (e) {
		e.preventDefault();

		var name_1 = $('input:radio[name=name-answer-correct-1]:checked');
		var name_2 = $('input:radio[name=name-answer-correct-2]:checked');
		var name_3 = $('input:radio[name=name-answer-correct-3]:checked');
		var name_4 = $('input:radio[name=name-answer-correct-4]:checked');
		var name_5 = $('input:radio[name=name-answer-correct-5]:checked');
		var name_6 = $('input:radio[name=name-answer-correct-6]:checked');
		var name_7 = $('input:radio[name=name-answer-correct-7]:checked');
		var name_8 = $('input:radio[name=name-answer-correct-8]:checked');
		var name_9 = $('input:radio[name=name-answer-correct-9]:checked');
		var name_10 = $('input:radio[name=name-answer-correct-10]:checked');

		if(name_1.val() == undefined || name_2.val() == undefined || name_3.val() == undefined || name_4.val() == undefined ||
		   name_5.val() == undefined || name_6.val() == undefined || name_7.val() == undefined || name_8.val() == undefined ||
		   name_9.val() == undefined || name_10.val() == undefined){

				Swal.fire({
					title: 'Faltan preguntas por contestar',
					text: 'Responde todas las preguntas para que tus respuestas se puedan enviar',
					icon: 'warning',
					confirmButtonColor: '#092432',
					confirmButtonText: 'Aceptar',
					allowOutsideClick: false,
				});
		   }else{
			Swal.fire({
				title: 'Las respuestas se guardaran',
				text: 'Tus respuestas de este examen quedaran guardadas ¿Quieres continuar?',
				icon: 'question',
				confirmButtonText: 'Si',
				confirmButtonColor: '#092432',
				cancelButtonColor: '#bb1825',
				cancelButtonText: 'No',
				showCancelButton: true,
				allowOutsideClick: false,
			}).then(result=>{
				if(result.value){
					
					insertDetail();
						Swal.fire({
							title: 'Examen contestado',
							html: 'Has contestado tu examen del curso, si tu calificación es mayor a 6 obtendras tu constancia de acreditacion.<br>'+
							'<strong>NOTA:</strong> En caso de no haber acreditado el examen tendras una segunda y ultima oportunidad',
							icon: 'success',
							confirmButtonText: 'Ver resultados',
							confirmButtonColor: '#092432',
							allowOutsideClick: false,
						}).then(result=>{
							if(result.value){
								$("#modalqualification").modal('show');
								showResultados();
							}
						})
				}
			})
		   }
	});
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
