angular.module('losap', ['ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap']);

angular.module('losap').config(['$routeProvider', function($routeProvider) {
  'use strict';
  $routeProvider.when('/', {
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeController'
  })
  .when('/members/:id', {
    templateUrl: 'views/member.html',
    controller: 'MemberController'
  });
}]);

angular.module('losap').service('MemberService', ['$resource', function($resource) {
  'use strict';

  return $resource('/members', {}, {
    find: {
      method: 'GET',
      isArray: true
    },
    get: {
      url: '/members/:id',
      method: 'GET',
      isArray: false
    }
  });
}]);

angular.module('losap').controller('WelcomeController', ['$scope', '$location', 'MemberService',
  function($scope, $location, MemberService) {
  'use strict';
  
  $scope.findMember = function(pattern) {
    return MemberService.find({pattern: pattern})
      .$promise.then(function(res) {
        return res;
      })
  }
    
  $scope.goToMember = function(member) {
    $location.path('members/' + member.id);
  };
}]);

angular.module('losap').controller('MemberController', ['$scope', '$routeParams', 'MemberService',
  function($scope, $routeParams, MemberService) {
  'use strict';
  
  $scope.member = MemberService.get({id: $routeParams.id});
}]);
