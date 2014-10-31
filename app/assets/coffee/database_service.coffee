databaseFn = ->
  PouchDB.enableAllDbs = true
  new PouchDB("logs")

angular.module("timeTracker").service "database", databaseFn
