//"use strict";
var roverInfo = [
    {
        "name": "Spirit",
        "landing_date": "2004-01-04",
        "launch_date": "2003-06-10",
        "status": "complete",
        "max_sol": 2208,
        "max_date": "2010-03-21",
        "total_photos": 124550,
        "image": "https://www.jpl.nasa.gov/missions/web/mer.jpg",
        "destination": "Gusev Crater, Mars",
        "current_location": "Troy, Mars",
        "about": "One of two rovers launched in 2003 to explore Mars and search for signs of past life, Spirit far outlasted her planned 90-day mission. Among her myriad discoveries, Spirit found evidence that Mars was once much wetter than it is today and helped scientists better understand the Martian wind.</p><p>In May 2009, the rover became embedded in soft soil at a site called \"Troy\" with only five working wheels to aid in the rescue effort. After months of testing and carefully planned maneuvers, NASA ended efforts to free the rover and eventually ended the mission on May 25, 2011."
    },
    {
        "name": "Opportunity",
        "landing_date": "2004-01-25",
        "launch_date": "2003-07-07",
        "status": "active",
        "max_sol": 4650,
        "max_date": "2017-02-22",
        "total_photos": 187093,
        "image": "https://www.jpl.nasa.gov/missions/web/mer.jpg",
        "destination": "Terra Meridiani, Mars",
        "current_location": "Endeavour Crater, Mars",
        "about": "Opportunity was the second of the two rovers launched in 2003 to land on Mars and begin traversing the Red Planet in search of signs of past life. The rover is still actively exploring the Martian terrain, having far outlasted her planned 90-day mission.</p><p>Since landing on Mars in 2004, Opportunity has made a number of discoveries about the Red Planet including dramatic evidence that long ago at least one area of Mars stayed wet for an extended period and that conditions could have been suitable for sustaining microbial life."
    },
    {
        "name": "Curiosity",
        "landing_date": "2012-08-06",
        "launch_date": "2011-11-26",
        "status": "active",
        "max_sol": 1717,
        "max_date": "2017-06-05",
        "total_photos": 315921,
        "image": "https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA14156-1920x1200.jpg",
        "destination": "Mars",
        "current_location": "Gale Crater, Mars",
        "about": "The Mars Science Laboratory mission\'s Curiosity rover, the most technologically advanced rover ever built, landed in Mars\' Gale Crater the evening of Aug. 5, 2012 PDT (morning of Aug. 6 EDT) using a series of complicated landing maneuvers never before attempted. The specialized landing sequence, which employed a giant parachute, a jet-controlled descent vehicle and a bungee-like apparatus called a \"sky crane,\" was devised because tested landing techniques used during previous rover missions could not safely accommodate the much larger and heavier rover.</p><p>Curiosity's mission is to determine whether the Red Planet ever was, or is, habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments."
    }
]
$(document).ready(function () {
    displayRoverInfo(roverInfo);
    $('#js-curiosity-search').hide();
    $('#js-opportunity-search').hide();
    $('#js-spirit-search').hide();

    function displayRoverInfo(roverInfo) {
        var htmlOutput = '';
        $.each(roverInfo, function (roverInfoKey, roverInfoValue) {
            htmlOutput += "<li>";
            htmlOutput += "<div class='col-4 box'>";
            htmlOutput += "<p>Rover name: " + roverInfoValue.name + "</p>"; // output rover name
            htmlOutput += "<p>Landing date: " + roverInfoValue.landing_date + "</p>"; // output rover landing date
            htmlOutput += "<p>Destination: " + roverInfoValue.destination + "</p>"; // output rover destination
            htmlOutput += "<p>Current location: " + roverInfoValue.current_location + "</p>"; // output rover location
            htmlOutput += "<a href='" + roverInfoValue.image + "'>"; // open link to full size photo
            htmlOutput += "<img src='" + roverInfoValue.image + "'/>"; // display photo
            htmlOutput += "</a>"; // close link to full size photo
            htmlOutput += "<p>" + roverInfoValue.about + "</p>"; // display "about" info
            htmlOutput += "<form action='#' class='js-rover-select'>"; // open form with js targeting for rover selection
            var lowerCaseRoverName = roverInfoValue.name.toLowerCase();
            htmlOutput += "<button type='submit' value='" + lowerCaseRoverName + "'>Select</button>";
            //            console.log(lowerCaseRoverName);
            htmlOutput += "</form>"; // close form
            htmlOutput += "</div>";
            htmlOutput += "</li>";
            $("#js-rover-info ul").html(htmlOutput);
        });
    }

    $('.js-rover-select').submit(function (event) {
        event.preventDefault();
        $('#js-rover-info').hide();
        $('#js-curiosity-search').show();
        console.log(event.target);
    });


    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        $('#js-rover-info').hide();
        $('#js-curiosity-search').hide();
        $('#js-opportunity-search').hide();
        $('#js-spirit-search').hide();
        var userEarthDate = $('#js-earth-date-query').val();
        var userEarthDate = "2015-04-12";
        //console.log(userEarthDate);
        var userCamera = $('#js-camera-query').val();
        var userCamera = "MAST";
        //console.log(userCamera);
        getResults(userEarthDate, userCamera);
        // step 2: make API call

        function getResults(desiredEarthDate, desiredCamera) {
            //console.log(desiredCamera);
            //console.log(desiredEarthDate);

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
                .done(function (result) {
                    /* if the results are meeningful, we can just console.log them */
                    console.log(result);
                    displaySearchResults(result.photos);
                })
                /* if the call is NOT successful show errors */
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        }



        function displaySearchResults(resultsArray) {
            var htmlOutput = '';
            htmlOutput += "Photos taken by the PLACEHOLDER rover";
            $.each(resultsArray, function (resultsArrayKey, resultsArrayValue) {
//                if ((resultsArrayKey + 1) % 3 == 0) {
//                    htmlOutput += "<div class='row'>";
//                }
                htmlOutput += "<li>";
                htmlOutput += "<div class='col-4 box'>";
                console.log(resultsArrayValue.earth_date);
                htmlOutput += "<p> Earth date: " + resultsArrayValue.earth_date + "</p>"; // output earth date
                htmlOutput += "<p>Camera name: " + resultsArrayValue.camera.full_name + "</p>"; // output full camera name
                htmlOutput += "<a href='" + resultsArrayValue.img_src + "' target='blank'>"; // open link to full size photo
                htmlOutput += "<img src='" + resultsArrayValue.img_src + "'/>"; // display photo
                htmlOutput += "</a>"; // close link to full size photo
                htmlOutput += "</div>";
                htmlOutput += "</li>";
//                if ((resultsArrayKey + 1) % 3 == 0) {
    //                    htmlOutput += "</div>";
    //                }
            });
            $("#js-search-results ul").html(htmlOutput);
        }
    });
});

// TO DO: Make footer left-aligned.
// TO DO: Make it possible to select a rover by clicking the "Select" button.
// TO DO: Add space between NASA logo and search form after a rover is selected
