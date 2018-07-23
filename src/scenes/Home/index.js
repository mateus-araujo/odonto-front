import React, { Component } from 'react';
import Header from '../../components/Header';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <h1>Você está logado!</h1>
      </div>
    );
  }
}

export default Home;