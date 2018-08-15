import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
// import { FaFileArchive } from 'react-icons/fa'
// import classNames from 'classnames/bind';
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class Trainings extends Component {
  state = {
    list: [
      { id: '1', titulo: 'Treinamento 1', nota_situacao: null, open: true },
      { id: '2', titulo: 'Treinamento 2', nota_situacao: '9.0', open: false },
      { id: '3', titulo: 'Treinamento 3', nota_situacao: '8.0', open: false },
      { id: '4', titulo: 'Treinamento 4', nota_situacao: 'Reprovado', open: false },
      { id: '5', titulo: 'Treinamento 5', nota_situacao: '7.5', open: false },
    ]
  }

  render() {
    // const { list } = this.state
    return (
      <div className="List">
        <Table size="sm" striped bordered responsive>
          <thead>
            <tr>
              <th>Treinamentos</th>
              <th className="Col-Button"></th>
              <th className="Col-Button"></th>
              <th className="Col-Note">Nota/Situação</th>
            </tr>
          </thead>
          <tbody className="Scrollable-Table">
            {this.state.list.map(training =>
              <tr key={training.id}>
                <td>{training.titulo}</td>
                <td className="Col-Button">
                  <Button size="sm" color="info" disabled={!training.open}>Assistir aula</Button>
                </td>
                <td className="Col-Button">
                  <Button size="sm" color="success" disabled={!training.open}>Fazer a prova</Button>
                </td>
                <td className="Col-Note">
                  {
                    training.nota_situacao ?
                      training.nota_situacao
                      : '-'
                  }</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default Trainings