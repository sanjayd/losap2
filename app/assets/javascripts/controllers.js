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
  $scope.loadMember($routeParams.id);
    
  $scope.$watch('[month, member]', function() {
    updateStationTimes();
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
      start_time: moment($scope.startTime).utc().format('HH:mm'),
      end_time: moment($scope.endTime).utc().format('HH:mm')
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
  $scope.date = new Date();
  $scope.unit = 'Engine';
}]);
