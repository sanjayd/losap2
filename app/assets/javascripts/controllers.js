angular.module('losap').controller('WelcomeController', ['$scope', '$rootScope',
  'MemberService',
  function($scope, $rootScope, MemberService) {
  'use strict';
  
  $rootScope.member = undefined;
  
  $scope.findMember = function(pattern) {
    return MemberService.find({pattern: pattern}).$promise;
  };
}]);

angular.module('losap').controller('MemberController', ['$scope',
  '$routeParams', '$location', 'MemberService', 'StationTimeService', '$filter',
  function($scope, $routeParams, $location, MemberService, StationTimeService,
    $filter) {
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
  $scope.year = moment().startOf('year').toDate();
  $scope.totals = {};
  $scope.loadMember($routeParams.id);
    
  $scope.$watch('[month, member]', function() {
    updateStationTimes();
    $scope.totals.month = StationTimeService.totals({month: $scope.month});
    $scope.year = moment($scope.month).startOf('year').toDate();
  }, true);
  
  $scope.$watch('[year, member]', function() {
    $scope.totals.year = StationTimeService.totals({year: $scope.year});
  }, true);
  
  $scope.setDeleted = function(stationTime, deleted) {
    StationTimeService.delete({id: stationTime.id}, {station_time: {deleted: deleted}}, function() {
      stationTime.deleted = deleted;
    });
  }
  
  $scope.newStandby = function() {
    $location.path($location.path() + '/newStandby');
  };
  
  $scope.newSleepIn = function() {
    $location.path($location.path() + '/newSleepIn');
  };
  
  $scope.exit = function() {
    $location.path('/');
  };
}]);

angular.module('losap').controller('NewStandbyController', ['$scope', '$routeParams',
  'StationTimeService',
  function($scope, $routeParams, StationTimeService) {
  'use strict';
  
  $scope.loadMember($routeParams.id);
  $scope.time = new Date();
  
  $scope.addStandby = function() {
    StationTimeService.addStandby({standby: {
      member_id: $scope.member.id,
      date: moment($scope.startTime).format('YYYY-MM-DD'),
      start_time: $scope.startTime,
      end_time: $scope.endTime
    }}).$promise.then(function() {
      $scope.toMember($scope.member.id);
    });
  };
}]);

angular.module('losap').controller('NewSleepInController', ['$scope', '$routeParams',
  'StationTimeService',
  function($scope, $routeParams, StationTimeService) {
  'use strict';
  
  $scope.loadMember($routeParams.id);
  $scope.date = moment().startOf('day').toDate();
  $scope.unit = 'Engine';
  
  $scope.addSleepin = function() {
    StationTimeService.addSleepin({sleep_in: {
      member_id: $scope.member.id,
      date: $scope.date,
      unit: $scope.unit
    }}).$promise.then(function() {
      $scope.toMember($scope.member.id);
    });
  };
}]);
