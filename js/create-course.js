var title = $('#course-title');
lessons = $('#course-lessons');
hours = $('#course-hours');
date_start = $('#course-start');
date_end = $('#course-end');
description = $('#text-description');
category = $('#category-instructor');
var value_course = document.getElementById('select-courses-existentes');
var id = 0;
var clave = 1;
var value_module;
var value_theme;
var text_boton;
var value_file;

$(document).ready(function () {
	document.getElementById('category-instructor').addEventListener('change', otherCategory);
	document.getElementById('btn-save-course').addEventListener('click', saveCourse);
	document.getElementById('button-add-course').addEventListener('click', function () {
		$('#modalCreateCourse').modal('hide');
	});

	document.getElementById('select-courses-existentes').addEventListener('change', closeModal);

	datePicker();
	validateLettersNumbers();
	selectCategory();
	coursesSelect();
	themesInformation();
	materialTheme();
	addModules();
	addNewTheme();
	addNewModule();
	obtenerArchivos();
	butonMaterial();
	selectThemes();
	deleteModule();
	updateModule();
	saveUpdateModule();
	disableUpdateInputs();
	disabledUpdateNewTheme();
	selectOptions();
	finishModules();
	$('#row-modules').slideUp();
	$('#modalCreateCourse').modal('show');
	$('#btn-finish-program').attr('disabled', true);
	$('#btn-finish-program').hide();
});

function coursesSelect() {
	$.ajax({
		type: 'POST',
		url: '../php/create-course.php',
		data: {
			identy: 'show courses',
		},
		success: function (response) {
			if (response != 'sin titulo curso') {
				var json = JSON.parse(response);

				var size = json.courses_exis.length;

				for (i = 0; i < size; i++) {
					$('#select-courses-existentes').append(
						'<option value=' +
							json.courses_exis[i].id_course +
							'>' +
							json.courses_exis[i].title +
							'</option>'
					);
				}
			}
		},
	});
}

function closeModal() {
	var value = value_course.value;

	$('#modalCreateCourse').modal('hide');

	$.ajax({
		type: 'POST',
		url: '../php/create-course.php',
		data: {
			identy: 'information course',
			id_course: value,
		},

		success: function (response) {
			var json = JSON.parse(response);
			title.val(json.informtion_course.title);
			lessons.val(json.informtion_course.lessons);
			hours.val(json.informtion_course.hours);
			date_start.val(json.informtion_course.start);
			date_end.val(json.informtion_course.end);
			description.val(json.informtion_course.description);

			$('#category-instructor option').each(function () {
				if ($(this).text() == json.informtion_course.category) {
					$(this).prop('selected', true);
				}
			});
		},
	});

	title.attr('disabled', true);
	lessons.attr('disabled', true);
	hours.attr('disabled', true);
	date_start.attr('disabled', true);
	date_end.attr('disabled', true);
	description.attr('disabled', true);
	category.attr('disabled', true);

	modulesInformation();
}

function modulesInformation() {
	var id_corsue = value_course.value;
	$('#row-modules').slideDown();
	$('#btn-save-course').hide();

	$.ajax({
		type: 'POST',
		url: '../php/create-course.php',
		data: {
			identy: 'information modules',
			id: id_corsue,
		},

		success: function (response) {
			if (response != 'sin modulos') {
				var json = JSON.parse(response);
				var size = json.modules_course.length;

				for (j = 0; j < size; j++) {
					id++;
					var string = json.modules_course[j].name;
					var module_id = json.modules_course[j].id_module;
					var leer_espacios_blancos = string.trim();

					contentCourseModules(leer_espacios_blancos, id, module_id);
				}
			} else {
				swalSimple('sin modulos');
			}
		},
	});
}

function themesInformation() {
	$(document).on('click', '#nav-themes-tabs', function () {
		var text = $(this).text();
		var text_sub = text.substr(21);

		var value = value_course.value;

		$('#modalThemesCourse').modal('show');

		$('#h5-modal-themes').text('Temas del módulo: ' + text_sub);

		$.post(
			'../php/create-course.php',
			{
				name_theme: text_sub,
				id_course: value,
				identy: 'information themes',
			},
			function (param) {
				json = JSON.parse(param);

				if (json.msj == 'sin temas') {
					$('#sin-temas').append('<h3>No hay temas para este modulo</h3>');
				} else {
					var size = json.information_themes.length;

					for (j = 0; j < size; j++) {
						$('#ol-themes').append(
							'<li id="list-themes"><a>' + json.information_themes[j].name + '</a></li>'
						);
					}
				}
			}
		);

		$('#ol-themes').empty();
		$('#sin-temas').empty();
	});
}

