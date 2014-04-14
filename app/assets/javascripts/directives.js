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
