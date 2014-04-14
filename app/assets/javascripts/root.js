angular.module('losap', ['ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ng-rails-csrf']);

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

angular.module('losap').service('StationTimeService', ['$resource', function($resource) {
  'use strict';
  
  return $resource('/station_times', {}, {
    findByMonth: {
      method: 'GET',
      isArray: true
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

angular.module('losap').directive('lpMonthControl', function() {
  'use strict';
  
  return {
    restrict: 'A',
    scope: {
      month: '='
    },
    templateUrl: 'partials/month-control.html',
    link: function(scope, element, attrs) {
      scope.prevMonth = function() {
        scope.month = moment(scope.month).subtract(moment.duration(1, 'months')).toDate();
      };
      
      scope.hasNextMonth = function() {
        return moment(scope.month).add(moment.duration(1, 'months')).isBefore();
      };
      
      scope.nextMonth = function() {
        scope.month = moment(scope.month).add(moment.duration(1, 'months')).toDate();
      }
    }
  };
});

angular.module('losap').controller('MemberController', ['$scope', '$routeParams', 
  '$location', 'MemberService', 'StationTimeService', '$filter',
  function($scope, $routeParams, $location, MemberService, StationTimeService, $filter) {
  'use strict';
  
  var updateStationTimes = function() {
    if ($scope.member) {
      $scope.stationTimes = StationTimeService.findByMonth({
        member_id: $scope.member.id, 
        month: $filter('date')($scope.month, 'yyyy-MM-dd')
      });
    }
  };
  
  $scope.month = moment().startOf('month').toDate();
  
  MemberService.get({id: $routeParams.id}, function(member) {
    $scope.member = member;
  }).$promise.then(function() {
    updateStationTimes();
  });
    
  $scope.$watch('month', function() {
    updateStationTimes();
  });
  
  $scope.deleteStationTime = function(id) {
    console.debug('deleting: ', id);
  };
  
  $scope.undeleteStationTime = function(id) {
    console.debug('undeleting: ', id);
  };
  
  $scope.exit = function() {
    $location.path('/');
  };
}]);
