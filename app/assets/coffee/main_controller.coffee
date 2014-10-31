class MainController
  constructor: ($timeout, database) ->
    @$watch "search", (->
    @sync()
    return
  ), true
    @setReminder()
    @sync()

  search:
    include_docs: true
    descending: true
    limit: 15
    skip: 0
    page: 0
    total_pages: 0 #This is for our use.

  input:
    text: ""
    every: 20
    tracking: true

  page: (direction) ->
    @search.skip = (@search.page * @search.limit)
    if direction is "up"
      @search.page += 1
      @search.skip += @search.limit
    else
      @search.page -= 1
      @search.skip -= @search.limit
    0

  sync: ->
    database.query (map = (doc) ->
      emit [doc._id]
      return
    ), @search, (err, response) ->
      pages = Math.floor((response.total_rows - 1) / @search.limit) + 1
      @search.total_pages = pages
      @logs = response.rows
      @$apply()
      return

  createLog: ->
    database.post(
      _id: new Date().toISOString()
      text: @input.text
    ).then @sync
    @input.text = ""
    return

  destroyLog: (log) ->
    database.remove log.doc._id, log.doc._rev, {}, @sync
    return

  setReminder: ->
    if @input.tracking
      $timeout.cancel @reminder  unless not @reminder
      @reminder = $timeout(@remind, @input.every * 60000)
    return

  remind: ->
    @input.text = prompt("Hey- it looks like you havent checked in for a while. Mind telling me what you're doing?")
    @createLog()
    @setReminder()
    return

angular.module("timeTracker").controller("mainController", [
  "$scope"
  "$timeout"
  "database"
  MainController
])