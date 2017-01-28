angular.module('app.controllers', [])

//FEED NOW CONTROLLER -- Send amount and wait for response sent after auger is done running
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
        Imp.getTimes().success(response => {
          $scope.Data.feeding = false;
          $scope.Data.messaging = response.statusText;
       })
       
       //Alert of failure if agent doesn't respond
       .error(response => {
         $scope.Data.feeding = false;
         $scope.Data.messaging = 'Feeder did not respond';
       })
  }
}])

//SETTINGS CONTROLLER -- Input agent url and device key
.controller('settingsCtrl', ['$scope', '$stateParams', 'Data' ,
function ($scope, $stateParams, Data) {
    $scope.Data = Data;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }
}])


//CREATE NEW FEEDING TIME CONTROLLER -- Add a time to existing and get the complete list back as confirmation
.controller('timerDetailCtrl', ['$scope', '$http', '$stateParams', 'Data', 'Imp', '$state',
function ($scope, $http, $stateParams, Data, Imp, $state) {
    $scope.Data = Data;
    if (window.localStorage.getItem('url')) { $scope.Data.url = window.localStorage.getItem('url') }
    if (window.localStorage.getItem('key')) { $scope.Data.key = window.localStorage.getItem('key') }

    $scope.addTime = function() {
      $scope.Data.action = 'gettimes';
      $scope.Data.feeding = true;
        Imp.getTimes().success(response => {
          $scope.times = response;
          $scope.times.push({"id":0,"time":Data.hour+":"+Data.minute+" "+Data.ampm,"amount":Data.amount});
          $scope.Data.action = 'addtime';
          angular.copy($scope.times, $scope.Data.times);
          Imp.getTimes().success(response => {
            $scope.Data.feeding = false;
            angular.copy($scope.times, $scope.Data.times);
            $scope.Data.messaging = response.statusText;            
        })

        //Alert of failure if agent does not respond
        .error(response => {
         $scope.Data.feeding = false;
         $scope.Data.messaging = 'Feeder did not respond';
       }) 

       //Go back to the Feeding Time Summary List after new time added
       .then(function() {$scope.Data.times = $scope.times; Data.times = $scope.times; $state.transitionTo('tabsController.timersummary', {reload: true});})
      })
    }
}])


//FEEDING TIME SUMMARY CONTROLLER -- list of feeding times
.controller('timerSummaryCtrl', ['$scope', '$stateParams', 'Data' ,'$http', 'Imp', '$state',
function ($scope, $stateParams, Data, $http ,Imp, $state) { 
    $scope.Data = Data;
    $scope.Data.action = 'gettimes';
    $scope.Data.messaging = '';
    $scope.range = function(count){
      let bars = []; 
      for (let i = 0; i < count; i++) { 
        bars.push(i) 
      }
      return bars;
      }


    //Get the existing feeding times from the agent
    Imp.getTimes().success(response => {
      $scope.Data.times = response;
      //Save feeding times to local storage incase connection to agent is lost
      window.localStorage.setItem('times', $scope.times);
      $scope.Data.feeding = false;
    })
    
    //Fail gracefully if agent not available
    .error(response => {
        $scope.Data.feeding = false;
        $scope.Data.messaging = 'Feeder did not respond';
        //If data not available from agent get it from local storage
        if (window.localStorage.getItem('times')) { $scope.times = window.localStorage.getItem('times'); }
    })

    //click to add new feeding time
    $scope.gotoAdd = function() {
      $state.go('tabsController.timerdetail', {reload: true});
    }

    //click time in list to remove it from the agent
    $scope.removeTime = function(id) {
      $scope.Data.action = 'removetime';
      $scope.Data.id = id;//entry to remove
      $scope.Data.feeding = true;
      Imp.getTimes().success(response => {
          //get the times back minus the removed one
          $scope.Data.times = response;
          $scope.Data.feeding = false;
          $scope.Data.messaging = response.statusText;
       })
       
       //Alert of failure if agent doesn't respond
       .error(response => {
         $scope.Data.feeding = false;
         $scope.Data.messaging = 'Feeder did not respond';
      })
    }
}])




