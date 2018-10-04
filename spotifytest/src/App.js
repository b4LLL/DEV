import React, { Component } from 'react';
import './App.css';

class spotifyInit extends Component {
  render() {
    return (
      <h1>Oh</h1>
    );
  }
}


class App extends Component {
  render() {
    let green = {color: 'green'}
    return (
      <h1 className="App" style={{color:green}}>
        OkGo {this.props.name}
      </h1>
    );
  }
}

export default App;