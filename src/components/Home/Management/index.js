import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { 
  openManageTranings, openManageGroups,
  openManageEmployees, openManageRoles
} from '../../../store/actions'

class Management extends Component {
  render() {
    return (
      <div className="Management">
        <Button color="secondary" size="sm" block onClick={() => this.props.openManageTranings()}>
          Gerenciar treinamentos
        </Button>

        <Button color="secondary" size="sm" block onClick={() => this.props.openManageGroups()}>
          Gerenciar grupos
        </Button>

        <Button color="secondary" size="sm" block onClick={() => this.props.openManageEmployees()}>
          Gerenciar funcionários
        </Button>

        <Button color="secondary" size="sm" block onClick={() => this.props.openManageRoles()}>
          Gerenciar cargos
        </Button>
      </div>
    )
  }
}

export default connect(null, {
  openManageTranings, openManageGroups,
  openManageEmployees, openManageRoles
})(Management)