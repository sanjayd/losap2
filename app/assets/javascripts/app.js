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
  .when('/members/:id/newSleepIn', {
    templateUrl: 'views/new-sleepin.html',
    controller: 'NewSleepInController'
  })
  .otherwise({
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeController'
  });
}]);

angular.module('losap').run(['$rootScope', 'MemberService', '$location',
  function($rootScope, MemberService, $location) {
  'use strict';
    
  $rootScope.loadMember = function(id) {
    if (!$rootScope.member || $rootScope.member.id != id) {
      MemberService.get({id: id}, function(member) {
        $rootScope.member = member;
      });
    }
  };
  
  $rootScope.toMember = function(id) {
    $location.path('/members/' + id);
  };
}]);
