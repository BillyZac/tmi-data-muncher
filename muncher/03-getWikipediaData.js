var fetch = require('./utilities/fetch')
var fs = require('fs')

var url = 'https://en.wikipedia.org/wiki/European_robin'

var promise = fetch(url)

promise
  .then(function(response) {
    console.log(response)
    fs.writeFile('wikiStuff.json', JSON.stringify(response))
  })
