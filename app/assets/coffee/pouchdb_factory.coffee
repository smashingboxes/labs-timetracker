services.factory "pouchdb", ->
  PouchDB.enableAllDbs = true
  new PouchDB("todos")
