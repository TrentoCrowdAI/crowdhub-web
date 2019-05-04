import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";

import {makeCancellable} from "../../../../Services/rest/utils";
import BlockTypesDefinitionService from "../../../../Services/rest/BlockTypeDefinitionsService";
import WorkflowEditor from "./WorkflowEditor";
import "./WorkflowEditorContainer.css";

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
    // TODO: Handle error
    if (this.state.fetchingBlockTypeDefinitions || !this.props.runnableWorkflow) {
      return <LoadingWorkflowEditor/>
    } else {
      return <WorkflowEditor  {...this.props} blockTypeDefinitions={this.state.blockTypeDefinitions}/>
    }
  }
}

const LoadingWorkflowEditor = () => (
  <div className="loading-spinner-container">
    <Spinner animation="border" variant="primary"/>
  </div>
);
