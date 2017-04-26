"use strict";

app.controller("photoCtrl", function(
    $location,
    $scope,
    $http)
{
    var _public = this;

    document.forms.upload.onsubmit = function() {
        _public.picture = document.getElementById("picture").files[0];
        _public.addPicture(_public.picture);
    };

    _public.addPicture = function(picture){
        if(undefined == picture){
            return;
        }
        _public.pictureData = {};
        _public.pictureData.name = picture.name;
        _public.pictureData.id = picture.lastModified;
        _public.pictureData.type = picture.type;
        _public.pictureData.size = picture.size;
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
});