var mainControllerFn = function($scope, $timeout, database){
  $scope.logs = [{text: 'nuthin!'}];

  $scope.refresh = function(){
    database.allDocs({}, function(err, response) {
      $scope.logs = response.rows;
    });
  };

  database.changes().on('change', function(change) {
    $scope.refresh();
  });

  $scope.input = {
    text : '',
    every : 1,
    tracking : false
  };

  $scope.createLog = function(){
    database.post({text: $scope.input.text})
      .then(function(response) {
        console.log(response);
      });
    $scope.input.text = '';
  };

  $scope.destroyLog = function(log) {
    alert('not implemented. Ps: Alerts are awesome. ' + log.text);
  }

  $scope.setReminder = function() {
    if ($scope.input.tracking) {
      $timeout($scope.remind, $scope.input.every * 60000 );
    };
  }

  $scope.remind = function(){
    $scope.input.text = prompt('Hey- it looks like you havent checked in for a while. Mind telling me what you\'re doing?');
    $scope.createLog();
  };
};

var mainController = angular
                     .module('timeTracker')
                     .controller('mainController',
                       ['$scope',
                        '$timeout',
                        'database',
                        mainControllerFn]);
