// ARRAY DECLARATIONS
{
	var allBikesArray = [];
	var feltArray = [];
	var konaArray = [];
	var scottArray = [];
	var mountainArray = [];
	var roadArray = [];
	var trackArray = [];
	var to500Array = [];
	var to1000Array = [];
	var to5000Array = [];

	var brandArray;
    var typeArray;
    var priceArray;
}

// THIS VARIABLE WILL HOLD ALL HTML TO BE  
// DISPLAYED IN dynamicContent DIV.
var dynContent;

// THIS VARIABLE WILL HOLD dynamicContent SEARCH HTML
// WHILE VIEWING SINGLE BIKE
var lastPage = "";


// THESE STRING VARIABLES ARE USED TO CREATE HTML FOR EACH
// BIKE DISPLAYED IN dynamicContent DIV AFTER SEARCH
var thumb1 = "<div class='col-md-3 col-sm-6 thumbBox'><center><img src='";
var thumb2 = "' class='thumbImage'><h4>";
var thumb3 = "</h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor a turpis vel malesuada. <br><input type='button' class='singleButton' value='Select' onclick='displaySingle(brandArray[";
var thumb4 = "])'</input></center></div>";

function bikeObject(bike) {
	this.name = bike.name;
	this.brand = bike.brand;
	this.type = bike.type;
	this.price = bike.price;
	this.thumbId = bike.thumbId;
	this.thumbImg = bike.thumbImg;
	this.img = bike.img;
}

function populateBikeArrays() {
	$.getJSON('scripts/bikes.json', function(data) {
		
		// POPULATE allBikesArray

		$.each(data.bikes, function(i, bike) {
			var thisBike = new bikeObject(bike);
			console.log("thisBike: " + thisBike.name);
			allBikesArray.push(thisBike);
		});

		// POPULATE VARIOUS BIKE ARRAYS

		$.each( allBikesArray, function( index, currentBike ){
  			
  			// POPULATE BRAND ARRAYS
  			
  			if(currentBike.brand === "felt") {
  				feltArray.push(currentBike);
  			} else if(currentBike.brand === "kona") {
  				konaArray.push(currentBike);
  			} else if(currentBike.brand === "scott") {
  				scottArray.push(currentBike);
  			}

  			// POPULATE TYPE ARRAYS

  			if(currentBike.type === "mountain") {
  				mountainArray.push(currentBike);
  			} else if(currentBike.type === "road") {
  				roadArray.push(currentBike);
  			} else if(currentBike.type === "track") {
  				trackArray.push(currentBike);
  			}

  			// POPULATE PRICE ARRAYS

  			if(currentBike.price <= 500) {
  				to500Array.push(currentBike);
  			} else if(currentBike.price <= 1000) {
  				to1000Array.push(currentBike);
  			} else if(currentBike.price <= 5000) {
  				to5000Array.push(currentBike);
  			}

		});

		// ARRAY TESTS - PRINTS TO CONSOLE
		{
			// $.each(allBikesArray, function( index, value) {
			// 	console.log("allbikes[" + index + "]: " + value.name);
			// })
			// $.each(feltArray, function( index, value) {
			// 	console.log("feltbikes[" + index + "]: " + value.name);
			// })
			// $.each(konaArray, function( index, value) {
			// 	console.log("konabikes[" + index + "]: " + value.name);
			// })
			// $.each(scottArray, function( index, value) {
			// 	console.log("scottbikes[" + index + "]: " + value.name);
			// })
			// $.each(mountainArray, function( index, value) {
			// 	console.log("mountainbikes[" + index + "]: " + value.name);
			// })
			// $.each(roadArray, function( index, value) {
			// 	console.log("roadbikes[" + index + "]: " + value.name);
			// })
			// $.each(trackArray, function( index, value) {
			// 	console.log("trackbikes[" + index + "]: " + value.name);
			// })
			// $.each(to500Array, function( index, value) {
			// 	console.log("<=$500bikes[" + index + "]: " + value.name);
			// })
			// $.each(to1000Array, function( index, value) {
			// 	console.log("<=$1000bikes[" + index + "]: " + value.name);
			// })
			// $.each(to5000Array, function( index, value) {
			// 	console.log("<=$5000bikes[" + index + "]: " + value.name);
			// })
		}

	}).error(function() {
		console.log('error');
	});
}

