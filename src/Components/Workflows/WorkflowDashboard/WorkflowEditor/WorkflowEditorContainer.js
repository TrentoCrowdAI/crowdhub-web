import React, {Component} from 'react';

import {makeCancellable} from "../../../../Services/rest/utils";
import BlockTypesDefinitionService from "../../../../Services/rest/BlockTypeDefinitionsService";
import WorkflowEditor from "./WorkflowEditor";
import "./WorkflowEditorContainer.css";
import LoadingContainer from "../../../common/LoadingContainer";

export default class WorkflowEditorContainer extends Component {

  blockTypesRequest;

  state = {
    blockTypeDefinitions: null,
    fetchingBlockTypeDefinitions: false,
    fetchBlockTypesError: false
  };

  componentDidMount = () => this.fetchBlockTypes();

  componentWillUnmount = () => this.blockTypesRequest.cancel();

  async fetchBlockTypes() {
    this.setState({fetchingBlockTypeDefinitions: true});
    try {
      this.blockTypesRequest = makeCancellable(BlockTypesDefinitionService.getBlockTypeDefinitions());
      const blockTypeDefinitions = await this.blockTypesRequest.result;
      this.setState({
        blockTypeDefinitions,
        fetchingBlockTypeDefinitions: false,
        fetchBlockTypesError: false
      });
    } catch (e) {
      this.setState({
        fetchingBlockTypeDefinitions: false,
        fetchBlockTypesError: true
      });
    }
  }


  render() {
    return (
      <LoadingContainer loading={this.state.fetchingBlockTypeDefinitions || !this.props.runnableWorkflow}>
        <WorkflowEditor  {...this.props} blockTypeDefinitions={this.state.blockTypeDefinitions}/>
      </LoadingContainer>
    )
  }
}

