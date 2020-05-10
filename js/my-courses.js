$(document).ready(function () {
	showListCourses();
});

function showListCourses() {
	var user = document.getElementById('value-user').value;
	var pass = document.getElementById('value-pass').value;

	$.ajax({
		type: 'POST',
		url: '../php/my-courses.php',
		data: {
			num: user,
			password: pass,
		},
		success: function (response) {
			var json = JSON.parse(response);

			if (json == 'without courses') {
				$('#alert-message').show();
			} else {
				$('#alert-message').hide();
				$('#div-my-courses').addClass('row');

				var size = json.my_courses.length;

				for (course = 0; course < size; course++) {
					$('#div-my-courses').append(
						"<div class='col-sm-12 mb-3 mb-md-0'>" +
							"<div class='card mt-3'>" +
							"<div class='card-body'>" +
							"<div class='row'>" +
							"<div class='row'>" +
							"<div class='col-md-4 col-sm-12'>" +
							"<video class='embed-responsive embed-responsive-16by9'>" +
							'<source src=../' +
							json.my_courses[course].url_video +
							" type='video/mp4'>" +
							'</video>' +
							'</div>' +
							"<div class='col-md-8 col-sm-12'>" +
							'<p>' +
							json.my_courses[course].description +
							'</p>' +
							'<h5>' +
							json.my_courses[course].title +
							'</h5>' +
							"<a href='start-course?value=" +
							json.my_courses[course].id_course +
							'&title=' +
							json.my_courses[course].title +
							'&descri=' +
							json.my_courses[course].description +
							"'><button class='btn btn-sm btn-success' id='start'>Empezar curso</button></a>" +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>'
					);
				}
			}
		},
	});
}
