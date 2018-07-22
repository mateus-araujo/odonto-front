import React from 'react';
import { Button, Row, Col } from 'reactstrap';

import logo from '../logo.png';

const Header = (props) => {
  return (
    <Row className="App-header">
      <Col sm="2"></Col>
      <Col xs="9" sm="8">
        <img src={logo} className="App-logo" alt="logo" />
      </Col>
      <Col xs="3" sm="2">
        <br />
        <Button color="link" className="Logout-link">Sair</Button>
      </Col>
    </Row>
  );
}

export default Header;