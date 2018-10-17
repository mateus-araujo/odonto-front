import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
  openManageTranings, openManageGroups,
  openManageEmployees, openManageRoles
} from '../../../store/actions'

class Management extends Component {
  render() {
    const { permissao } = this.props.user.funcionario.cargos[0]

    return (
      <div className="Management">
        {permissao !== "Gerente" ?
          <Button color="secondary" size="sm" block onClick={() => this.props.openManageTranings()}>
            Gerenciar treinamentos
          </Button>
          : null
        }

        {permissao === "Administrador" || permissao === "Gerente" ?
          <Button color="secondary" size="sm" block onClick={() => this.props.openManageGroups()}>
            Gerenciar grupos
          </Button>
          : null
        }

        {permissao !== "Gerente" ?
          <Button color="secondary" size="sm" block onClick={() => this.props.openManageEmployees()}>
            Gerenciar funcionários
          </Button>
          : null
        }

        {permissao !== "Gerente" ?
          <Button color="secondary" size="sm" block onClick={() => this.props.openManageRoles()}>
            Gerenciar cargos
          </Button>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth

  return { user }
}

export default connect(mapStateToProps, {
  openManageTranings, openManageGroups,
  openManageEmployees, openManageRoles
})(Management)