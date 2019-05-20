import React, {Component} from 'react';

import {makeCancellable} from "../../../Services/rest/utils";
import WorkflowsService from "../../../Services/rest/WorkflowsService";
import WorkflowEditorContainer from "./WorkflowEditor/WorkflowEditorContainer";
import RunnableWorkflowService from "../../../Services/RunnableWorkflowService/RunnableWorkflowService";
import {redirectToProjectsList} from "../../Projects/utils/route";

/**
 * This component shows the WorkflowEditor and loads/save the workflow
 */
export default class WorkflowDashboard extends Component {

  runnableWorkflowRequest;

  state = {
    runnableWorkflow: null,
    isSaving: false,
    saveError: false,
  };

  componentDidMount = async () => {
    try {
      const runnableWorkflow = await this.fetchRunnableWorkflow();
      RunnableWorkflowService.startWatchingRunsStatus(runnableWorkflow);
    } catch (e) {
      redirectToProjectsList(this);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.getWorkflowIdFromUrl() !== this.getWorkflowIdFromSpecifiedProps(prevProps)) {
      this.componentWillUnmount();
      this.componentDidMount();
    }
  }

  async fetchRunnableWorkflow() {
    const id = this.getWorkflowIdFromUrl();
    this.setState({runnableWorkflow: null});
    this.runnableWorkflowRequest = makeCancellable(RunnableWorkflowService.getRunnableWorkflow(id));
    const runnableWorkflow = await this.runnableWorkflowRequest.result;
    this.setState({runnableWorkflow});
    return runnableWorkflow;
  }

  getWorkflowIdFromUrl = () => this.getWorkflowIdFromSpecifiedProps(this.props);

  getWorkflowIdFromSpecifiedProps = (props) => props.match.params.id;

  componentWillUnmount = () => {
    this.runnableWorkflowRequest.cancel();
    RunnableWorkflowService.stopWatchRunsStatus();
  };

  onWorkflowEdited = (workflow) => {
    this.setWorkflow(workflow);
    this.forceUpdate(); // the state itself isn't changed, but the content of the workflowWithRuns yes
  };

  setWorkflow = (workflow) => this.state.runnableWorkflow.setWorkflow(workflow);

  onSave = async () => {
    this.setState({isSaving: true});
    try {
      const workflow = this.getWorkflow();
      await WorkflowsService.updateWorkflow(workflow);
    } catch (e) {
      this.setState({saveError: true});
    }
    this.setState({isSaving: false});
  };

  getWorkflow = () => this.state.runnableWorkflow.getWorkflow();

  render() {
    const {runnableWorkflow, isSaving, saveError} = this.state;
    return <WorkflowEditorContainer
      runnableWorkflow={runnableWorkflow}
      onWorkflowEdited={this.onWorkflowEdited}
      onSave={this.onSave}
      isSaving={isSaving}
      saveError={saveError}/>;
  }
}
