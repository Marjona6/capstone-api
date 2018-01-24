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
        "image": "https://mars.nasa.gov/images/rover21-full.jpg",
        "destination": "Gusev Crater, Mars",
        "current_location": "Troy, Mars",
        "about": "One of two rovers launched in 2003 to explore Mars and search for signs of past life, Spirit far outlasted her planned 90-day mission. Among her myriad discoveries, Spirit found evidence that Mars was once much wetter than it is today and helped scientists better understand the Martian wind.</p><p>In May 2009, the rover became embedded in soft soil at a site called \"Troy\" with only five working wheels to aid in the rescue effort. After months of testing and carefully planned maneuvers, NASA ended efforts to free the rover and eventually ended the mission on May 25, 2011.",
        "about_source": "https://www.jpl.nasa.gov/missions/mars-exploration-rover-spirit-mer/"
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
        "about": "Opportunity was the second of the two rovers launched in 2003 to land on Mars and begin traversing the Red Planet in search of signs of past life. The rover is still actively exploring the Martian terrain, having far outlasted her planned 90-day mission.</p><p>Since landing on Mars in 2004, Opportunity has made a number of discoveries about the Red Planet including dramatic evidence that long ago at least one area of Mars stayed wet for an extended period and that conditions could have been suitable for sustaining microbial life.",
        "about_source": "https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer/"
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
        "about": "The Mars Science Laboratory mission\'s Curiosity rover, the most technologically advanced rover ever built, landed in Mars\' Gale Crater the evening of Aug. 5, 2012 PDT (morning of Aug. 6 EDT) using a series of complicated landing maneuvers never before attempted. The specialized landing sequence, which employed a giant parachute, a jet-controlled descent vehicle and a bungee-like apparatus called a \"sky crane,\" was devised because tested landing techniques used during previous rover missions could not safely accommodate the much larger and heavier rover.</p><p>Curiosity's mission is to determine whether the Red Planet ever was, or is, habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments.",
        "about_source": "https://www.jpl.nasa.gov/missions/mars-science-laboratory-curiosity-rover-msl/"
    }
];
var selectedRover = "Spirit";
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
            htmlOutput += "<p>Launch date: " + roverInfoValue.launch_date + "</p>"; // output rover launch date
            htmlOutput += "<p>Landing date: " + roverInfoValue.landing_date + "</p>"; // output rover landing date
            htmlOutput += "<p>Destination: " + roverInfoValue.destination + "</p>"; // output rover destination
            htmlOutput += "<p>Current location: " + roverInfoValue.current_location + "</p>"; // output rover location
            htmlOutput += "<a href='" + roverInfoValue.image + "' target = '_blank'>"; // open link to full size photo
            htmlOutput += "<div class='image' style='background-image: url(" + roverInfoValue.image + ")'></div>";
            htmlOutput += "</a>"; // close link to full size photo
            htmlOutput += "<p>" + roverInfoValue.about + "</p>"; // display "about" info
            htmlOutput += "<p class='detail'>Information from NASA's <a href='" + roverInfoValue.about_source + "' target='_blank'>Jet Propulsion Laboratory</a>.</p>";
            htmlOutput += "<form action='#' class='js-rover-select'>"; // open form with js targeting for rover selection
            var lowerCaseRoverName = roverInfoValue.name.toLowerCase();
            htmlOutput += "<input type='hidden' value='" + lowerCaseRoverName + "' class='inputRoverName'>";
            htmlOutput += "<button class='btn' type='submit'>Select</button>";
            htmlOutput += "</form>"; // close form
            htmlOutput += "</div>";
            htmlOutput += "</li>";
            $("#js-rover-info ul").html(htmlOutput);
        });
    }

    $('.js-rover-select').submit(function (event) {
        event.preventDefault();
        selectedRover = $(this).parent().find(".inputRoverName").val();
        $('#js-rover-info').hide();
        $('#js-curiosity-search').hide();
        $('#js-opportunity-search').hide();
        $('#js-spirit-search').hide();
        $('#js-' + selectedRover + '-search').show();
    });


    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        $('#js-rover-info').hide();
        $('#js-curiosity-search').hide();
        $('#js-opportunity-search').hide();
        $('#js-spirit-search').hide();

        var userEarthDate = $(this).parent().find('.js-earth-date-query').val();
        var userCamera = $(this).parent().find('.js-camera-query').val();
        if (userCamera == 'ALL') {
            getResults(userEarthDate);
        } else {
            getResults(userEarthDate, userCamera);
        }
        // step 2: make API call
        function getResults(desiredEarthDate, desiredCamera) {

            /* Update all the parameters for the API test*/
            var params = {
                earth_date: desiredEarthDate,
                api_key: 'OihgoSdCwSWjp0EmQpb2wgBGVkLQXwZ5jmb2DDSd'
            };
            if (desiredCamera) {
                params.camera = desiredCamera;
            }
            var result = $.ajax({
                    /* update API end point */
                    url: "https://api.nasa.gov/mars-photos/api/v1/rovers/" + selectedRover + "/photos",
                    data: params,
                    /*set the call type GET / POST*/
                    type: "GET"
                })
                /* if the call is successful (status 200 OK) show results */
                .done(function (result) {
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
            if (resultsArray == '') {
                htmlOutput += "<p class=\"relevant-message\">Sorry, no photos available for this camera for this day.</p>";
            } else {
                htmlOutput += "<p class=\"relevant-message\">Photos taken by the " + selectedRover.toUpperCase() + " rover.</p>";
                htmlOutput += "<p class=\"relevant-message\">Earth date: " + resultsArray[0].earth_date + "</p>";
                htmlOutput += "<p class=\"relevant-message\">Click on any image to open the full-size version in a new window.</p>"
                $.each(resultsArray, function (resultsArrayKey, resultsArrayValue) {
                    htmlOutput += "<li>";
                    htmlOutput += "<div class='col-4 box'>";
                    htmlOutput += "<a href='" + resultsArrayValue.img_src + "' target='_blank' alt='" + resultsArrayValue.camera.full_name + "' title='" + resultsArrayValue.camera.full_name + "'>"; // open link to full size photo
                    htmlOutput += "<div class='image' style='background-image: url(" + resultsArrayValue.img_src + ")'></div>";
                    htmlOutput += "</a>"; // close link to full size photo
                    htmlOutput += "</div>";
                    htmlOutput += "</li>";
                });
            }
            htmlOutput += "<div class='container'>";
            htmlOutput += "<input type='button' class='btn' value='Search Again' onClick='window.location.reload()'>";
            htmlOutput += "</div>";
            $("#js-search-results ul").html(htmlOutput);
        }
    });
});
