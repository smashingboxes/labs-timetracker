angular.module("timeTracker").factory "pouchdb", ->
  PouchDB.enableAllDbs = true
  new PouchDB("todos")
