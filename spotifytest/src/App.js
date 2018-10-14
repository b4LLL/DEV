import React, { Component } from 'react';
import queryString from 'query-string';
//import { stringify } from 'querystring';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: ''
    }
  }  

  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    fetch('https://api.spotify.com/v1/me/player/devices', 
      {headers:{'Authorization': 'Bearer ' + accessToken}})
      .then(response => response.json())
      .then(data => console.log(data))
    //localStorage.setItem('token',accessToken);
    this.setState({token: accessToken});
  }
  render() {
    return (
        <span> Token is now : {this.state.token}</span>
    );
  }
}

export default App;
