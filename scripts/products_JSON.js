console.log("we got here");

function mySubmit() {
    var brand = document.forms["bikeForm"]["brandButton"].value;
    var type = document.forms["bikeForm"]["typeButton"].value;
    var price = document.forms["bikeForm"]["priceButton"].value;
}

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



function bikeObject(bike) {
	this.name = bike.name;
	//console.log("this.name: " + this.name + " bike.name: " + bike.name);
	this.brand = bike.brand;
	this.type = bike.type;
	this.price = bike.price;
	this.thumbId = bike.thumbId;
	this.thumbImg = bike.thumbImg;
	this.img = bike.img;

	//bikeCounter++;
}

function populateBikeArrays() {
	$.getJSON('scripts/bikes.json', function(data) {
		//console.log('success');
		$.each(data.bikes, function(i, bike) {
			var thisBike = new bikeObject(bike);
			console.log("thisBike: " + thisBike.name);
			allBikesArray.push(thisBike);
		});
		$.each( allBikesArray, function( index, currentBike ){
  			
  			if(currentBike.brand === "felt") {
  				feltArray.push(currentBike);
  			} else if(currentBike.brand === "kona") {
  				konaArray.push(currentBike);
  			} else if(currentBike.brand === "scott") {
  				scottArray.push(currentBike);
  			}
		});
		$.each(allBikesArray, function( index, value) {
			console.log("allbikes[" + index + "]: " + value.name);
		})
		$.each(feltArray, function( index, value) {
			console.log("feltbikes[" + index + "]: " + value.name);
		})
	}).error(function() {
		console.log('error');
	});

}

$(function() {
	populateBikeArrays();
	//console.log("we got to ready doc");
	
	
})