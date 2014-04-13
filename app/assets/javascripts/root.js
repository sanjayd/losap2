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
    return MemberService.find({pattern: pattern}).$promise;
  }
    
  $scope.goToMember = function(member) {
    $location.path('members/' + member.id);
  };
}]);

angular.module('losap').filter('displayMonth', function() {
  return function(month) {
    return month.format('MMMM YYYY');
  }
});

angular.module('losap').directive('lpMonthControl', function() {
  return {
    restrict: 'A',
    scope: {
      month: '='
    },
    templateUrl: 'partials/month-control.html',
    link: function(scope, element, attrs) {
      scope.prevMonth = function() {
        scope.month.subtract(moment.duration(1, 'months'));
      };
      
      scope.hasNextMonth = function() {
        return moment(scope.month).add(moment.duration(1, 'months')).isBefore();
      };
      
      scope.nextMonth = function() {
        scope.month.add(moment.duration(1, 'months'));
      }
    }
  };
});

angular.module('losap').controller('MemberController', ['$scope', '$routeParams', '$location', 'MemberService',
  function($scope, $routeParams, $location, MemberService) {
  'use strict';
  
  $scope.member = MemberService.get({id: $routeParams.id});
  $scope.month = moment().startOf('month');
  
  $scope.exit = function() {
    $location.path('/');
  };
}]);
