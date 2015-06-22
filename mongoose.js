var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/test', function (error) {
    if (!error) {
        console.log("Connected!");
    }
});

// Model
var User = new Schema({
  first_name: String,
  last_name: String
});

var UserModel = mongoose.model('User', User);

// Insert
UserModel.create({ first_name:"method2", last_name:"m2" }, function (err, small) {
  if (err) return handleError(err);
  console.log("User => _id: " + user._id + ", first_name: " + user.first_name + ", last_name: " + user.last_name);
})

// Update
var query = { first_name: 'hello' };
var options = { multi: true };
UserModel.update(query, { first_name: 'emily' }, options, function (err, numAffected) {
    console.log(numAffected);

});

// Select
UserModel.find({}, function(err, users) {
    for (var i=0, counter=users.length; i < counter; i++) {
        var user = users[i];
        console.log( "User => _id: " + user._id + ", first_name: " + user.first_name + ", last_name: " + user.last_name );

    }
});

// Remove
UserModel.remove({first_name:'hello'}, function(err){
    if(err) {
	throw err;
    }else {
	console.log("remove successful");
    }
});