function videoTheme() {
	$('#button-video').click(function (e) {
		e.preventDefault();

		var texto = $('#h5-modal-material').text();
		var text_substr = texto.substr(32);

		$('#modalVideo').modal('show');

		$('#h5-modal-video').text('Video del tema: ' + text_substr);

		$.post(
			'../php/create-course.php',
			{
				theme_name: text_substr,
				identy: 'information video',
			},
			function (param) {
				console.log(param);
				if (param != '') {
					$('#video-modal').append('<source src=../' + param + " type='video/mp4'>");
				} else {
					$('#div-modal-video').append('<h3>No hay un video para este tema</h3>');
				}
			}
		);

		$('#div-modal-video').load(' #div-modal-video');
	});

	$('#btn-close').click(function (e) {
		e.preventDefault();

		var video = document.getElementById('video-modal');
		video.pause();
	});
}

function materialTheme() {
	$(document).on('click', '#list-themes', function () {
		$('#modalMaterialThemes').modal('show');
		var text = $(this).text();

		$('#h5-modal-material').text('Material de apoyo para el tema: ' + text);

		$.post(
			'../php/create-course.php',
			{
				identy: 'information material',
				name_theme: text,
			},
			function (param) {
				var json = JSON.parse(param);

				if (json.msj == 'sin material') {
					$('#sin-material').append('<h3>No hay material de apoyo para este tema</h3>');
				} else {
					var size = json.information_material.length;

					for (i = 0; i < size; i++) {
						if (json.information_material[i].link != '') {
							$('#ol-material').append(
								'<li><a  href=' +
									json.information_material[i].link +
									' target="_blank">' +
									json.information_material[i].link +
									'</a></li>'
							);
						} else {
							$('#ol-material').append(
								'<li><a href=../material/' +
									json.information_material[i].path_material +
									' target="_blank">' +
									json.information_material[i].name_material +
									'</a></li>'
							);
						}
					}
				}
			}
		);
		$('#ol-material').empty();
		$('#sin-material').empty();
	});

	videoTheme();
}

function datePicker() {
	$('#course-start, #course-end').datepicker({
		language: 'es',
		autoClose: true,
		minDate: new Date(),
	});
}

function validateLettersNumbers() {
	//Solo letras
	$('#course-title').keypress(function (e) {
		if (
			(event.charCode >= 65 && event.charCode <= 90) ||
			(event.charCode >= 97 && event.charCode <= 122) ||
			event.charCode == 32 ||
			(event.charCode >= 192 && event.charCode <= 255)
		) {
			return true;
		}
		return false;
	});

	//Solo numeros
	$('#course-lessons, #course-hours').keypress(function (e) {
		if (event.charCode >= 48 && event.charCode <= 57) {
			return true;
		}
		return false;
	});
}

//Funcion para mostarar las categorias
function selectCategory() {
	$.ajax({
		type: 'POST',
		url: '../php/create-course.php',
		data: {
			identy: 'categorias instructor',
		},
		success: function (response) {
			if (response != 'no hay categorias') {
				var json = JSON.parse(response);

				var size = json.category.length;

				for (j = 0; j < size; j++) {
					$('#category-instructor').append(
						'<option value=' +
							json.category[j].id_category +
							'>' +
							json.category[j].name +
							'</option>'
					);
				}
			}
			$('#category-instructor').append('<option value="otra">Otra categoría</option>');
		},
	});
}

function categoryNew(category_new) {
	$.ajax({
		type: 'POST',
		url: '../php/create-course.php',
		data: {
			new_category: category_new,
			identy: 'new category',
		},
		success: function (response) {
			var json = JSON.parse(response);

			if (json.data.message == 'category save') {
				$('#category-instructor').append(
					'<option value=' + json.data.lastes_id + ' selected>' + category_new + '</option>'
				);
				$('#category-instructor').attr('disabled', true);
			}
		},
	});
}

function saveCourse() {
	executeInsert('no');
	$('#ad-module').attr('disabled', true);
}

function saveModule(name, courses, categoria) {
	$.post(
		'../php/create-course-poo.php',
		{
			module: name,
			course: courses,
			detect: 'save modules',
		},
		function (params) {
			if (params == 'guardado') {
				$('#btn-new-theme').attr('disabled', true);

				$(
					"#col-modules [role='alert'],input[id=btn-new-theme" +
						id +
						'], input[id=' +
						id +
						'], input[id=input-name-theme' +
						id +
						'], button[id=btn-modules-course' +
						id +
						']'
				).each(function () {
					$(this).attr('disabled', true);
				});

				$("#col-modules [role='alert'] button[id= btn-add-material" + id + ']').each(function () {
					$(this).attr('disabled', false);
				});

				themesSave(categoria, courses);

				swalSimple('modulo');
			}
		}
	);
}

function themesSave(catego, key_courses) {
	$("#col-modules [role='alert'] input[id=input-name-theme" + id + ']').each(function () {
		var themes = $(this).val();

		$.post(
			'../php/create-course-poo.php',
			{
				theme: themes,
				id_course: key_courses,
				detect: 'save themes',
				modificador: 'theme normal',
				id_category: catego,
			},
			function (params) {}
		);
	});
}

