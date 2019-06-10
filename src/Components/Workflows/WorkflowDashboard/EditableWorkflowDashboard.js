import React from 'react';

import WorkflowsService from "../../../Services/rest/WorkflowsService";
import WorkflowEditorContainer from "./WorkflowEditor/WorkflowEditorContainer";
import ReadOnlyWorkflowDashboard from "./ReadOnlyWorkflowDashboard";
import RunnableWorkflowService from "../../../Services/RunnableWorkflowService/RunnableWorkflowService";
import RunsService from "../../../Services/rest/RunsService";

/**
 * This component shows the WorkflowEditor and loads/save the workflow
 */
export default class EditableWorkflowDashboard extends ReadOnlyWorkflowDashboard {

  constructor(props) {
    super(props);
    this.state.isSaving = false;
    this.state.saveError = false;
    this.initializeRunnableWorkflowService();
  }

  initializeRunnableWorkflowService () {
    RunnableWorkflowService.WorkflowsService = WorkflowsService;
    RunnableWorkflowService.RunsService = RunsService;
  }

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
