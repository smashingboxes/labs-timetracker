window.WebFontConfig = 
    google:
        families: ['Raleway', 'Ubuntu']
 
    # active: () -> 
 
s = document.createElement 'script'
s.src = "#{if document.location.protocol is 'https:' then 'https' else 'http'}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
s.type = 'text/javascript'
s.async = 'true'
 
s0 = (document.getElementsByTagName 'script')[0]
s0.parentNode.insertBefore s, s0

