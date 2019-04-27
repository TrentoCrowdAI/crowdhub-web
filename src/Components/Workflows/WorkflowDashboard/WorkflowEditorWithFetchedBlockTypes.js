import React, {Component} from 'react';

import {makeCancellable} from "../../../Services/utils";
import BlockTypesDefinitionService from "../../../Services/BlockTypeDefinitionsService";
import WorkflowEditor from "./WorkflowEditor/WorkflowEditor";

export default class WorkflowEditorWithFetchedBlockTypes extends Component {

  pendingBlockTypesRequest;

  state = {
    blockTypeDefinitions: null,
    fetchBlockTypesError: false
  };

  componentDidMount = () => this.fetchBlockTypes();

  componentWillUnmount = () => this.pendingBlockTypesRequest.cancel();

  async fetchBlockTypes() {
    try {
      this.pendingBlockTypesRequest = makeCancellable(BlockTypesDefinitionService.getBlockTypeDefinitions());
      const blockTypeDefinitions = await this.pendingBlockTypesRequest.result;
      this.setState({
        blockTypeDefinitions,
        fetchBlockTypesError: false
      });
    } catch (e) {
      this.setState({fetchBlockTypesError: true});
    }
  }


  render() {
    return (
      <WorkflowEditor  {...this.props}
                       blockTypeDefinitions={this.state.blockTypeDefinitions}/>
    )
  }
}
