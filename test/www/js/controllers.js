angular.module('appCtrl', [])

.controller('loginCtrl',function($scope, $location){
    $scope.sendHome = function(){
        $location.path('/home')
    }
    $scope.sendSignup = function(){
        $location.path('/signup')
    }
})

.controller('signupCtrl', function($scope, $location){
  $scope.data = {};
  $scope.signup= function(data){  
    $location.path('/home')
  }
})

.controller('homeCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
    $scope.map = { center: { latitude: 37.7911103, longitude: -122.40211139999997 }, zoom: 15 };
    $scope.maker = {};

    $ionicPlatform.ready(function() {    

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;

            var myLatlng = new google.maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude);
            var mapOptions = {
                center: myLatlng,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          

            var map = new google.maps.Map(document.getElementById("map"), mapOptions); 



            $scope.map = map; 
            console.log($scope.map.center)  
            $ionicLoading.hide(); 


                $scope.goCats = false
            $scope.RequestRideButton = function(){
                console.log($scope.goCats)
                if(!$scope.goCats){
                     $scope.maker.latitude = position.coords.latitude;
                    $scope.maker.longitude = position.coords.longitude;
                    $scope.options = {url: 'img/banana-icon.png', scaledSize: new google.maps.Size(40, 40)}

                }else{

                    // $scope.options = {url: 'img/jordan.jpg', scaledSize: new google.maps.Size(40, 40)}
                        $scope.maker.latitude = null;
                        $scope.maker.longitude = null;
                        console.log("Testing");
                }
            }


        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });

    })               
})