function selectThemes() {
	$(document).on('change', '.custom-select', function () {
		$(
			"#col-modules [role='alert'] div[id=div-files" +
				id +
				'] input[id=input-files' +
				id +
				'], input[id=input-links' +
				id +
				'] '
		).each(function () {
			$(this).attr('disabled', false);
		});
	});
}

function saveOnlyLink() {
	var id_theme;
	var link;

	$(
		"#col-modules [role='alert'] div[id=div-material" +
			id +
			'] select[id=themes-select' +
			id +
			'] option:selected'
	).each(function () {
		id_theme = $(this).val();
	});

	$("#col-modules [role='alert'] div[id=div-links" + id + '] input[id=input-links' + id + ']').each(
		function () {
			link = $(this).val();
		}
	);

	var id_value = value_course.value;

	$.post(
		'../php/create-course-poo.php',
		{
			detect: 'only link',
			links: link,
			key_theme: id_theme,
			key_course: id_value,
		},
		function (datos) {
			if (datos == 'insertado link') {
				Swal.fire({
					title: 'Link guardado correctamente',
					text: '¿Deseas agregar más archivos/links a este tema u otros temas?',
					icon: 'success',
					showCancelButton: true,
					cancelButtonColor: '#bb1825',
					confirmButtonColor: '#092432',
					confirmButtonText: '¡Si Agregar!',
					cancelButtonText: 'No Agregar',
					allowOutsideClick: false,
				}).then((result) => {
					if (result.value) {
						$("#col-modules [role='alert']  input[id=input-links" + id + ']').each(function () {
							$(this).val('');
						});
					} else {
						swalSimple('otro modulo');
						$('#ad-module').attr('disabled', false);

						$(
							"#col-modules [role='alert'] button[id= btn-add-material" +
								id +
								'], .boton-file, input[id=input-links' +
								id +
								'], select[id=themes-select' +
								id +
								']'
						).each(function () {
							$(this).attr('disabled', true);
						});
					}
				});
			}
		}
	);
}

function butonMaterial() {
	$(document).on('click', '.material-add', function () {
		var text_boton = $(this).text();

		if (
			text_boton == 'Subir material o video' &&
			$('.file' + id + '').is(':visible') &&
			$('.liks' + id + '').val() == ''
		) {
			swalSimple('subir material');
		} else if (
			text_boton == 'Subir material o video' &&
			$('.liks' + id + '').val() != '' &&
			$('.file' + id + '').is(':visible')
		) {
			swalSimple('link only');
		} else if (
			(text_boton == 'Subir material o video' && !$('.file' + id + '').is(':visible')) ||
			(!$('.file' + id + '').is(':visible') &&
				$('.liks' + id + '').val() != '' &&
				text_boton == 'Subir material o video')
		) {
			uploadFilesVideos();
		} else {
			$("#col-modules [role='alert'] div[id=div-material" + id + ']').each(function () {
				$(this).append(
					'<select class="browser-default custom-select" id="themes-select' +
						id +
						'">' +
						'<option disabled selected>Seleccionar tema</option>' +
						'</select>'
				);
			});
			$("#col-modules [role='alert'] div[id=div-files" + id + ']').each(function () {
				$(this).append(
					'<input disabled type="file" class="custom-file-input boton-file file' +
						id +
						'" id="input-files' +
						id +
						'" lang="es">' +
						'<label class="custom-file-label file' +
						id +
						'">Subir archivo</label>' +
						'<label class="file' +
						id +
						'"><strong>Nota:</strong> Un video debe de pesar menos de 100 MB.</label>'
				);
			});
			$("#col-modules [role='alert'] div[id=div-links" + id + ']').each(function () {
				$(this).append(
					'<input disabled id=input-links' +
						id +
						' type="text" class="form-control liks' +
						id +
						'" placeholder="Link en internet">'
				);
			});

			$.post(
				'../php/create-course-poo.php',
				{
					detect: 'show themes',
				},
				function (data) {
					var json = JSON.parse(data);

					var tamanio = json.id_themes.length;

					for (var i = 0; i < tamanio; i++) {
						$(
							"#col-modules [role='alert'] div[id=div-material" +
								id +
								'] select[id=themes-select' +
								id +
								']'
						).each(function () {
							$(this).append(
								'<option value=' +
									json.id_themes[i].id_themes +
									'>' +
									json.id_themes[i].name +
									'</option>'
							);
						});
					}
				}
			);
		}
		$(this).text('Subir material o video');
	});
}

