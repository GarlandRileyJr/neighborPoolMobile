angular.module('appCtrl', [])

.controller('loginCtrl',function($scope, $location){
    $scope.sendHome = function(){
        $location.path('/home')
    }
    $scope.sendSignup = function(){
        $location.path('/signup')
    }
})


.controller('homeCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
    $scope.map = { center: { latitude: 37.7911103, longitude: -122.40211139999997 }, zoom: 15 };
    $scope.maker = {};
    $scope.options = {url: '//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}

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
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          

            var map = new google.maps.Map(document.getElementById("map"), mapOptions); 



            $scope.map = map; 
            console.log($scope.map.center)  
            $ionicLoading.hide(); 


            $scope.RequestRideButton = function(){
                $scope.maker.latitude = position.coords.latitude;
                $scope.maker.longitude = position.coords.longitude;
                $scope.options = {url: '//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
            }


        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });

    })               
})
