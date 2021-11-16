
$(document).ready(function () {

    $("#search").click(searchClick);

    function searchClick() {
        $("ul").children().remove();

        $word = $("#word").val();
        if ($("#word").val().length === 0) {
            alert('Enter value to search')
        } else {
            $('#loader').show();
        }
        $.ajax({
            url: "http://localhost:2021/search",
            type: 'POST',
            data: { word: $word },

            success: successFunction,
            complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                $('#loader').hide();
            },
        });
    }

    function successFunction(data) {
        parsedData = JSON.parse(data);
        if (parsedData.length === 0) {
            alert("Enter valid keyword to search")
        } else {
            for (var i = 0; i < parsedData.length; i++) {
                $("ul").append(`<li>${i + 1} (${parsedData[i].wordtype}) :: ${parsedData[i].definition}</li>`)
            }
        }

    }
});