// BIKES

var brand;
var type;
var price;


var compiledList = "";
var spec1 = "<div class='col-md-6 col-sm-12 testBorder'>spec1</div>";
var spec2 = "<div class='col-md-6 col-sm-12 testBorder'>spec2</div>";

// var testDIV = document.createElement('div');
// $("#dynamicContent").appendChild(testDIV);



$(function() {
	var dynContent = "";
	dynContent += spec1;
	dynContent += spec2;
	//var testDIV = document.createElement(dynContent);
	
	
	//$("#dynamicContent").html(dynContent);
	


	// LIGHTBOX CODE

	$('.lightbox_trigger').click(function(e) {
    
        // Code that makes the lightbox appear
        e.preventDefault();
        var image_href = $(this).attr("href");

        if ($('#lightbox').length > 0) { // #lightbox exists
    
            //insert img tag with clicked link's href as src value
            $('#content').html('<img src="' + image_href + '" />');
            
            //show lightbox window - you can use a transition here if you want, i.e. .show('fast')
            $('#lightbox').show();
        } else { //#lightbox does not exist 
    
            //create HTML markup for lightbox window
            var lightbox = 
            '<div id="lightbox">' +
                '<p>Click to close</p>' +
                '<div id="content">' + //insert clicked link's href into img src
                    '<img src="' + image_href +'" />' +
                '</div>' +  
            '</div>';
                
            //insert lightbox HTML into page
            $('body').append(lightbox);
        }
        $("html")
            .css("position", "fixed")
            .css("width", "100%");

        $('img').bind('contextmenu', function(e) {
            return false;
        }); 
    });

    $('#lightbox').live('click', function() {
        $('#lightbox').hide();
        $("html").css("position", "static");
    });

})


