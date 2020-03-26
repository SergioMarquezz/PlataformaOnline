$(document).ready(function () {
    chronometer();
});

function chronometer(){

    var accountant_seconds = 0;
    var accountant_minutes = 0;

    var seconds = document.getElementById("seconds");
    var minutes = document.getElementById("minutes");

    var chronometer = setInterval(function(){

        if(accountant_seconds == 60){

            accountant_seconds = 0;
            accountant_minutes++;
            minutes.innerHTML = accountant_minutes

            if(accountant_minutes == 2){

                accountant_minutes = 0;
               clearInterval(chronometer)
            }
        }
        seconds.innerHTML = accountant_seconds
        accountant_seconds++;

    },1000)
}