services.factory('pouchdb', function() {
  PouchDB.enableAllDbs = true;
  return new PouchDB('todos');
});