var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');

  // ------------ Shows all restaurants ---------------- //
  var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  if(allChoice == "all"){
    collection.find().toArray(function(err, doc){
      console.log(doc);
    });

  // ------------- Shows just one restaurant ---------- //
	var oneChoice = prompt("Type the name of the restaurant and press enter to display the restaurant's info: ");
	collection.find({ "name" : oneChoice }).forEach( function(doc){
		console.log(doc);
	});

	// --------------- Adds a restaurant ------------- //
	var add = prompt("Do you want to add a restaurant?");
	var name = prompt("What is the name?");
	var street = prompt("What is the street address?");
	var city = prompt("What is the city?");
	var yelp = prompt("what is the yelp URL?");
	var newRestaurant = { "name" : name, "street" : street, "city" : city, "yelp" : yelp }
	if (add == "yes") {
		collection.insert(newRestaurant);
	} else {
		console.log("I didn't want to help you anyways.");
	};

	// ---------------- Edits a restaurant ----------- //
	var whichRestaurant = prompt("Which restaurant would you like to update?  ");
	collection.find({ "name" : whichRestaurant }).forEach( function(doc){
		console.log(doc);

		var whichField = prompt("What field would you like to update: name, streetAddress, zip, or yelpURL? ");
		
		if (whichField == "name") {
			var newName = prompt("What is the new name?");
			collection.update( {"name" : whichRestaurant}, {$set:{ "name": newName}} );
		} else if (whichField == "streetAddress") {
			var newStreet = prompt("What is the new street address?");
			collection.update( {"name" : whichRestaurant}, {$set:{ address.street: newStreet}} );
		} else if (whichField == "zip") {
			var newZip = prompt("What is the new zip code?");
			collection.update( {"name" : whichRestaurant}, {$set:{ address.zipcode: newZip}} );
		} else {
			var newYelp = prompt("What is the new yelp URL?");
			collection.update( {"name" : whichRestaurant}, {$set:{ "yelp": newYelp}} );
		};
	});

	// ------------------- Deletes a restaurant ------------- //
	var deleteRestaurant = prompt("Which restaurant would you like to delete? ");

	collection.find({ "name" : deleteRestaurant }).forEach( function(doc){
		console.log(doc);
		collection.remove({"name" : deleteRestaurant });
	});

  } else {
    console.log("Aw, you don't want to see the restaurants?");
  }
});
