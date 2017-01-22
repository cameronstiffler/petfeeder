angular.module('app.services', [])

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
        minute:'00',
        ampm:'am',
        times:[] };
}])

.factory('Imp', ["$http","Data",function($http, Data){
    return {  getTimes: function() {
        console.log("Imp service working");
        //console.log(Data)
        Data.key = window.localStorage.getItem('key');
        let creds = JSON.stringify(Data);

     return $http({
          method  : 'POST',
          url     : window.localStorage.getItem('url'),
          data    : creds, 
          timeout : 3000,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         });
        }
    }
}])