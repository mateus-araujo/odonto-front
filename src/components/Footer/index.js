import React from 'react';
import { Button } from 'reactstrap';

import './styles.css';

const Footer = (props) => {
  return (
    <div className="App-footer">
      <Button color="link" className="Footer-link">Desenvolvido por MasterSoftware</Button> 
      |
      <Button color="link" className="Footer-link">Contato: protmastersoftware@gmail.com</Button>
    </div>
  );
}

export default Footer;