var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

// Connection
var server = new Server('127.0.0.1', 27017, {auto_reconnect:true});
var db = new Db('test',server);

db.open(function(err, db){
    if(!err){
	console.log("We are connected to mongodb 127.0.0.1:27017 ");
	
	// Insert
	db.collection('users', function(err, collection){
	    var doc = {'first_name':'emily', 'last_name':'hsieh', 'age':'24'};
	    var doc2 = {'first_name':'tom_test', 'last_name':'lai_test'};
            collection.insert(doc);
            collection.insert(doc2);
	}); // Insert

	// Update		
	db.collection('users', function(err,collection){
	    if(err){console.log(err);}
	    var query_doc = {'first_name' : 'emily'}; 
	    collection.update(query_doc, {'$set':{'age':26}});
	}); // Update
		
	// Remove
	db.collection('users', function(err,collection){
	    var query_doc = {'first_name' : 'tom_test'};
	    collection.remove(query_doc);		
	}); // Remove

	// Select	
	db.collection('users', function(err,collection){
	    var query_doc = {'first_name' : 'tom'};
	    collection.findOne(query_doc, function(err, user){
		if(err) console.log(err);
		if(user){
		    console.log( "[Select] User => _id: " + user._id + ", first_name: " + user.first_name + ", last_name: " + user.last_name + ", age:" + user.age );
		}
	    });
	    // Print all
            collection.find().toArray(function(err, users) {
                users.forEach(function(user) {
                    console.log( "[Select all] User => _id: " + user._id + ", first_name: " + user.first_name + ", last_name: " + user.last_name + ", age:" + user.age );
                });
            }); 
	}); //Select
    } // if (!err)
}); // db.open

