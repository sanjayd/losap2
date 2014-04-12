angular.module('losap', ['ngRoute']);

angular.module('losap').config(['$routeProvider', function($routeProvider) {
  'use strict';
  $routeProvider.when('/', {
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeController'
  });
}]);

angular.module('losap').controller('WelcomeController', ['$scope', function($scope) {
  'use strict';
  
}]);
