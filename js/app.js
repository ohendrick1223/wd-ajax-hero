(function() {
    'use strict';

    var movies = [];

    var renderMovies = function() {
        $('#listings').empty();

        for (var movie of movies) {
            var $col = $('<div class="col s6">');
            var $card = $('<div class="card hoverable">');
            var $content = $('<div class="card-content center">');
            var $title = $('<h6 class="card-title truncate">');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50,
            });
            $title.text(movie.title);

            var $poster = $('<img class="poster">');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            var $action = $('<div class="card-action center">');
            var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            var $modal = $(`<div id="${movie.id}" class="modal">`);
            var $modalContent = $('<div class="modal-content">');
            var $modalHeader = $('<h4>').text(movie.title);
            var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            var $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    // ADD YOUR CODE HERE
    var input = '';
    var apiQuery = 'http://www.omdbapi.com/?s=';

    $("#searchbutton").on("click", searchIt);
    $("#search").on("click", refresh);

    function searchIt(event) {
        //console.log("I'm listening");
        event.preventDefault();
        if ($("#search").val().length === 0) {
            //console.log("you typed nothing");
            return;
        } else {
            //console.log("you typed something");
            input = $("#search").val();
            var $xhr = $.getJSON(apiQuery + input);
            input = $("#search").val('');
            //clear the previous search results
            $xhr.done(function(data) {
                if ($xhr.status !== 200) {
                    console.log("there was an error")
                    return;
                } else {
                    console.log(data);
                    for (var k in data.Search) {
                        var movie = {
                            "imdbID": data.Search[k].imdbID,
                            "poster": data.Search[k].Poster,
                            "title": data.Search[k].Title,
                            "year": data.Search[k].Year
                        };
                        movies.push(movie);
                    }
                    console.log(movies);
                    renderMovies();
                }
            });
            $xhr.fail(function(err) {
                console.log(err);
            });
        }
    }
    function refresh() {
      movies = [];
    }



})();
