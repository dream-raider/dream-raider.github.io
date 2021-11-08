var win = true;
$(function () {
    $("#start").click(reset);
    $("#maze").hover(
        function () {
            $("#maze div.boundary").on();
            $("#end").on();
        },
        function () {
            $("#maze div.boundary").off();
            $("#end").off();
        }
    );
});

var statusText = $("#status").text();

function danger() {
    win = false;
    statusText = "Sorry, you lost!";
    $("#status").html(statusText).css("color", "red");
    $(".boundary").each(function () {
        $(this).addClass("youlose");
    });
}

function reset() {
    win = true;
    statusText = "Game Started!";
    $("#status").html(statusText).css("color", "green");
    $(".boundary").each(function () {
        $(this).removeClass("youlose");
    });
    $("#maze div.boundary").on("mouseover", danger);
    $("#end").on("mouseover", finish);
}
function finish() {
    statusText = "Game End!";
    $("#status").html(statusText).css("color", "blue");
    let currentStatus = win == true ? "You win! :]" : "Sorry, you lost! :[";
    alert(currentStatus);
    $(this).off();
    $("#maze div.boundary").off();
    return true;
}