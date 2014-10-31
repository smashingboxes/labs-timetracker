class Database
  constructor: ->
    @retrieve()

  add: (obj) ->
    @storage.push(obj)
    @save()
    @storage

  remove: (obj) ->
    index = @storage.indexOf(item);
    @storage.splice(index, 1);
    @save()
    @storage

  save: ->
    localStorage.storage = JSON.stringify(@storage)

  retrieve: ->
    localStorage.storage = JSON.stringify([]) unless localStorage.storage
    @storage = JSON.parse(localStorage.storage)

angular
.module("timeTracker")
.service "database", Database