function materialSave(id_course) {
	var value_file;
	var them_id;
	var link;

	$("#col-modules [role='alert'] div[id=div-files" + id + '] input[id=input-files' + id + ']').each(
		function () {
			value_file = this.files[0];
		}
	);

	$(
		"#col-modules [role='alert'] div[id=div-material" +
			id +
			'] select[id=themes-select' +
			id +
			'] option:selected'
	).each(function () {
		them_id = $(this).val();
	});

	$("#col-modules [role='alert'] div[id=div-links" + id + '] input[id=input-links' + id + ']').each(
		function () {
			link = $(this).val();
		}
	);

	var dataForm = new FormData();

	dataForm.append('files_material', value_file);
	dataForm.append('detect', 'material insert');
	dataForm.append('key_course', id_course);
	dataForm.append('key_theme', them_id);

	if (link != undefined) {
		dataForm.append('links', link);
	}

	$.ajax({
		type: 'POST',
		url: '../php/create-course-poo.php',
		data: dataForm,
		contentType: false,
		processData: false,
		cache: false,
		success: function (response) {
			console.log(response);
		},
	});
}

function executeInsert(decision_insert) {
	var titulo = title.val(),
		lesons = lessons.val(),
		horas = hours.val(),
		start = date_start.val(),
		end = date_end.val(),
		catego = category.val(),
		descri = description.val();

	$.post(
		'../php/create-course-poo.php',
		{
			title: titulo,
			les: lesons,
			hour: horas,
			start_date: start,
			end_date: end,
			descrip: descri,
			categories: catego,
			decidir: decision_insert,
			detect: 'save course',
		},
		function (param) {
			if (param != 'curso insert') {
				messageInsert(param);
			} else {
				swalSimple('curso');
			}
		}
	);
}

function keypressModule() {
	$("#col-modules [role='alert'] input[id=" + id + ']').each(function () {
		var name_module = $(this).val();
		$('#' + id).text('Módulo ' + id + ': ' + name_module);
	});
}

function addNewModule() {
	$('#ad-module').click(function (e) {
		e.preventDefault();
		id++;
		clave = 1;
		contentCourse(id);
		$(this).attr('disabled', true);
		$('#btn-finish-program').attr('disabled', true);
		$('#btn-finish-program').show();
	});
}

function finishModules() {
	$('#btn-finish-program').click(function (e) {
		e.preventDefault();
		window.location.href = '../views/all-courses';
	});
}

function addNewTheme() {
	$(document).on('click', '.buton-new-theme', function () {
		var boolean = false;

		$("#col-modules [role='alert'] input[id=input-name-theme" + id + ']').each(function () {
			value_theme = $(this).val();
		});

		$("#col-modules [role='alert'] input[id=" + id + ']').each(function () {
			value_module = $(this).val();
		});

		$("#col-modules [role='alert'] .input-file" + clave + '').each(function () {
			value_file = this.files[0];
		});

		$("#col-modules [role='alert']  button[id=button-files" + id + ']').each(function () {
			text_boton = $(this).text();
		});

		if (value_module == '' || value_theme == '') {
			swalSimple('escribir tema');
		} else {
			boolean = true;
		}

		if (boolean) {
			addButtonTheme();
		}
	});
}

function addButtonTheme() {
	clave++;

	$("#col-modules [role='alert'] div[id=div-themes" + id + ']').each(function () {
		$(this).append(
			'<input id=input-name-theme' +
				id +
				' type="text" class="form-control mt-4 class' +
				clave +
				'" placeholder="Escribe el nombre del tema">'
		);
	});
}

