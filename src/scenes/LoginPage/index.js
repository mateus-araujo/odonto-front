import React, { Component } from 'react';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
import Footer from '../../components/Footer';

class LoginPage extends Component {
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

export default LoginPage;