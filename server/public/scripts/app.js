var onPerson = 1;

$(document).ready(function(){
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {

            personArray = data.people;

            for (i = 1; i < (personArray.length + 1); i++) {
                $('.pagination').append('<li data-index="' + i + '"><a href="#">' + i + '</a></li>');
            }

            displayPerson(personArray[onPerson - 1]);

            $('#leftButton').on('click', function() {
                removePerson();
                onPerson--;
                if (onPerson < 1) {
                    onPerson += personArray.length;
                }
                displayPerson(personArray[onPerson - 1])
            });

            $('#rightButton').on('click', function() {
                removePerson();
                onPerson++;
                if (onPerson > personArray.length) {
                    onPerson -= personArray.length;
                }
                displayPerson(personArray[onPerson - 1]);
            });

            $('.pagination').on('click', 'li', function() {
                removePerson();
                personNumber = $(this).data('index');
                displayPerson(personArray[personNumber - 1]);
            });


        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}

function displayPerson(person) {
    $('#personContainer').append('<div><h2>' + person.name + '</h2><p>' + person.favoriteMovie1 + '</p><p>'
        + person.favoriteMovie2 + '</p><p>' + person.favoriteSong + '</p></div>');
    //$('#personContainer').append('<h2>' + person.name + '</h2>');
    //$('#personContainer').append('<p>' + person.favoriteMovie1 + '</p>');
    //$('#personContainer').append('<p>' + person.favoriteMovie2 + '</p>');
    //$('#personContainer').append('<p>' + person.favoriteSong + '</p>');
}

function removePerson() {
    $('#personContainer').children().remove();
}