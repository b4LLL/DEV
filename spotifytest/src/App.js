import React, { Component } from 'react';
import queryString from 'query-string';

//
//  Use this App as the content loader -> 
//  user playlists, community playlists etc
//      
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
    this.setState({token: accessToken}); //works
    localStorage.setItem('token', accessToken);
  }
  render() {
    return (<p>root</p>)
  }
}

export default App;
