function giffygif() {
    var topics = ["Porsche", "BMW", "Mercedes", "Lamborghini", "Ferrari", "Zonda", "Chevy", "Ford", "Dodge", "Nissan", "Mazda", "Honda", "Subaru", "Toyota", "Mitsubishi"]
    renderButtons();
    function renderButtons(){
    for (i = 0; i < topics.length; i++) {
        var topicBtn = $('<button>').text(topics[i]);
        topicBtn.attr("data-person", topics[i]);
        topicBtn.attr("class", "btn btn-primary");

        $("#buttons").append(topicBtn);

    }}


    //onclick of the new buttons


        $("button").on("click", function () {
            var person = $(this).attr("data-person");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    var results = response.data;
                    $("#gifs-appear-here").empty();


                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var personImage = $("<img>");
                        personImage.attr("data-still", results[i].images.fixed_height_still.url);
                        personImage.attr("data-animate", results[i].images.fixed_height.url);
                        personImage.attr("src", results[i].images.fixed_height_still.url);
                        personImage.attr("class", "image gif");

                        gifDiv.prepend(p);
                        gifDiv.prepend(personImage);

                        $("#gifs-appear-here").append(gifDiv);
                    }
                });
        });
    
        $(document).on("click", ".gif", animateGif);
        function animateGif() {
        console.log(state);
        var state = $(this).attr("src");
        var still = $(this).attr("data-still")
        var animate = $(this).attr("data-animate")
          //check what is in attribute "data-state".if still....else if animate 
        if (state == still) {
            $(this).attr("src", animate)
        }
        else if (state == animate) {
            $(this).attr("src", still)
        }
    }
    $("#add-movie").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var carbrand = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(carbrand);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });


}
