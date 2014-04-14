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
  
  $scope.setDeleted = function(stationTime, deleted) {
    StationTimeService.delete({id: stationTime.id}, {station_time: {deleted: deleted}}, function() {
      stationTime.deleted = deleted;
    });
  }
  
  $scope.exit = function() {
    $location.path('/');
  };
}]);
