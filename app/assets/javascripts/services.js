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

angular.module('losap').service('StationTimeService', ['$resource', function($resource) {
  'use strict';
  
  return $resource('/station_times', {}, {
    findByMonth: {
      method: 'GET',
      isArray: true
    },
    totals: {
      url: '/station_times/totals',
      method: 'GET',
      isArray: false
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
    },
    addSleepin: {
      url: '/sleep_ins',
      method: 'POST',
      isArray: false
    }
  });
}]);
