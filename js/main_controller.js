var mainControllerFn = function ($scope, $timeout, database) {

    $scope.search = {
      include_docs: true,
      descending: true,
      limit: 10,
      skip: 0,
      page: 0 //This is for our use.
    };

    $scope.page = function (direction) {
      $scope.search.skip = ($scope.search.page * $scope.search.limit)
      if (direction === 'up') {
        $scope.search.page += 1;
        $scope.search.skip += $scope.search.limit;
      } else {
        $scope.search.page -= 1;
        $scope.search.skip -= $scope.search.limit;
      };
      return 0;
    }

    $scope.$watch('search', function () {
      $scope.sync();
    }, true);

    $scope.sync = function () {

      database.query(function map(doc) {
        emit([doc._id]);
      }, $scope.search, function (err, response) {
        $scope.logs = response.rows;
        $scope.$apply();
      });
    };

    $scope.input = {
      text: '',
      every: 15,
      tracking: true
    };

    $scope.createLog = function () {
      database.post({
        _id: new Date().toISOString(),
        text: $scope.input.text
      }).then($scope.sync);

      $scope.input.text = '';
    };

    $scope.destroyLog = function (log) {
      database.remove(log.doc._id, log.doc._rev, {}, $scope.sync);
    };

    $scope.setReminder = function () {
      if ($scope.input.tracking) {
        $timeout($scope.remind, $scope.input.every * 60000);
      }
    };

    $scope.remind = function () {
      $scope.input.text = prompt('Hey- it looks like you havent checked in for a while. Mind telling me what you\'re doing?');
      $scope.createLog();
      $scope.setReminder();
    };

    $scope.sync();
  };

var mainController = angular.module('timeTracker').controller('mainController', ['$scope', '$timeout', 'database', mainControllerFn]);