function uploadFilesVideos() {
	var value_file;

	$("#col-modules [role='alert'] div[id=div-files" + id + '] input[id=input-files' + id + ']').each(
		function () {
			value_file = this.files[0];
		}
	);

	Swal.fire({
		title: 'Archivo listo para subirse',
		text: 'El archivo ' + value_file.name + ' se guardará en la plataforma',
		icon: 'info',
		showCancelButton: true,
		cancelButtonColor: '#bb1825',
		confirmButtonColor: '#092432',
		confirmButtonText: '¡Si Guardar!',
		cancelButtonText: 'No Guardar',
		allowOutsideClick: false,
	}).then((result) => {
		if (result.value) {
			var dataForm = new FormData();
			console.log(value_file);

			dataForm.append('files_material', value_file);
			dataForm.append('detect', 'material save');

			$.ajax({
				type: 'POST',
				url: '../php/create-course-poo.php',
				data: dataForm,
				contentType: false,
				processData: false,
				cache: false,
				success: function (response) {
					console.log(response);
					if (response == 'archivo almacenado') {
						var id_value = value_course.value;

						if (id_value == '') {
							$.post(
								'../php/create-course-poo.php',
								{
									detect: 'course vacio',
								},
								function (data) {
									materialSave(data);
								}
							);
						} else {
							materialSave(id_value);
						}

						Swal.fire({
							title: 'El archivo fue guardado correctamente',
							text: '¿Deseas agregar más archivos a este tema u otros temas?',
							icon: 'success',
							showCancelButton: true,
							cancelButtonColor: '#bb1825',
							confirmButtonColor: '#092432',
							confirmButtonText: '¡Si Agregar!',
							cancelButtonText: 'No Agregar',
							allowOutsideClick: false,
						}).then((result) => {
							if (result.value) {
								$("#col-modules [role='alert'] div[id=div-files" + id + '] .file' + id + '').each(
									function () {
										$(this).show();
									}
								);

								$(
									"#col-modules [role='alert'] div[id=div-files" +
										id +
										'] input[id=input-file-name' +
										clave +
										']'
								).each(function () {
									$(this).remove();
								});

								$("#col-modules [role='alert']  input[id=input-links" + id + ']').each(function () {
									$(this).val('');
								});
							} else {
								Swal.fire({
									title: 'Elegir otro tema',
									text: '¿Quieres seleccionar otro tema para la subida de archivos y/o videos?',
									icon: 'info',
									showCancelButton: true,
									cancelButtonColor: '#bb1825',
									confirmButtonColor: '#092432',
									confirmButtonText: 'Si',
									cancelButtonText: 'No',
									allowOutsideClick: false,
								}).then((result) => {
									if (result.value) {
										$(
											"#col-modules [role='alert'] div[id=div-files" + id + '] .file' + id + ''
										).each(function () {
											$(this).show();
										});

										$(
											"#col-modules [role='alert'] div[id=div-files" +
												id +
												'] input[id=input-file-name' +
												clave +
												']'
										).each(function () {
											$(this).remove();
										});
										$("#col-modules [role='alert']  input[id=input-links" + id + ']').each(
											function () {
												$(this).val('');
											}
										);
									} else {
										swalSimple('otro modulo');
										$('#ad-module').attr('disabled', false);

										$(
											"#col-modules [role='alert'] button[id= btn-add-material" +
												id +
												'], input[id=input-file-name' +
												clave +
												'], input[id=input-links' +
												id +
												'], select[id=themes-select' +
												id +
												']'
										).each(function () {
											$(this).attr('disabled', true);
										});
									}
								});
							}
						});
					}
				},
			});
		} else {
			$("#col-modules [role='alert'] div[id=div-files" + id + '] .file' + id + '').each(
				function () {
					$(this).show();
				}
			);

			$(
				"#col-modules [role='alert'] div[id=div-files" +
					id +
					'] input[id=input-file-name' +
					clave +
					']'
			).each(function () {
				$(this).remove();
			});
		}
	});
}

function obtenerArchivos() {
	var name_file;

	$(document).on('change', '.boton-file', function () {
		name_file = this.files[0].name;

		$("#col-modules [role='alert'] div[id=div-files" + id + '] .file' + id + '').each(function () {
			$(this).hide();
		});

		for (var i = 0; i < name_file.length; i++) {
			if (name_file.charAt(i) == ' ') {
				name_file = name_file.replace(' ', '-');
			}
		}

		$("#col-modules [role='alert'] div[id=div-files" + id + ']').each(function () {
			$(this).append(
				'<input type="text" class="form-control" id="input-file-name' +
					clave +
					'" value=' +
					name_file +
					'>'
			);
		});
	});
}

function addModules() {
	$(document).on('click', '.save-module', function () {
		var course_value = value_course.value;
		var catego = category.val();

		$("#col-modules [role='alert'] input[id=" + id + ']').each(function () {
			value_module = $(this).val();

			$("#col-modules [role='alert'] input[id=input-name-theme" + id + ']').each(function () {
				value_theme = $(this).val();
			});
		});

		if (course_value == '') {
			$.post(
				'../php/create-course-poo.php',
				{
					detect: 'course vacio',
				},
				function (data) {
					messageButtonSaveModule(value_module, value_theme, data, catego);
				}
			);
		} else {
			messageButtonSaveModule(value_module, value_theme, course_value, catego);
		}
	});
}

function contentCourse(key) {
	$('#col-modules').append(
		"<div class='alert alerta" +
			key +
			"' role='alert'>" +
			'<h4 id=' +
			key +
			'>Módulo ' +
			key +
			':</h4>' +
			"<div class='container'>" +
			"<div class='form-group'>" +
			'<input onkeyup=keypressModule() id=' +
			key +
			" type='text' class='form-control' placeholder='Escribe el nombre del modulo'>" +
			'</div>' +
			"<div class='row'>" +
			"<div class='col-md-12 col-sm-12 mt-3'>" +
			"<div class='form-group' id=div-themes" +
			key +
			'>' +
			'<input id=input-name-theme' +
			key +
			" type='text' class='form-control class" +
			clave +
			"' placeholder='Escribe el nombre del tema'>" +
			'</div>' +
			'</div>' +
			"<div class='col-md-4 col-sm-12'>" +
			"<div class='form-group' id=div-material" +
			key +
			'>' +
			'</div>' +
			'</div>' +
			"<div class='col-md-4 col-sm-12'>" +
			"<div class='custom-file' id=div-files" +
			key +
			'>' +
			'</div>' +
			'</div>' +
			"<div class='col-md-4 col-sm-12'>" +
			"<div class='from-group' id=div-links" +
			key +
			'>' +
			'</div>' +
			'</div>' +
			'</div>' +
			"<div class='row justify-content-center mt-3'>" +
			"<div class='col-md-12 col-sm-12'>" +
			'</div>' +
			'</div>' +
			'</div>' +
			"<div class='row'>" +
			"<div class='col-md-4 col-sm-12'>" +
			"<button class='btn text-white save-module' id=btn-modules-course" +
			key +
			'>Publicar módulo</button>' +
			'</div>' +
			"<div class='col-md-4 col-sm-12'>" +
			"<button disabled class='btn text-white material-add' id=btn-add-material" +
			key +
			'>Agregar material o video</button>' +
			'</div>' +
			"<div class='col-md-4 col-sm-12'>" +
			'<input id=btn-new-theme' +
			key +
			" class='mt-3 buton-new-theme' title='Agregar nuevo tema al módulo' type='image' src='../img/icons/new-theme.png' width='48' height='48'>" +
			'</div>' +
			'</div>' +
			'</div>'
	);
}

