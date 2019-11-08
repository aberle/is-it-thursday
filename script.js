$(document).ready(function() {
    var date = new Date();
    var day = date.getDay();
    if (day == 4) {
        $("#answer").text("YES");
        $("#answer").addClass('yes');

        var breed_call = $.ajax({
            type: "GET",
            url: "https://api.woofbot.io/v1/breeds"
        });

        breed_call.done(function(response) {
            var breeds = response.response.breeds;
            var chosen_breed = breeds[Math.floor(Math.random() * breeds.length)];

            $.ajax({
                type: "GET",
                url: "https://api.woofbot.io/v1/breeds/" + chosen_breed + "/image"
            }).done(function(response) {
                $("#puppy-time-message").text("and have a " + chosen_breed + " puppy to celebrate!");
                $("#puppy-time-picture").attr("src", response.response.url);
            }).fail(function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            });
        }).fail(function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        });

    } else {
        $("#answer").text("NO");
        $("#answer").addClass('no');
    }
});