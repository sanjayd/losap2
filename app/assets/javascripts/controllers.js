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

angular.module('losap').controller('MemberController', ['$scope', '$routeParams', 
  '$location', 'MemberService', 'StationTimeService', 'CurrentMember', '$filter',
  function($scope, $routeParams, $location, MemberService, StationTimeService, CurrentMember, $filter) {
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
    CurrentMember.set(member);
    updateStationTimes();
  });
    
  $scope.$watch('month', function() {
    updateStationTimes();
  });
  
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

angular.module('losap').controller('NewStandbyController', ['$scope', 'CurrentMember',
  '$location', '$routeParams', 'MemberService', 'StationTimeService',
  function($scope, CurrentMember, $location, $routeParams, MemberService, StationTimeService) {
  'use strict';
  
  $scope.member = CurrentMember.get();
  
  if ($scope.member === undefined || $routeParams.id != $scope.member.id) {
    MemberService.get({id: $routeParams.id}, function(member) {
      $scope.member = member;
      CurrentMember.set(member);
    });
  }
  
  $scope.time = new Date();
  
  $scope.addStandby = function() {
    StationTimeService.addStandby({standby: {
      member_id: $scope.member.id,
      date: moment($scope.startTime).format('YYYY-MM-DD'),
      start_time: moment($scope.startTime).utc().format('HH:mm'),
      end_time: moment($scope.endTime).utc().format('HH:mm')
    }}).$promise.then(function() {
      $scope.toMember();
    });
  };
  
  $scope.toMember = function() {
    $location.path('/members/' + $scope.member.id);
  };
}]);

angular.module('losap').controller('NewSleepInController', ['$scope', 'CurrentMember',
  '$location', '$routeParams', 'MemberService', 'StationTimeService',
  function($scope, CurrentMember, $location, $routeParams, MemberService, StationTimeService) {
  'use strict';
  
  $scope.member = CurrentMember.get();
  
  if ($scope.member === undefined || $routeParams.id != $scope.member.id) {
    MemberService.get({id: $routeParams.id}, function(member) {
      $scope.member = member;
      CurrentMember.set(member);
    });
  }
  
  $scope.toMember = function() {
    $location.path('/members/' + $scope.member.id);
  };
  
  $scope.date = new Date();
  $scope.unit = 'Engine';
}]);
