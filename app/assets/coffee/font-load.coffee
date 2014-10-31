WebFontConfig = google:
  families: [
    "Raleway:100,600"
    "Ubuntu:400,700"
  ]

(->
  wf = document.createElement("script")
  wf.src = ((if "https:" is document.location.protocol then "https" else "http")) + "://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"
  wf.type = "text/javascript"
  wf.async = "true"
  s = document.getElementsByTagName("script")[0]
  s.parentNode.insertBefore wf, s
  return
)()

$(document).on "load", ->
  webfonts()

