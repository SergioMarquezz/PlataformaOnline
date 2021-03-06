var id = getUrl('value');
var key_module;
var z = 0;
var id_video = $('#input-id-video');
var barra_progreso = $('#barra-progreso');

$(document).ready(function () {
	document.getElementById('select-themes').addEventListener('click', updateDetail);

	information();
	courseModules();
	themes();
	btnSiguienteAnterior();
	showOneVideo();
	btnExamen();
	btnPlayAndPause();
	materiales();
	llenarProgreesBar();
});


function btnPlayAndPause() {
	$(document).on('click', '#btn-play-pause', function () {
		var my_video = document.getElementById('video-start');
		if (my_video.paused) {
			my_video.play();
		} else {
			my_video.pause();
		}
	});
	$(document).on('click', '#btn-full-screen', function () {
		var my_video = document.getElementById('video-start');
		if (my_video.requestFullscreen) {
			my_video.requestFullscreen();
			my_video.controls = false;
		} else {
			my_video.webkitRequestFullscreen();
			my_video.controls = false;
		}
	});
}

function llenarProgreesBar() {
	$.post(
		'../php/start-course.php',
		{
			course_keys: id,
			opition: 'progress bar',
		},
		function (data) {
			$('#barra-progreso').css('width', data + '%');
			$('#barra-progreso').attr('aria-valuenow', data);
			$('#barra-progreso').text(data + '%');
		
			if(data == 100){
				Swal.fire({
					title: 'Avances al 100%',
					text: 'Tu avance en el curso es del 100%, puedes continuar realizando tu examen',
					icon: 'success',
					confirmButtonColor: '#092432',
					confirmButtonText: 'Aceptar',
					allowOutsideClick: false,
				});
				$("#content-courses").hide();
				

			}
		}
	);
}

function btnExamen() {
	var minutes = 0;
	var seconds;
	$(document).on('click', '#btn-evaluation', function () {
		
		console.log(barra_progreso);
		if (barra_progreso.attr('aria-valuenow') == 100) {
			window.location.href = '../views/final-evaluation?course='+id+'';
		} else {
				Swal.fire({
				title: 'Aún no puedes acceder a tu examen',
				text:
					'Para poder realizar el examen del curso es neceario que tu avance este completado al 100%',
				icon: 'info',
				confirmButtonColor: '#092432',
				confirmButtonText: 'Aceptar',
				allowOutsideClick: false,
			});
		}
	});
	//$('#btn-evaluation').click(function (e) {
	//e.preventDefault();

	/*var my_video = document.getElementById('video-start');
		setInterval(function () {
			if (my_video.readyState > 0) {
				minutes = parseInt(my_video.duration / 60, 10);
				seconds = my_video.duration % 60;
			}
		}, 200);

		console.log(my_video.duration.toFixed());

		if (my_video.duration.toFixed() == my_video.currentTime.toFixed()) {
			alert('finish');
		}*/
	//});
}

function showOneVideo() {
	$('#btn-anterior').attr('disabled', true);
	$.post(
		'../php/start-course.php',
		{
			opition: 'show all videos',
			key: id,
		},
		function (datos) {
			var json = JSON.parse(datos);
			console.log(json);
			$('#div-video').append(
				'<video class="embed-responsive embed-responsive-16by9" id=video-start>' +
					'<source id=source-video src=../' +
					json.all_videos[0].url_video +
					' type="video/mp4">' +
					'</video>'
			);
			id_video.val(json.all_videos[0].id_url);
		}
	);
}

function durationUpdate() {
	var my_video = document.getElementById('video-start');
	var duration = my_video.duration.toFixed();

	$.post(
		'../php/start-course.php',
		{
			url_id: id_video.val(),
			duration_video: duration,
			opition: 'video duration',
		},
		function (param) {
			console.log(param);
		}
	);
}

function allVideos() {
	$('#div-video').load(' #div-video', function () {
		llenarProgreesBar();
	});
	$.post(
		'../php/start-course.php',
		{
			opition: 'show all videos',
			key: id,
		},
		function (datos) {
			console.log(datos);
			var json = JSON.parse(datos);

			var size = json.all_videos.length;

			if (z >= size) {
				$('#btn-siguiente').attr('disabled', true);
			}
			$('#div-video').append(
				'<video class="embed-responsive embed-responsive-16by9" id=video-start>' +
					'<source id=source-video src=../' +
					json.all_videos[z].url_video +
					' type="video/mp4">' +
					'</video>'
			);
			id_video.val(json.all_videos[z].id_url);
		}
	);
}

function btnSiguienteAnterior() {
	$('#btn-siguiente').click(function (e) {
		e.preventDefault();
		var my_video = document.getElementById('video-start');
		if (my_video.duration.toFixed() == my_video.currentTime.toFixed()) {
			z++;
			allVideos();
			durationUpdate();
			$('#btn-anterior').attr('disabled', false);
		}
		else if(barra_progreso.attr('aria-valuenow') == 100){
			z++;
			allVideos();
			$('#btn-anterior').attr('disabled', false);
		}
		else{
			Swal.fire({
				title: 'Continua viendo este video',
				text: 'Para ir pasando de video y finalizar el curso debes ver todos los videos completos',
				icon: 'info',
				confirmButtonColor: '#092432',
				confirmButtonText: 'De acuerdo',
				allowOutsideClick: false,
			});
		}
	});
	$('#btn-anterior').click(function (e) {
		e.preventDefault();
		z--;
		allVideos();
		$('#btn-siguiente').attr('disabled', false);
		if (z == 0) {
			$(this).attr('disabled', true);
		}
	});
}

