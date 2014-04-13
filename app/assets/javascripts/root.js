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

angular.module('losap').controller('MemberController', ['$scope', '$routeParams', '$location', 'MemberService',
  function($scope, $routeParams, $location, MemberService) {
  'use strict';
  
  $scope.stationTimeData = {};
  $scope.stationTimeData[moment('2014-04-01').toDate()] =[
    {
      id: 1,
      date: '2014-04-11',
      apparatus: 'Truck',
      deleted: true
    },
    {
      id: 2,
      date: '2014-04-12',
      startTime: '0900',
      endTime: '1500',
      deleted: false
    },
    {
      id: 3,
      date: '2014-04-16',
      apparatus: 'Engine',
      deleted: false
    },
    {
      id: 7,
      date: '2014-04-09',
      startTime: '1700',
      endTime: '2100',
      deleted: true
    }
  ];
  $scope.stationTimeData[moment('2014-03-01').toDate()] = [
    {
      id: 4,
      date: '2014-03-01',
      apparatus: 'Truck',
      deleted: true
    },
    {
      id: 5,
      date: '2014-03-02',
      startTime: '0900',
      endTime: '1500',
      deleted: false
    },
    {
      id: 6,
      date: '2014-03-06',
      apparatus: 'Engine',
      deleted: false
    },
    {
      id: 8,
      date: '2014-03-09',
      startTime: '1700',
      endTime: '2100',
      deleted: true
    }
  ];  
  
  $scope.member = MemberService.get({id: $routeParams.id});
  $scope.month = moment().startOf('month').toDate();
    
  $scope.$watch('month', function() {
    var stationTimes = undefined;
    for(var obj in $scope.stationTimeData) {
      if (obj == $scope.month) {
        stationTimes = $scope.stationTimeData[obj];
      }
    }
    $scope.stationTimes = stationTimes;
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
