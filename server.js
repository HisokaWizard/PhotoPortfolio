var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();

app.use(bodyParser.json({limit : "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended : true}));
app.use(express.static('frontend')); //Для запуска всего проекта через запуск сервера!!

var pg = require('pg');
var conString = "tcp://admin:secret@localhost:3056/database";
var client = new pg.Client(conString);
client.connect();

client.query(
"INSERT INTO users " +
"(name, age) VALUES ($1, $2) " +
"RETURNING id",
['Mike', 39],
function(err, result) {
    if (err) throw err;
        console.log('Insert ID is ' + result.rows[0].id);
    }
);

app.get('/', function(req, res){
    res.sendFile('index.html');
});

var pictures = [];
var loadfromserver = [];

app.post('/pictures', function(req, res) {
    console.log(req.body);

    var object = {};
    object.id = req.body.id;
    object.name = req.body.name;
    object.type = req.body.type;
    object.size = req.body.size;
    pictures.push(object);
    res.send(pictures);
});

app.post('/savetofolder', function(req, res) {
    var object = {};
    object.name = req.body.name;
    object.data = req.body.data;
    loadfromserver.push(object);
});

app.get('/pictures', function(req, res) {
    res.send(pictures);
});

app.get('/savetofolder', function(req, res){
    res.send(loadfromserver);
});

app.listen(3056, function(){
    console.log("Photo-portfolio API Started (Port:3056)");
});