function mySubmit() {
    var brand = document.forms["bikeForm"]["brandButton"].value;
    var type = document.forms["bikeForm"]["typeButton"].value;
    var price = document.forms["bikeForm"]["priceButton"].value;

    
    dynContent = ""; 

    if (brand === "felt") {
        brandArray = feltArray;
    } else if (brand === "kona") {
        brandArray = konaArray;
    } else if (brand === "scott") {
        brandArray = scottArray;
    } else {
        brandArray = allBikesArray;
    };

    if (type === "mountain") {
        typeArray = mountainArray;
    } else if (type === "road") {
        typeArray = roadArray;
    } else if (type === "track") {
        typeArray = trackArray;
    } else {
        typeArray = allBikesArray;
    };

    if (price === "to500") {
        priceArray = to500Array;
    } else if (price === "to1000") {
        priceArray = to1000Array;
    } else if (price === "to5000") {
        priceArray = to5000Array;
    } else {
        priceArray = allBikesArray;
    };

    
    var currentBike;
    var typeContained;
    var priceContained;

    // ITERATES THRU SELECTED BRAND ARRAY.
    // TESTS IF EACH BIKE IS A MEMBER OF THE SELECTED TYPE AND PRICE ARRAYS.
    // IF TRUE THEN BIKE IS ADDED TO dynContent AND DISPLAYED.

    for (var i = 0; i < brandArray.length; i++) {
        currentBike = brandArray[i];
        typeContained = $.inArray(currentBike, typeArray);
        priceContained = $.inArray(currentBike, priceArray)

        var bikeDiv = "";

        if (typeContained >= 0 && priceContained >= 0) {
            
            bikeDiv += thumb1 + currentBike.thumbImg + thumb2 + currentBike.name + thumb3 + i + thumb4;
        };
        dynContent += bikeDiv;
    };

    var strLength = dynContent.length;
    if (strLength > 0) {
        $("#dynamicContent").html(dynContent);
    } else {
        dynContent = "<div class='col-md-12 thumbBox'><h3>No products matched your request.</h3></div>";
        $("#dynamicContent").html(dynContent);
    };
}

function displaySingle(bike) {
    console.log(bike);
    lastPage = dynContent;
    var singleContent = "";
    var singDiv1 = "<div class='col-md-4 col-md-offset-1'><a href='";
    // bike[4]
    var singDiv2 = "' class='lightbox_trigger'><img src='";
    // bike[1]
    var singDiv3 = "' class='thumbImage'><center><br>Click to Enlarge</center></a></div><div class='col-md-6 col-md-offset-1 singleInfo'><h3 class='bikeName'>";
    // bike[2]
    var singDiv4 = "</h3><ul><li class='price'>Price: $";
    // bike[3]
    var singDiv5 = "</li><li>Weight: XXX</li><li>Height: XXX</li><li>Length: XXX</li><li>Gears: XX</li></ul></div><div class='col-md-12 singleDescrip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor a turpis vel malesuada. Sed vitae ornare lacus. Duis laoreet ipsum in magna sagittis imperdiet. Maecenas in diam a lectus pharetra rutrum. Nulla massa mi, malesuada non vulputate et, auctor vitae lectus. Phasellus vel maximus odio. Maecenas non commodo libero. Ut diam quam, viverra eu turpis quis, ornare bibendum lorem. Nulla a sem augue. Integer volutpat justo quis neque maximus, vitae fermentum nunc aliquam. Aliquam in iaculis dui. Pellentesque sit amet tellus quis purus vestibulum gravida nec a nibh. Aliquam at faucibus arcu. Duis sem mauris, hendrerit non enim a, ultrices luctus ligula.<br><input type='button' class='backButton' value='Back' onclick='backButton()'/></div>";

    singleContent = singDiv1 + bike.img + singDiv2 + bike.thumbImg + singDiv3 + bike.name + singDiv4 + bike.price + singDiv5;
    console.log(singleContent);
    $("#dynamicContent").html(singleContent);
}

function backButton() {
    $("#dynamicContent").html(lastPage);
}

$(function() {
	populateBikeArrays();
	
	// POPULATE WINDOW WITH ALLBIKES ON PAGE LOAD NOT WORKING IN JSON BUILD
	//mySubmit();  

	$("#bikeForm").submit(function(e) {
        e.preventDefault();
        mySubmit();
        var windowWidth = $(window).width();
        if (windowWidth < 600) {
            window.location.href = "products.html#dynamicContent";
        };
    });

	$(document).on('click', '.lightbox_trigger', function(e) {
        //alert("We got here");

        // Code that makes the lightbox appear
        e.preventDefault();
        try {
            var image_href = $(this).attr("href");
            console.log(image_href);

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

        } catch(ex) {
            alert("error occurred.");
        }
    });

    $('#lightbox').live('click', function() {
        $('#lightbox').hide();
        $("html").css("position", "static");
    });
	
})