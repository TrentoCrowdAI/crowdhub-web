import React, {Component} from 'react';
import {makeCancellable} from "../../../../Services/utils";
import BlockTypesService from "../../../../Services/BlockTypesService";
import {Button} from "react-bootstrap";

export default class DraggableBlockTypeListSidebar extends Component {

  pendingBlockTypesRequest = null;

  state = {
    blockTypes: null,
    fetchError: false
  };

  componentDidMount = () => this.fetchBlockTypes();

  componentWillUnmount = () => this.pendingBlockTypesRequest.cancel();

  async fetchBlockTypes() {
    try {
      this.pendingBlockTypesRequest = makeCancellable(BlockTypesService.getBlockTypes());
      const blockTypes = await this.pendingBlockTypesRequest.result;
      this.setState({
        blockTypes,
        fetchError: false
      });
    } catch (e) {
      this.setState({fetchError: true});
    }
  }


  render() {
    return (
      <div>
        <h5>Workflow blocks</h5>

        {
          !this.state.blockTypes && !this.state.fetchError &&
          <FetchingBlockTypes/>
        }

        {
          this.state.fetchError &&
          <FetchBlockTypesError/>
        }

        {
          this.state.blockTypes && this.state.blockTypes.map(blockType => (
            <Button
              key={blockType.id}
              className="btn-block"
              style={{backgroundColor: blockType.data.nodeDefinition.color}}
              draggable={true}
              onDragStart={event => event.dataTransfer.setData('blockType', JSON.stringify(blockType))}>
              {blockType.data.nodeDefinition.name}
            </Button>
          ))
        }
      </div>
    );
  }
}

const FetchingBlockTypes = () => <p>Loading...</p>;

const FetchBlockTypesError = () => <p>Can't fetch BlockTypes, try to refresh the page</p>;
