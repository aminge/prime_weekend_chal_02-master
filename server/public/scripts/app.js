var onPerson = 0;
var intervalID = 0;

$(document).ready(function(){
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {

            personArray = data.people;

            for (i = 0; i < (personArray.length); i++) {
                $('.pageordering').append('<li data-index="' + i + '"><a href="#">' + (i + 1) + '</a></li>');
                //$('.pageordering').children().last().data('index', i);
            }

            displayPerson(onPerson);

            startTimer();

            $('#leftButton').on('click', function() {
                removePerson();
                onPerson--;
                if (onPerson < 0) {
                    onPerson += personArray.length;
                }
                displayPerson(onPerson);

                clearInterval(intervalID);
                startTimer();
            });

            $('#rightButton').on('click', function() {
                removePerson();
                onPerson++;
                if (onPerson >= personArray.length) {
                    onPerson -= personArray.length;
                }
                displayPerson(onPerson);

                clearInterval(intervalID);
                startTimer();
            });

            $('.pageordering').on('click', 'li', function() {
                removePerson();
                onPerson = $(this).data('index');
                //delay(400);
                displayPerson(onPerson);

                clearInterval(intervalID);
                startTimer();
            });
        },

        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }
    });
}

function displayPerson(personIndex) {
    $('.pageordering .selected').removeClass('selected');
    $('.pageordering li[data-index="' + personIndex + '"] a').addClass('selected');
    var person = personArray[personIndex];
    var img = '<img src="' + person.picture + '" />';
    $('#personContainer').append('<div><h2>' + person.name + '</h2>' + img + '<p>' + person.favoriteMovie1 + '</p><p>'
        + person.favoriteMovie2 + '</p><p>' + person.favoriteSong + '</p></div>');
    $('#personContainer').children().last().stop(true, true).hide().delay(400).fadeIn(400);
}

function removePerson() {
    $('#personContainer').children().stop(true, true).fadeOut(400, function() {
        $(this).remove();
    });
}

function startTimer() {
    intervalID = setInterval(function() {
        removePerson();
        onPerson++;
        if (onPerson >= personArray.length) {
            onPerson -= personArray.length;
        }
        displayPerson(onPerson);
    }, 10000);
}