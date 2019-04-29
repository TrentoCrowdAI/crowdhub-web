import React, {Component} from 'react';
import {Col, Modal, Row, Table} from "react-bootstrap";

import './ItemsTable.css';
import {DeleteButtonAndModal} from "../../common/DeleteButtonAndModal";
import ItemsService from "../../../Services/ItemsService";

export class ItemsTable extends Component {


  static getColumnNames = (items) => {
    const columnNames = {};
    items
      .map(item => item.data)
      .map(Object.keys)
      .forEach(itemKeys => itemKeys.forEach(key => columnNames[key] = true));
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
              <th>Id</th>

              {
                columnNames.map(name => (
                  <th key={name}>{name}</th>
                ))
              }

              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  {
                    /* values */
                    columnNames.map(key => (
                      <td key={`${item.id}-${key}`}>{item.data[key] || ''}</td>
                    ))
                  }

                  <td>
                    <DeleteItemButton item={item} onDeleted={() => this.props.onItemDeleted(item)}/>
                  </td>
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

const DeleteItemButton = ({item, onDeleted}) => (
  <DeleteButtonAndModal
    onDeleted={onDeleted}
    serviceCall={() => ItemsService.deleteItem(item)}

    header={
      <Modal.Title>Delete item <span className="project-id">#{item.id}</span></Modal.Title>
    }

    body={
      <div className="delete-item-table-container">
        Are you sure you want to following item?

        <Table striped bordered hover className="delete-item-table">
          <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>

          {/* Id */}
          <tr>
            <td>Id</td>
            <td>item.id</td>
          </tr>

          {/* Data */}
          {
            Object.keys(item.data).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{item.data[key]}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </div>
    }
  />
);
