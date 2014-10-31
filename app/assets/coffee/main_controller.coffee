mainControllerFn = ($scope, $timeout, database) ->
  $scope.search =
    include_docs: true
    descending: true
    limit: 15
    skip: 0
    page: 0
    total_pages: 0 #This is for our use.

  $scope.input =
    text: ""
    every: 20
    tracking: true

  $scope.page = (direction) ->
    $scope.search.skip = ($scope.search.page * $scope.search.limit)
    if direction is "up"
      $scope.search.page += 1
      $scope.search.skip += $scope.search.limit
    else
      $scope.search.page -= 1
      $scope.search.skip -= $scope.search.limit
    0

  $scope.$watch "search", (->
    $scope.sync()
    return
  ), true
  $scope.sync = ->
    database.save()

  $scope.createLog = ->
    database.add(
      _id: new Date().toISOString()
      text: $scope.input.text
    )
    debugger
    $scope.input.text = ""

  $scope.destroyLog = (log) ->
    database.remove(log)

  $scope.setReminder = ->
    if $scope.input.tracking
      $timeout.cancel $scope.reminder  unless not $scope.reminder
      $scope.reminder = $timeout($scope.remind, $scope.input.every * 60000)
    return

  $scope.remind = ->
    $scope.input.text = prompt("Hey- it looks like you havent checked in for a while. Mind telling me what you're doing?")
    $scope.createLog()
    $scope.setReminder()
    return

  $scope.setReminder()
  $scope.sync()
  return

mainController = angular.module("timeTracker").controller("mainController", [
  "$scope"
  "$timeout"
  "database"
  mainControllerFn
])