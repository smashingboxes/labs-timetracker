var databaseFn = function() {
  PouchDB.enableAllDbs = true;
  return new PouchDB('todos');
}

angular.module('timeTracker').service('database', databaseFn);