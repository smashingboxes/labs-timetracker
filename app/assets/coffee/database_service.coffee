angular
.module("timeTracker")
.service "database", ->
  localStorage.notes ?= []
  return localStorage.notes
