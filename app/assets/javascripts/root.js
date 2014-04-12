angular.module('losap', ['ngRoute', 'ui.bootstrap']);

angular.module('losap').config(['$routeProvider', function($routeProvider) {
  'use strict';
  $routeProvider.when('/', {
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeController'
  });
}]);

angular.module('losap').controller('WelcomeController', ['$scope', '$location', function($scope, $location) {
  'use strict';
    
  $scope.members = [
    {
      firstname: 'Sanjay',
      lastname: 'Deshmukh',
      badgeno: '503338'
    },
    {
      firstname: 'Joe',
      lastname: 'McNally',
      badgeno: '501170'
    },
    {
      firstname: 'Heather',
      lastname: 'Robey',
      badgeno: '503769'
    },
    {
      firstname: 'Michael',
      lastname: 'Zoeller',
      badgeno: '502050'
    }
  ];
  
  $scope.goToMember = function(member) {
    $location.path('/' + member.badgeno);
  };
}]);