function contentCourseModules(module, key, id_modules) {
	var nav = 'navbar';

	$('#col-modules').append(
		'<div class="alert alerta' +
			key +
			'" role="alert">' +
			'<h4>Módulo ' +
			key +
			': ' +
			module +
			'</h4>' +
			'<div class="container">' +
			'<nav class="mt-5">' +
			'<div class="nav nav-tabs" id="nav-tab" role="tablist">' +
			'<a class="nav-item nav-link active text-danger" id="nav-themes-tabs" data-toggle="tab" href=#' +
			nav +
			key +
			' role="tab" aria-controls="nav-home" aria-selected="true">Ver temas del módulo ' +
			module +
			'</a>' +
			'</div>' +
			'</nav>' +
			'<div class="row">' +
			'<div class="col-md-3 col-sm-12">' +
			'</div>' +
			'<div class="col-md-3 col-sm-12">' +
			'</div>' +
			'<div class="col-md-3 col-sm-12">' +
			'<a href=' +
			id_modules +
			' class="btn text-white btn-update">Actualizar módulo</a>' +
			'</div>' +
			'<div class="col-md-3 col-sm-12">' +
			'   <a href=' +
			id_modules +
			' class="btn text-white btn-danger btn-delete">Eliminar módulo</a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
	);
}

function updateModule() {
	$(document).on('click', '.btn-update', function (e) {
		e.preventDefault();

		$('#value-id-module').val($(this).attr('href'));

		$.post(
			'../php/create-course-poo.php',
			{
				detect: 'update module',
				key: $(this).attr('href'),
			},
			function (data) {
				$('#update_name').val(data);
			}
		);

		comboUpdateThemes($(this).attr('href'));
		$('#modalUpdate').modal('show');
		$('#update-themes').append('<option value="0" selected disabled>Seleccionar tema</option>');
	});
}

function comboUpdateThemes(key_modules) {
	$('#update-themes').empty();
	$.post(
		'../php/create-course.php',
		{
			identy: 'show modules themes',
			id_module: key_modules,
		},
		function (response) {
			var json = JSON.parse(response);

			var tamanio = json.themes_module.length;

			for (var i = 0; i < tamanio; i++) {
				$('#update-themes').append(
					'<option value=' +
						json.themes_module[i].id_themes +
						'>' +
						json.themes_module[i].name +
						'</option>'
				);
			}
		}
	);
}

function selectOptions() {
	$('#select-options').change(function (e) {
		e.preventDefault();
		var value_select = $('#select-options').val();

		switch (value_select) {
			case '1':
				$('#update_name').attr('disabled', false);
				$('#btn-update-actualizacion').attr('disabled', false);
				$('#update-themes').attr('disabled', true);
				$('#customFileLang').attr('disabled', true);
				$('#input-new-theme-update').attr('disabled', true);
				$('#btn-update-new-theme').attr('disabled', true);
				$('#btn-delete-theme').attr('disabled', true);
				$('#input-new-theme').attr('disabled', true);
				break;

			case '2':
				$('#btn-update-actualizacion').attr('disabled', true);
				$('#update-themes').attr('disabled', false);
				$('#update_name').attr('disabled', true);
				$('#customFileLang').attr('disabled', true);
				$('#input-new-theme-update').attr('disabled', true);
				$('#btn-update-new-theme').attr('disabled', true);
				$('#btn-delete-theme').attr('disabled', true);
				break;

			case '3':
				$('#input-new-theme-update').attr('disabled', false);
				$('#btn-update-new-theme').attr('disabled', false);
				$('#btn-delete-theme').attr('disabled', true);
				$('#btn-update-actualizacion').attr('disabled', true);
				$('#update-themes').attr('disabled', true);
				$('#update_name').attr('disabled', true);
				$('#customFileLang').attr('disabled', true);
				$('#input-new-theme').attr('disabled', true);
				break;

			case '4':
				$('#update-themes').attr('disabled', false);
				$('#btn-delete-theme').attr('disabled', false);
				$('#input-new-theme-update').attr('disabled', true);
				$('#btn-update-new-theme').attr('disabled', true);
				$('#btn-update-actualizacion').attr('disabled', true);
				$('#customFileLang').attr('disabled', true);
				$('#input-new-theme').attr('disabled', true);
				$('#update_name').attr('disabled', true);
				break;

			case '5':
				$('#update-themes').attr('disabled', false);
				$('#customFileLang').attr('disabled', false);
				$('#btn-update-actualizacion').attr('disabled', true);
				$('#update_name').attr('disabled', true);
				$('#input-new-theme').attr('disabled', true);
				$('#btn-update-new-theme').attr('disabled', true);
				$('#input-new-theme-update').attr('disabled', true);
				$('#btn-delete-theme').attr('disabled', true);
				break;
		}
	});
}

