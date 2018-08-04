import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/actions'

import logo from './logo.png'
import './styles.css'

class Header extends Component {
  onLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const { name } = this.props.user
    console.log(name)
    return (
      <div className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {name ?
          <div>
            <h6 className="User-greeting">Olá, {name}</h6>
            <Button onClick={this.onLogout} color="link" style={{ padding: 0 }} className="Logout-link">
              Sair
            </Button>
          </div>
          :
          <Link to="/login">
            <Button color="link" style={{ padding: 0 }} className="Logout-link">
              Login
            </Button>
          </Link>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth

  return { user }
}

export default connect(mapStateToProps, { logoutUser })(Header)