import React, { Component } from 'react';
import './App.css';

import queryString from 'query-string';



let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;

fetch('https://api.spotify.com/v1/me', 
  {headers:{'Authorization': 'Bearer ' + accessToken}})
  .then(response => response.json())
  .then(data => console.log(data))
// we use fetch to go to the API endpoint
localStorage.setItem('token',accessToken);
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {accessToken}       
          </p>
        </header>
      </div>
    );
  }
}

export default App;
