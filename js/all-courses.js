$(document).ready(function () {
	allCourses();
	fillInComboCategories();
	document.getElementById('select-ordey-by').addEventListener('change', ordeyBy);
	document.getElementById('select-category').addEventListener('change', ordeyCategoryCourses);
	document.getElementById('select-duration').addEventListener('change', ordeyForMonth);
	document.getElementById('button-search').addEventListener('click', buttonSearch);
});

function creatCards(response) {
	$('#row-all-courses').addClass('row');
	$('#row-all-courses').addClass('mt-4');

	$('#row-all-courses').append(
		"<div class='col-md-4 col-sm-12 mt-4'>" +
			"<div class='card'>" +
			"<video class='embed-responsive embed-responsive-16by9' controls>" +
			'<source src=../' +
			response.all_courses[i].url_video +
			" type='video/mp4'>" +
			'</video>' +
			"<div class='card-body'>" +
			"<h4 class='card-title title-course'>" +
			response.all_courses[i].title +
			'</h4>' +
			"<div class='row'>" +
			"<div class='col-md-4 col-sm-12'>" +
			"<h6 class='card-text mt-2 text-danger'>Gratis</h6>" +
			'</div>' +
			"<div class='col-md-8 col-sm-12'>" +
			"<a href='information-course?title=" +
			response.all_courses[i].title +
			'&desc=' +
			response.all_courses[i].description +
			'&lessons=' +
			response.all_courses[i].total_lessons +
			'&hours=' +
			response.all_courses[i].total_hours +
			'&months=' +
			response.all_courses[i].elapsed_month +
			'&course=' +
			response.all_courses[i].id_courses +
			"' class='btn btn-sm btn-success' id='access-course'>Acceder al curso</a>" +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
	);
}

function allCourses() {
	$.ajax({
		type: 'POST',
		url: '../php/all-courses.php',
		data: {
			indentify: 'all courses',
		},
		success: function (response) {
			if (response != 'sin courses') {
				var json = JSON.parse(response);
				var size = json.all_courses.length;

				for (i = 0; i < size; i++) {
					creatCards(json);
				}
			}
		},
	});
}

function ordeyBy() {
	var index_value = document.getElementById('select-ordey-by').value;
	document.getElementById('select-category').selectedIndex = 0;
	document.getElementById('select-duration').selectedIndex = 0;

	if (index_value == 1) {
		$.ajax({
			type: 'POST',
			url: '../php/all-courses.php',
			data: {
				indentify: 'ordey asc',
			},
			success: function (response) {
				var json = JSON.parse(response);

				var size = json.all_courses.length;

				for (i = 0; i < size; i++) {
					creatCards(json);
				}
			},
		});

		$('#row-all-courses').load(' #row-all-courses');
	} else if (index_value == 2) {
		$.ajax({
			type: 'POST',
			url: '../php/all-courses.php',
			data: {
				indentify: 'ordey desc',
			},
			success: function (response) {
				var json = JSON.parse(response);

				var size = json.all_courses.length;

				for (i = 0; i < size; i++) {
					creatCards(json);
				}
			},
		});
		$('#row-all-courses').load(' #row-all-courses');
	}
}

function fillInComboCategories() {
	$.ajax({
		type: 'POST',
		url: '../php/all-courses.php',
		data: {
			indentify: 'categories',
		},
		success: function (response) {
			if (response != 'sin categorias') {
				var json = JSON.parse(response);

				var size = json.categories.length;

				for (data = 0; data < size; data++) {
					$('#select-category').append(
						'<option value=' +
							json.categories[data].id_category +
							'>' +
							json.categories[data].name +
							'</option>'
					);
				}
			}
		},
	});
}

function ordeyForMonth() {
	var duration = document.getElementById('select-duration').value;

	$.ajax({
		type: 'POST',
		url: '../php/all-courses.php',
		data: {
			indentify: 'diff month',
			diff: duration,
		},
		success: function (response) {
			var json = JSON.parse(response);

			var size = json.all_courses.length;

			for (i = 0; i < size; i++) {
				creatCards(json);
			}
		},
	});
	$('#row-all-courses').load(' #row-all-courses');
	document.getElementById('select-ordey-by').selectedIndex = 0;
	document.getElementById('select-category').selectedIndex = 0;
}

function ordeyCategoryCourses() {
	var id = document.getElementById('select-category').value;

	$.ajax({
		type: 'POST',
		url: '../php/all-courses.php',
		data: {
			indentify: 'ordey category',
			id_category: id,
		},

		success: function (response) {
			var json = JSON.parse(response);

			var size = json.all_courses.length;

			for (i = 0; i < size; i++) {
				creatCards(json);
			}
		},
	});
	$('#row-all-courses').load(' #row-all-courses');
	document.getElementById('select-ordey-by').selectedIndex = 0;
	document.getElementById('select-duration').selectedIndex = 0;
}

function buttonSearch() {
	var title = document.getElementById('search-course').value;

	$.ajax({
		type: 'POST',
		url: '../php/all-courses.php',
		data: {
			indentify: 'search',
			title: title,
		},

		success: function (response) {
			var json = JSON.parse(response);

			var size = json.all_courses.length;

			for (i = 0; i < size; i++) {
				creatCards(json);
			}
		},
	});
	$('#row-all-courses').load(' #row-all-courses');
}
