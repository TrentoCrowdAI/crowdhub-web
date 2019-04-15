import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import {ItemsImporter} from "./ItemsImporter";
import {ItemsTable} from "./ItemsTable";
import ItemsService from "../../../Services/ItemsService";
import {makeCancellable} from "../../../Services/utils";

export class ItemsView extends Component {

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

  state = {};

  render() {
    const project = this.props.project;
    return (
      <div>
        {/* Add items */}
        <ItemsImporter project={project}/>

        {/* View uploaded items */}
        <Container>
          <h3>Uploaded Items</h3>
          {
            !this.state.items &&
            <FetchingItems/>
          }

          {
            this.state.items &&
            <ItemsTable items={this.state.items}/>
          }
        </Container>
      </div>
    )
  }
}

const FetchingItems = () => (
  <Container><p>Loading items ...</p></Container>
);
