import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";

import {ItemsImporter} from "./ItemsImporter";
import {ItemsTable} from "./ItemsTable";
import ItemsService from "../../../Services/ItemsService";
import {makeCancellable} from "../../../Services/utils";

export class ItemsView extends Component {

  state = {};

  componentDidMount = () => this.fetchItems();

  componentWillUnmount = () => this.pendingItemsRequest.cancel();

  fetchItems = async () => {
    try {
      const project = this.props.project;
      this.pendingItemsRequest = makeCancellable(ItemsService.getItemsOfProject(project));
      const items = await this.pendingItemsRequest.result;

      this.setState({items});
    } catch (e) {
      this.setState({
        items: null,
        fetchError: true
      });
    }
  };

  onItemDeleted = (item) => {
    const index = this.state.items.indexOf(item);
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({items});
  };

  render() {
    const project = this.props.project;
    return (
      <div>
        {/* Add items */}
        <ItemsImporter project={project} onItemsImported={this.fetchItems}/>

        {/* View uploaded items */}
        <Container>
          <Row className="header-row">
            <Col>
              <h3>Uploaded Items</h3>
            </Col>
          </Row>
        </Container>

        <Container className="items-table-container">
          {
            !this.state.items &&
            <FetchingItems/>
          }

          {
            this.state.items &&
            <ItemsTable items={this.state.items} onItemDeleted={this.onItemDeleted}/>
          }
        </Container>
      </div>
    )
  }
}

const FetchingItems = () => (
  <Container><p>Loading items ...</p></Container>
);
