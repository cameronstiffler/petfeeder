angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('tabsController.petFeeder', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/petFeeder.html',
        controller: 'petFeederCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab2': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController.timersummary', {
    url: '/timersummary',
    views: {
      'tab3': {
        templateUrl: 'templates/timersummary.html',
        controller: 'timerSummaryCtrl'
      }
    }
  })

    .state('tabsController.timerdetail', {
    url: '/timerdetail',
    views: {
      'tab3': {
        templateUrl: 'templates/timerdetail.html',
        controller: 'timerDetailCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/home')
});