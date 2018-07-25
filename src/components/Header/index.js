import React, { Component} from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/actions'

import logo from './logo.png'
import './styles.css'

class Header extends Component {
  onLogout = () => {
    this.props.logoutUser()
  }
  render () {
    return (
      <div className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <Button onClick={this.onLogout} color="link" className="Logout-link">
            Sair
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(null, { logoutUser })(Header)