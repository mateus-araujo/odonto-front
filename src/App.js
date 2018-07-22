import React, { Component } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}

export default App;
