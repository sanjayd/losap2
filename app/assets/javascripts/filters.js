angular.module('losap').filter('range', function() {
  'use strict';  
  return function(input, total) {
    total = parseInt(total);
    for(var i = 0; i < total; i++) {
      input.push(i);
    }
    return input;
  };
});

angular.module('losap').filter('twoDigits', function() {
  'use strict';
  return function(input) {
    return input < 10 ? '0' + input : input;
  };
});
