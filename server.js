var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('frontend')); //Для запуска всего проекта через запуск сервера!!

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
    object.picture = req.body.picture;
    loadfromserver.push(object);
    fs.open("pictures/"+object.name, "a", 0644, function(err, file_handle) {
    if (!err) {
        // Записываем в конец файла readme.txt фразу "Copyrighted by Me"
        // при открытии в режиме "a" указатель уже в конце файла, и мы передаём null
        // в качестве позиции
        fs.write(file_handle, object.picture, null, 'ascii', function(err, written) {
            if (!err) {
                // Всё прошло хорошо
            } else {
                // Произошла ошибка при записи
            }
        });
    } else {
        // Обработка ошибок при открытии
    }
    });
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