angular.module('app.controllers', [])
  
.controller('petFeederCtrl', ['$scope', '$http', '$stateParams', 'Data', 'Imp',
function ($scope, $http, $stateParams, Data, Imp) {
    $scope.Data = Data;
    $scope.Data.feeding = false;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }
    if (window.localStorage.getItem('amount')) { $scope.Data.amount = window.localStorage.getItem('amount') }

    $scope.submitForm = function() {
        window.localStorage.setItem('url', Data.url);
        window.localStorage.setItem('key', Data.key);
        window.localStorage.setItem('amount', Data.amount);
        $scope.Data.action = 'feed';
        $scope.Data.feeding = true;
        Data.messaging = 'Here we go!'
        $scope.Data.action = 'feed';
        Imp.getTimes().success(function(response){
          $scope.Data.feeding = false;
          $scope.Data.messaging = response.statusText;
       }).error(function(response){
         $scope.Data.feeding = false;
         $scope.Data.messaging = 'Feeder did not respond';
       })
  }
}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', 'Data' ,
function ($scope, $stateParams, Data) {
    $scope.Data = Data;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }
}])


.controller('timerDetailCtrl', ['$scope', '$http', '$stateParams', 'Data', 'Imp', 
function ($scope, $http, $stateParams, Data, Imp) {
    $scope.Data = Data;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }
    //if (window.localStorage.getItem('amount')) { $scope.Data.amount = window.localStorage.getItem('amount') }

    $scope.addTime = function() {
      $scope.Data.action = 'gettimes';
      $scope.Data.feeding = true;
        Imp.getTimes().success(function(response){
          $scope.times = response;
          $scope.times.push({"id":0,"time":Data.hour+":"+Data.minute+" "+Data.ampm,"amount":Data.amount});
          $scope.Data.action = 'addtime';
          $scope.Data.times = $scope.times;
          Imp.getTimes().success(function(response){
            $scope.Data.feeding = false;
            $scope.Data.messaging = response.statusText;
        }).error(function(response){
         $scope.Data.feeding = false;
         $scope.Data.messaging = 'Feeder did not respond';
       })
      })
    }
}])


.controller('timerSummaryCtrl', ['$scope', '$stateParams', 'Data' ,'$http', 'Imp',
function ($scope, $stateParams, Data,$http,Imp) { 
    $scope.Data = Data;
    $scope.Data.action = 'gettimes';
    $scope.range = function(count){
      var bars = []; 
      for (var i = 0; i < count; i++) { 
        bars.push(i) 
      }
      return bars;
      }
      Imp.getTimes().success(function(response){
        $scope.times = response;
      })
}])




