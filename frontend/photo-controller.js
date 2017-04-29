"use strict";

app.controller("photoCtrl", function(
    $scope,
    $http)
{
    var _public = this;

    _public.addPicture = function(){
            _public.picture = document.getElementById("picture").files[0];
            var reader = new FileReader();
            reader.onload = function(){
                _public.data = {};
                _public.data.data = reader.result;
                _public.data.name = _public.picture.name;
                $http.post("http://localhost:3056/savetofolder", _public.data)
                .success(function(result){
                    console.log("Success in save to folder post", result);
                    _public.ShowPicture = result;
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
                    _public.Pictures = result;
                })
                .error(function(result){
                    console.log("Error in pictures post", result);
                });
    };
    
    _public.flagShowPicture = false;
    _public.GetRandomImg = function(){
        _public.randomMessage = {value:"get random picture"};
        $http.post("http://localhost:3056/randompicture", _public.randomMessage)
            .success(function(result){
                _public.randomPicture = result;
                if(undefined != _public.randomPicture.data){
                    _public.flagShowPicture = true;
                }
                console.log("Success in save to folder post", result);
            })
            .error(function(result){
                console.log("Error in save to folder post", result);
            });
    };

    _public.ClickAnywhere = function(event){
        _public.flagShowPicture = false;
    };

    $http.get("http://localhost:3056/savetofolder")
        .success(function(result){
            _public.ShowPicture = result;
            console.log("Success savetofolder GET", result);
        })
        .error(function(result){
            console.log("Error savetofolder GET", result);
        });
});