function saveUpdateModule() {
	$('#btn-update-actualizacion').click(function (e) {
		e.preventDefault();

		var name_new_theme = $('#input-new-theme').val();
		var title, msj, options, icon, btn_cancel, text_btn;

		if (!$('#update_name').is(':disabled')) {
			title = 'Actualizar nombre del módulo';
			msj = '¿Quieres cambiar el nombre del módulo?';
			icon = 'question';
			btn_cancel = true;
			text_btn = 'Si';
			options = 'name module';
		} else if (!$('#update-themes').is(':disabled') && !$('#input-new-theme').is(':disabled')) {
			title = 'Actualizar nombre del tema';
			msj = 'El nuevo tema del módulo es ' + name_new_theme + ' ¿estas seguro/a de cambiarlo?';
			icon = 'question';
			btn_cancel = true;
			text_btn = 'Si';
			options = 'name theme';
		} else {
			if ($('#update-themes option:selected').text() != 'Seleccionar tema') {
				title = 'Subir el contenido';
				msj =
					'El material de apoyo para el tema ' +
					$('#update-themes option:selected').text() +
					' será guardado en la plataforma' +
					' ¿estas seguro/a?';
				icon = 'question';
				btn_cancel = true;
				text_btn = 'Si';
				options = 'upload material';
			} else {
				title = 'Seleccionar tema';
				msj = 'Elija el tema en el cuál quiere agregar el material';
				icon = 'warning';
				btn_cancel = false;
				text_btn = 'Aceptar';
			}
		}

		Swal.fire({
			title: title,
			text: msj,
			icon: icon,
			showCancelButton: btn_cancel,
			cancelButtonColor: '#bb1825',
			confirmButtonColor: '#092432',
			confirmButtonText: text_btn,
			cancelButtonText: 'No',
			allowOutsideClick: false,
		}).then((result) => {
			if (result.value) {
				if (btn_cancel) {
					optionsUpdate(options);
				}
			}
		});
	});
	$('#btn-update-new-theme').click(function (e) {
		e.preventDefault();

		if ($('#input-new-theme-update').val() == '') {
			swalSimple('empty new theme');
		} else {
			Swal.fire({
				title: 'Se agregara un nuevo tema',
				text:
					'El tema ' +
					$('#input-new-theme-update').val() +
					' se guardara para este módulo ¿Quieres continuar?',
				icon: 'question',
				showCancelButton: true,
				cancelButtonColor: '#bb1825',
				confirmButtonColor: '#092432',
				confirmButtonText: 'Continuar',
				cancelButtonText: 'Cancelar',
				allowOutsideClick: false,
			}).then((result) => {
				if (result.value) {
					optionsUpdate('add theme new');
				}
			});
		}
	});
	btnDeleteTheme();
}

function btnDeleteTheme() {
	$('#btn-delete-theme').click(function (e) {
		e.preventDefault();

		var text_select = $('#update-themes option:selected').text();

		if (text_select == 'Seleccionar tema') {
			swalSimple('theme witout select');
		} else {
			Swal.fire({
				title: 'Eliminación de un tema',
				text:
					'El tema ' +
					text_select +
					' será eliminado, al igual que el material y video correspondiente, ¿Quieres eliminarlo?',
				icon: 'question',
				showCancelButton: true,
				cancelButtonColor: '#bb1825',
				confirmButtonColor: '#092432',
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
				allowOutsideClick: false,
			}).then((result) => {
				if (result.value) {
					optionsUpdate('delete theme one');
					$('#update-themes').attr('disabled', true);
					$(this).attr('disabled', true);
				}
			});
		}
	});
}

