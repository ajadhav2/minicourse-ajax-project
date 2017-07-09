
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var image = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    var street = $( "#street" ).val();
    var city = $( "#city" ).val();

    address = street + ", " + city;

    $greeting.text('So dou you want to live at ' + address + '?');
    console.log(" address " + address);

    // var res = '<img class="bgimg" src=' + image + ' >';

    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';

    // console.log(" img " + res);
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');


    //NYT Articles

    // My Implementation

    // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    // url += '?' + $.param({'api-key': "58c442f36b9645c4b199cdcded60c1a2"});

    // $.getJSON(url, function(data) {
    //     console.log(data);
    //     var items = [];
    //       $.each( data.response.docs, function( i, item ) {
    //         items.push( "<li id='article'>" + //item.headline.main 
    //             '<a href="' + item.web_url + '">' + item.headline.main + '</a>'
    //             + '<p>' + item.snippet + '</p>'
    //             + "</li>" );
    //       });
         
    //       $( "<ul/>", {
    //         "class": "article-list",
    //         html: items.join( "" )
    //       }).appendTo( "body" );
    // });

    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=58c442f36b9645c4b199cdcded60c1a2';

    $.getJSON(nytimesUrl, function(data){
        // console.log(data);

        $nytHeaderElem.text('New York Times Articles About ' + city);

        articles = data.response.docs;

        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>'
                + '<p>' + article.snippet + '</p>'
                + "</li>"
                );
        }
          
    }).fail(function(e) {
            // alert( "Handler for .fail() called." );
            $nytHeaderElem.text('New York Times Articles Could Not Be Loaded ');
          });

    return false;
};

$('#form-container').submit(loadData);


//test
