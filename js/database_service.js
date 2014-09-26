var databaseFn = function() {
  PouchDB.enableAllDbs = true;
  return new PouchDB('logs');
}

angular.module('timeTracker').service('database', databaseFn);