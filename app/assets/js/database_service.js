(function() {
  var databaseFn;

  databaseFn = function() {
    PouchDB.enableAllDbs = true;
    return new PouchDB("logs");
  };

  angular.module("timeTracker").service("database", databaseFn);

}).call(this);
