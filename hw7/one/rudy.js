// Erika Joshi - Homework 7
//      Module and closure - Timer
// validated with jsHint
var rudyTimer = (function () {
    function rudy() { // called each time the timer goes off
        document.getElementById("output").innerHTML += " Rudy!";
    }
    let timer = null;
    if (timer === null) {
        timer = setInterval(rudy, 1000);
    } else {
        clearInterval(timer);
        timer = null;
    }
}
)

