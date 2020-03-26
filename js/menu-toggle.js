$(document).ready(function () {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });

      sizeScreen();
});

function sizeScreen(){

    var width = $(window).width()

    if(width >= 751){
      $("#menu-toggle").hide();
    }
}


