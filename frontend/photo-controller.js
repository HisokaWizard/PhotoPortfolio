"use strict";

app.controller("photoCtrl", function(
    $location,
    $scope,
    $http)
{
    var _public = this;

    _public.addPicture = function(){
            _public.picture = document.getElementById("picture").files[0];
            var reader = new FileReader();
            reader.onload = function(){
                _public.data = {};
                _public.data.picture = reader.result;
                _public.data.name = _public.picture.name;
                $http.post("http://localhost:3056/savetofolder", _public.data)
                .success(function(result){
                    console.log("Success in save to folder post", result);
                })
                .error(function(result){
                    console.log("Error in save to folder post", result);
                });
            }
            reader.readAsDataURL(_public.picture);
            if(undefined == _public.picture){
                return;
            }
            _public.pictureData = {};
            _public.pictureData.name = _public.picture.name;
            _public.pictureData.id = _public.picture.lastModified;
            _public.pictureData.type = _public.picture.type;
            _public.pictureData.size = _public.picture.size;
            $http.post("http://localhost:3056/pictures", _public.pictureData)
                .success(function(result){
                    console.log("Success in pictures post", result);
                })
                .error(function(result){
                    console.log("Error in pictures post", result);
                });
    };

    $http.get("http://localhost:3056/pictures")
        .success(function (result) {
            console.log("Get Success pictures", result);
            _public.Picture = result;
        })
        .error(function (result) {
            console.log("Get Error pictures", result);
        });

    $http.get("http://localhost:3056/savetofolder")
        .success(function (result) {
            console.log("Get Success pictures", result);
            _public.ShowPicture = result;
        })
        .error(function (result) {
            console.log("Get Error pictures", result);
        });

    _public.GiveSrc = function(pict){
        for(var item in _public.ShowPicture){
            if(_public.ShowPicture[item].name == pict.name){
                var output = document.getElementById("output");
                output.src = pict.picture;
            }
        }
    }        
});