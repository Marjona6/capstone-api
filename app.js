//"use strict";
$(document).ready(function() {

    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        var userEarthDate = $('#js-earth-date-query').val();
        var userEarthDate = "2015-04-12";
        console.log(userEarthDate);
        var userCamera = $('#js-camera-query').val();
        // userCamera = "MAST";
        console.log(userCamera);
        getResults(userEarthDate, userCamera);
        // step 2: make API call



    });


    function getResults(desiredEarthDate, desiredCamera) {
      console.log(desiredCamera);
      console.log(desiredEarthDate);

            /* Update all the parameters for your API test*/
            var params = {
                earth_date: desiredEarthDate,
                camera: desiredCamera,
                api_key: 'OihgoSdCwSWjp0EmQpb2wgBGVkLQXwZ5jmb2DDSd'
            };
        var result = $.ajax({
                /* update API end point */
                url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
                data: params,
                //dataType: "json",
                /*set the call type GET / POST*/
                type: "GET"
            })
            /* if the call is successful (status 200 OK) show results */
            .done(function(result) {
                /* if the results are meeningful, we can just console.log them */
                console.log(result);
        displaySearchResults(result.photos);
            })
            /* if the call is NOT successful show errors */
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }



    function displaySearchResults(resultsArray) {
        var htmlOutput = '';
        $.each(resultsArray, function(resultsArrayKey, resultsArrayValue) {
            if ((resultsArrayKey + 1) % 3 == 0) {
                htmlOutput += "<div class='row'>";
            }
            htmlOutput += "<li>";
            htmlOutput += "<div class='col-3 container'>";
            console.log(resultsArrayValue.earth_date)
            htmlOutput += "<p> Earth date: " + resultsArrayValue.earth_date + "</p>"; // output earth date
            htmlOutput += "<p>Camera name: " + resultsArrayValue.camera.full_name + "</p>"; // output full camera name
            htmlOutput += "<a href='" + resultsArrayValue.img_src + "'>"; // open link to full size photo
            htmlOutput += "<img src='" + resultsArrayValue.img_src + "'/>"; // display photo
            htmlOutput += "</a>"; // close link to full size photo
            htmlOutput += "</div>";
            htmlOutput += "</li>";
            if ((resultsArrayKey + 1) % 3 == 0) {
                htmlOutput += "</div>";
            }
        });
        $("#js-search-results").html(htmlOutput);
    }
});

// TO DO: Fix CSS/styling. Footer needs to remain at the bottom and not float up next to two results in the spot where a third should be.
// TO DO: (cont.) Images are not staying within their containers. Need to fix sizing of images and containers.
// TO DO: Make it pretty. Find a better title.