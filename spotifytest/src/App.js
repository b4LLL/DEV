import React, { Component } from 'react';
import './App.css';

import queryString from 'query-string';

let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;

console.log(`parsed: ${accessToken}`); //for printing variables inline use ``

/*fetch(url, options).then(function(response)){
  //handle HTTP response
}, function(error) {

};
*/
fetch('https://api.spotify.com/v1/me/player/recently-played', 
  {headers:{'Authorization': 'Bearer ' + accessToken}})
  .then(response => response.json())
  .then(data => console.log(data))
// we use fetch to go to the API endpoint

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>

          </p>
        </header>
      </div>

    );
  }
}

export default App;
