angular.module('app.controllers', [])
  


.controller('petFeederCtrl', ['$scope', '$http', '$stateParams', 'Data',
function ($scope, $http, $stateParams, Data) {
    $scope.info = {};
    $scope.Data = Data;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }
    if (window.localStorage.getItem('amount')) { $scope.Data.amount = window.localStorage.getItem('amount') }

    $scope.submitForm = function() {
        window.localStorage.setItem('url', Data.url);
        window.localStorage.setItem('key', Data.key);
        window.localStorage.setItem('amount', Data.amount);
        Data.feeding = false;
        Data.messaging = 'Sent amount '+Data.amount+' with key '+Data.key+' to '+Data.url+'. Waiting for response...'
        console.log(Data);
        console.log(JSON.stringify($scope.Data));
        let creds = JSON.stringify($scope.Data);

        $http({
          method  : 'POST',
          url     : $scope.Data.url,
          data    : creds, //forms user object
          timeout : 3000,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .success(function(data) {
            if (data.errors) {
              Data.messaging = 'There was an error: ' + data.errors.name;
              Data.feeding = true;
              //$scope.errorName = data.errors.name;
            } else {
              Data.messaging = 'Returned: '+data.statusText;
              $scope.message = data.message;
              Data.feeding = true;
            }
            
          });
        };
}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', 'Data' ,
function ($scope, $stateParams, Data) {
    $scope.Data = Data;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }
}])




