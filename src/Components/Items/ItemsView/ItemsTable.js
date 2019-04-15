import React, {Component} from 'react';
import {Col, Row, Table} from "react-bootstrap";

import './ItemsTable.css';

export class ItemsTable extends Component {


  static getColumnNames = (items) => {
    const columnNames = {};
    items
      .map(item => item.data)
      .map(Object.keys)
      .forEach(key => columnNames[key] = true);
    return Object.keys(columnNames);
  };

  render() {
    const items = this.props.items;
    const columnNames = ItemsTable.getColumnNames(items);

    return (
      <Row>
        <Col>
          <Table striped bordered hover className="items-table">
            <thead>
            <tr>
              <th>id</th>
              {
                columnNames.map(name => (
                  <th key={name}>{name}</th>
                ))
              }
            </tr>
            </thead>
            <tbody>
            {
              items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {
                    columnNames.map(key => (
                      <td key={`${item.id}-${key}`}>{item.data[key] || ''}</td>
                    ))
                  }
                </tr>
              ))
            }
            </tbody>
          </Table>
        </Col>
      </Row>

    );
  }

}
