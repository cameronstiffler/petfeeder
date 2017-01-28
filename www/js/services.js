angular.module('app.services', [])

//Data to be sent from app to agent
.factory('Data', [function(){
    return { 
        key: '', 
        url: '', 
        amount:'5', 
        messaging: '',
        settingsSet: 'false',
        feeding: 'false',
        action:'feed',
        time:'6:00am',
        hour:'1',
        clientTime:'',
        minute:'00',
        id:'',
        ampm:'am',
        times:[] };
}])

//Imp service handles communication with agent
.factory('Imp', ["$http","Data",function($http, Data){
    return {  getTimes: function() {
        Data.key = window.localStorage.getItem('key');
        Data.clientTime = new Date();
        let creds = JSON.stringify(Data);

     return $http({
          method  : 'POST',
          url     : window.localStorage.getItem('url'),
          data    : creds, 
          timeout : 30000,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         });
        }
    }
}])