angular.module('losap', ['ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ng-rails-csrf']);

angular.module('losap').config(['$routeProvider', function($routeProvider) {
  'use strict';
  
  $routeProvider.when('/members/:id', {
    templateUrl: 'views/member.html',
    controller: 'MemberController'
  })
  .when('/members/:id/newStandby', {
    templateUrl: 'views/new-standby.html',
    controller: 'NewStandbyController'
  })
  .otherwise({
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeController'
  });
}]);
