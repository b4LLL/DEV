let express = require('express')
let request = require('request')
let querystring = require('querystring')
let app = express()

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

/*
.get is the HTTP method for which the middleware function applies
'/login'  is the route function() is the middleware function
'req'     is the request argument to the middleware function
'res'     is the response argument to the middleware function
https://expressjs.com/en/api.html#req
*/
app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      //scope: 'user-read-private user-read-email user-read-playback-state user-read-recently-played',
      scope: 'streaming user-read-birthdate user-read-email user-read-private user-read-playback-state',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

let port = process.env.PORT || 8888
console.log('Listening on port: ' + port + ' Go to: http://localhost:8888/login')
app.listen(port)