var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var MongoClient = require('mongodb').MongoClient;

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/users/selectAll', function(req, res){
    var server = new Server('127.0.0.1', 27017, {auto_reconnect:true, poolSize:1});
    var db = new Db('test',server);
    db.open(function(err, db){
        if(!err){
            db.collection('users', function(err,collection){
                collection.find().toArray(function(err, docs){
                    res.send(docs);
                });
            });
  	} //if
    });
});

app.get('/api/users/update/:key/:value/:key2/:value2', function(req, res){
    var server = new Server('127.0.0.1', 27017, {auto_reconnect:true, poolSize:1});
    var db = new Db('test',server);
    db.open(function(err, db){
        if(!err){
	    var key = req.params.key;
            var value = req.params.value;
            var key2 = req.params.key2;
            var value2 = req.params.value2;
            if(key == '_id'){
                var ObjectId = mongo.ObjectID;
                value = new ObjectId(value);
            }
	    db.collection('users', function(err,collection){
                var query = {}, query2={};
	        query[key]=value;
	        query2[key2]=value2;
                collection.update(query,{ '$set' : query2 });
            });
            res.send('[update successful] {' + key+':'+value+'}' + 'set {'+key2+':'+value2+'}'); 
        }//if
    db.close();
    });//db open

});

app.get('/api/users/:action/:key/:value', function(req, res){
    var server = new Server('127.0.0.1', 27017, {auto_reconnect:true, poolSize:1});
    var db = new Db('test',server);
    db.open(function(err, db){
        if(!err){
            db.collection('users', function(err,collection){
		var action = req.params.action;
	        var key = req.params.key;
	        var value = req.params.value;
		if(key == '_id'){
		    var ObjectId = mongo.ObjectID;
		    value = new ObjectId(value);
		}
	        var query = {};
	        query[key] = value;
		if (action == 'select'){
                    collection.findOne(query, function(err, user){
                        if(err) console.log(err);
                        if(user){
	   	            res.send(user);
                        }else{
		            res.send('"error":"empty result"');
		        }
                    });
		}else if(req.params.action =='insert'){
            	    collection.insert(query);
		    res.send('[insert successful] {' + key + ':' + value + '}'); 
		}else if (req.params.action == 'update'){
                    db.collection('users', function(err,collection){
                        var query_doc = {'first_name':'tom'};
                        collection.update(query_doc,{'$set':{'age':27}});
                    });
                    res.send('[update successful] {' + key+':'+value+'}'); 
		}else if (req.params.action == 'remove'){
            	    collection.remove(query);
		    res.send('[remove successful] {' + key + ':' + value + '}'); 	
		}else{
		    res.send('action error');
		}
            });
	} //if
    db.close();
    });//db.open
});

var server = app.listen(3000, function () {
  console.log('Example app listening at http://127.0.0.1:27017');
});