function getUrl(sParam) {
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

function information() {
	var title = getUrl('title');
	var desc = getUrl('descri');

	$('#nav-title').text(title);
	$('#paragraph-video').text(desc);

	console.log(id);
	$.ajax({
		type: 'POST',
		url: '../php/start-course.php',
		data: {
			key_video: id,
			opition: 'information',
		},
		success: function (response) {
			console.log(response);
			var json = JSON.parse(response);

			$('#h4-students').append('Estudiantes: ' + json.lessons.students);
			$('#h4-lessons').append('Clases: ' + json.lessons.total_lessons);
		},
	});
}

function courseModules() {
	$.ajax({
		type: 'POST',
		url: '../php/start-course.php',
		data: {
			opition: 'modules course',
			key_course: id,
		},

		success: function (response) {
			var json = JSON.parse(response);

			var size = json.modules_course.length;

			for (module = 0; module < size; module++) {
				$('#content-courses').append(
					"<div class='col-md-12 col-sm-12'>" +
						"<div class='card'>" +
						"<div class='card-header'>" +
						"<div class='row'>" +
						"<div class='col-md-8 col-sm-12'>" +
						"<h6 class='title-h6'>" +
						json.modules_course[module].name +
						'</h6>' +
						'</div>' +
						"<div class='col-md-4 col-sm-12'>" +
						"<a class='btn btn-sm text-white' id='btn-themes' href=" +
						json.modules_course[module].id_module +
						'>Temas</a>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>'
				);
			}
		},
	});
}

function materiales() {
	$('#material-support').addClass('row');
	//var theme = $('#option-themes option:selected').val();

	$.ajax({
		type: 'POST',
		url: '../php/start-course.php',
		data: {
			opition: 'material course',
			key_course: id,
			//	key_theme: theme,
		},

		success: function (response) {
			var json = JSON.parse(response);

			if (json == 'without material') {
			} else {
				var size = json.materiales.length;

				for (i = 0; i < size; i++) {
					if (json.materiales[i].type_material == 'link') {
						$('#material-support').append(
							"<a disabled id='materiales-buttons' class='btn' href=" +
								json.materiales[i].link +
								" target='_blank'>" +
								json.materiales[i].link +
								'</a>'
						);
					} else {
						$('#material-support').append(
							"<a disabled id='materiales-buttons' class='btn' href=../material/" +
								json.materiales[i].path_material +
								" target='_blank'>" +
								json.materiales[i].name_material +
								'</a>'
						);
					}
				}
			}
		},
	});
}

function themes() {
	$(document).on('click', '#btn-themes', function (e) {
		e.preventDefault();

		var module = $(this).attr('href');
		key_module = module;
		//$('#material-support').empty();

		$.ajax({
			type: 'POST',
			url: '../php/start-course.php',
			data: {
				opition: 'themes course',
				course_id: id,
				id_module: module,
			},
			success: function (response) {
				var json = JSON.parse(response);

				if (json == 'without themes') {
					Swal.fire({
						title: 'No hay temas',
						text: 'En este módulo todavía no hay temas para cursar',
						icon: 'info',
						confirmButtonColor: '#092432',
						confirmButtonText: 'Aceptar',
						allowOutsideClick: false,
					});
				} else {
					$('#modalThemes').modal('show');
					$('#option-themes').empty();
					$('#option-themes').append(
						'<option selected disabled>Elije un tema para cursar</option>'
					);
					var size = json.themes_course.length;

					for (j = 0; j < size; j++) {
						$('#option-themes').append(
							'<option value=' +
								json.themes_course[j].id_themes +
								'>' +
								json.themes_course[j].name +
								'</option>'
						);
					}
				}
			},
		});
	});
}

function updateDetail() {
	var theme = $('#option-themes option:selected').val();
	var person = document.getElementById('value-person').value;
	var modules = key_module;

	var index = document.getElementById('option-themes').selectedIndex;

	if (index == 0) {
		Swal.fire({
			title: 'No has elegido algún tema del módulo',
			text: 'Elije un tema para que avances en el curso y puedas finalizarlo',
			icon: 'warning',
			confirmButtonColor: '#092432',
			confirmButtonText: 'Aceptar',
			allowOutsideClick: false,
		});
	} else {
		$.ajax({
			type: 'POST',
			url: '../php/start-course.php',
			data: {
				key_person: person,
				key_course: id,
				key_module: modules,
				key_themes: theme,
				opition: 'update detail',
			},
			success: function (response) {
				console.log(response);
				if(response == 1){
					llenarProgreesBar();
					$('#modalThemes').modal('hide');
				}
				else if(barra_progreso.attr('aria-valuenow') == 100){
					Swal.fire({
						title: 'Avances al 100%',
						text: 'Tu avance en el curso es del 100%, puedes continuar realizando tu examen',
						icon: 'success',
						confirmButtonColor: '#092432',
						confirmButtonText: 'Aceptar',
						allowOutsideClick: false,
					});
				}
				
				else{
					Swal.fire({
						title: 'El tema ya fue visto',
						text: 'Sigue elegiendo temas y viendo todos los videos del curso para que puedas avanzar y realizar tu examen de evaluación',
						icon: 'info',
						confirmButtonColor: '#092432',
						confirmButtonText: 'Aceptar',
						allowOutsideClick: false,
					});
				}
			},
		});
	}
}
