import React, {Component} from 'react';
import WorkflowEditor from "./WorkflowEditor/WorkflowEditor";
import {makeCancellable} from "../../../Services/utils";
import WorkflowsService from "../../../Services/WorkflowsService";

export default class EditWorkflowPage extends Component {


  state = {
    blockTypes: null,
    workflow: null,
    isSaving: false
  };

  componentDidMount = () => this.fetchWorkflow();

  componentWillUnmount = () => this.pendingWorkflowRequest.cancel();

  async fetchWorkflow() {
    const id = this.props.match.params.id;

    try {
      this.pendingWorkflowRequest = makeCancellable(WorkflowsService.getWorkflow(id));
      const workflow = await this.pendingWorkflowRequest.result;

      this.setState({workflow});
    } catch (e) {
      // TODO: redirectToProjectsList(this);
    }
  }

  onWorkflowEdited = (workflow) => this.setState({workflow});

  onSave = async () => {
    this.setState({isSaving: true});
    try {
      await WorkflowsService.updateWorkflow(this.state.workflow)
    } catch (e) {
      alert(e);
      // TODO: Hanle
    }
    this.setState({isSaving: false});
  };

  render() {
    return <WorkflowEditor workflow={this.state.workflow}
                           onWorkflowEdited={this.onWorkflowEdited}
                           onSavePressed={this.onSave}
                           isSaving={this.state.isSaving}/>;
  }
}
