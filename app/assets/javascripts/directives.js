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

angular.module('losap').directive('lpDatetimeInput', function() {
  'use strict';
  
  return {
    restrict: 'E',
    replace: true,
    scope: {
      date: '=',
      hour: '=',
      minute: '='
    },
    templateUrl: 'partials/datetime-input.html',
    link: function(scope, element, attrs) {
      scope.modelName = attrs.model;
      scope.label = attrs.label;    
    }
  };
});

angular.module('losap').directive('lpStandbyTimes', function() {
  'use strict';
  
  return {
    restrict: 'E',
    scope: {
      startTime: '=',
      endTime: '='
    },
    templateUrl: 'partials/standby-times.html',
    link: function(scope, element, attrs) {
      scope.startDate = moment().startOf('day').toDate();
      scope.startHours = 7;
      scope.startMinutes = 0;
      scope.endDate = moment().startOf('day').toDate();
      scope.endHours= 7;
      scope.endMinutes = 0;
      
      scope.$watch('startDate', function(newValue, oldValue) {
        scope.endDate = newValue;
      }, true);
      
      scope.$watch('[startDate, startHours, startMinutes]', function() {
        scope.startTime = moment(scope.startDate).startOf('day').hours(scope.startHours).minutes(scope.startMinutes).toDate();
      }, true);
      
      scope.$watch('[endDate, endHours, endMinutes]', function() {
        scope.endTime = moment(scope.endDate).startOf('day').hours(scope.endHours).minutes(scope.endMinutes).toDate();
      }, true);
    }
  };
});
