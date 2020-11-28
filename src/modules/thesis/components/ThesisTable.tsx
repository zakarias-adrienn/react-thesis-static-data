import React from 'react'
import { Table, Button } from 'semantic-ui-react'

class ThesisTable extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    if (this.props.view=="hallgató") {
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Téma címe</Table.HeaderCell>
              <Table.HeaderCell>Technológiák, nyelvek</Table.HeaderCell>
              <Table.HeaderCell>Félév</Table.HeaderCell>
              <Table.HeaderCell>Témevezető neve</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><a href="">Oktatási csomag</a></Table.Cell>
              <Table.Cell>Typescript, React</Table.Cell>
              <Table.Cell>2020/21 tavasz</Table.Cell>
              <Table.Cell>Visnovitz Márton</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else {
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Téma címe</Table.HeaderCell>
              <Table.HeaderCell>Technológiák, nyelvek</Table.HeaderCell>
              <Table.HeaderCell>Félév</Table.HeaderCell>
              <Table.HeaderCell>Műveletek</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><a href="">Oktatási csomag</a></Table.Cell>
              <Table.Cell>Typescript, React</Table.Cell>
              <Table.Cell>2020/21 tavasz</Table.Cell>
              <Table.Cell>
              <Button basic color='red'>
                  Törlés
              </Button>
              <Button basic color='blue'>
                  Szerkesztés
              </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }
  }
} 

export default ThesisTable;