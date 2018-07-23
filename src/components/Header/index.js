import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from './logo.png';
import './styles.css'

const Header = (props) => {
  return (
    <div className="App-header">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div>
        <Button color="link" className="Logout-link">
          <Link to="/">Sair</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;