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

angular.module('losap').service('CurrentMember', [function() {
  this.currentMember = undefined;
  
  this.set = function(member) {
    this.currentMember = member;
  };
  
  this.get = function() {
    return this.currentMember;
  };
  
  this.clear = function() {
    this.currentMember = undefined;
  };
}]);

angular.module('losap').service('StationTimeService', ['$resource', function($resource) {
  'use strict';
  
  return $resource('/station_times', {}, {
    findByMonth: {
      method: 'GET',
      isArray: true
    },
    delete: {
      url: '/station_times/:id',
      method: 'PUT',
      isArray: false
    },
    addStandby: {
      url: '/standbys',
      method: 'POST',
      isArray: false
    }
  });
}]);
