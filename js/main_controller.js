var mainControllerFn = function($scope, $timeout, database){
  $scope.logs = [{text: 'nuthin!'}];

  $scope.sync = function(){
    database.allDocs({include_docs: true}, function(err, response) {
      $scope.logs = response.rows;
      $scope.$apply();
    });
  };

  $scope.input = {
    text : '',
    every : 1,
    tracking : false
  };

  $scope.createLog = function(){
    database
      .post({_id: new Date().toISOString(),
             text: $scope.input.text})
      .then(function(response) {
        $scope.sync()
      ;});
    $scope.input.text = '';
  };

  $scope.destroyLog = function(log) {
    database.remove(log.doc._id,
                    log.doc._rev,
                    {},
                    function(err, response) { $scope.sync(); });
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

  $scope.sync()
};

var mainController = angular
                     .module('timeTracker')
                     .controller('mainController',
                       ['$scope',
                        '$timeout',
                        'database',
                        mainControllerFn]);