function optionsUpdate(option) {
	var module_name = $('#update_name').val();
	var keys_module = $('#value-id-module').val();
	var key_modules = $('#update-themes').val();
	var theme_new = $('#input-new-theme').val();

	switch (option) {
		case 'name module':
			$.post(
				'../php/create-course.php',
				{
					name_module: module_name,
					id_module: keys_module,
					identy: 'update name module',
				},
				function (data) {
					console.log(data);
					if (data == 'name update') {
						swalSimple('update name');
					}
				}
			);
			break;

		case 'name theme':
			$.post(
				'../php/create-course.php',
				{
					new_theme: theme_new,
					id_theme: key_modules,
					identy: 'update name theme',
				},
				function (data) {
					if (data == 'theme update') {
						swalSimple('update theme');
						comboUpdateThemes(keys_module);
						$('#update-themes').append('<option value="0" selected>Seleccionar tema</option>');
					}
				}
			);
			break;

		case 'add theme new':
			$.post(
				'../php/create-course-poo.php',
				{
					theme: $('#input-new-theme-update').val(),
					id_course: value_course.value,
					val_module: keys_module,
					detect: 'save themes',
					modificador: 'theme distinto',
					id_category: category.val(),
				},
				function (params) {
					if (params == 'exito theme') {
						swalSimple('add new theme');
						comboUpdateThemes(keys_module);
						$('#update-themes').append('<option value="0" selected>Seleccionar tema</option>');
					}
				}
			);
			break;
		case 'delete theme one':
			$.post(
				'../php/create-course.php',
				{
					key_theme: key_modules,
					identy: 'delete one theme',
					key_course: value_course.value,
				},
				function (data) {
					console.log(data);
					if (data == 'theme delete') {
						swalSimple('delete theme');
						comboUpdateThemes(keys_module);
						$('#update-themes').append('<option value="0" selected>Seleccionar tema</option>');
					}
				}
			);
			break;

		case 'upload material':
			var file = document.getElementById('customFileLang').files[0];

			var dataForm = new FormData();

			dataForm.append('files_material', file);
			dataForm.append('detect', 'material save');

			$.ajax({
				type: 'POST',
				url: '../php/create-course-poo.php',
				data: dataForm,
				contentType: false,
				processData: false,
				cache: false,
				success: function (response) {
					if (response == 'archivo almacenado') {
						var id_course = value_course.value;
						var key_themes = $('#update-themes').val();

						updateUploadMaterial(file, id_course, key_themes);
					}
				},
			});
			break;
	}
}

function updateUploadMaterial(upload_file, curso_key, tema_key) {

	var form = new FormData();

	form.append('files_material', upload_file);
	form.append('detect', 'material insert');
	form.append('key_course', curso_key);
	form.append('key_theme', tema_key);
	form.append('links', '');

	$.ajax({
		type: 'POST',
		url: '../php/create-course-poo.php',
		data: form,
		contentType: false,
		processData: false,
		cache: false,
		success: function (response) {
			console.log(response);
			if(response == 'insertado material'){
				swalSimple('material insert');
			}
		},
	});
}

function disableUpdateInputs() {
	updateAddMaterial();

	$('#update-themes').change(function (e) {
		e.preventDefault();

		if ($('#btn-delete-theme').is(':disabled') && $('#customFileLang').is(':disabled')) {
			var text_select = $('#update-themes option:selected').text();
			$('#input-new-theme').val(text_select);

			$('#input-new-theme').attr('disabled', false);
			$('#btn-update-actualizacion').attr('disabled', false);
		} else if (
			$('#btn-update-actualizacion').is(':disabled') &&
			$('#customFileLang').is(':disabled')
		) {
			$('#input-new-theme').attr('disabled', true);
		}
	});
}

function updateAddMaterial() {
	$('#customFileLang').change(function (e) {
		e.preventDefault();
		$('#btn-update-actualizacion').attr('disabled', false);
		$('#btn-update-actualizacion').text('Subir contenido');
	});
}

function disabledUpdateNewTheme() {
	$('#btn-update-new-theme').click(function (e) {
		e.preventDefault();

		$('#input-new-theme-update').attr('disabled', false);
	});
}

function deleteModule() {
	$(document).on('click', '.btn-delete', function (e) {
		e.preventDefault();

		console.log(value_course.value);

		Swal.fire({
			title: 'Eliminación del módulo',
			text:
				'Todos los temas, material de apoyo, links y videos de este módulo se eliminaran definitivamente. ¿Seguro que quieres eliminar este módulo del curso?',
			icon: 'warning',
			confirmButtonText: 'Eliminar',
			confirmButtonColor: '#092432',
			cancelButtonColor: '#bb1825',
			cancelButtonText: 'Cancelar',
			showCancelButton: true,
			allowOutsideClick: false,
		}).then((result) => {
			if (result.value) {
				var module_key = $(this).attr('href');

				$.post('../php/create-course-poo.php', {
					detect: 'delete module',
					key_module: module_key,
				});
				$.post('../php/create-course.php', {
					identy: 'update url course',
					key_course: value_course.value,
				});

				location.reload();
			}
		});
	});
}
