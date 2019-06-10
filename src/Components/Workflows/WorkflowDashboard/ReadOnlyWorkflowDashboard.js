import React, {Component} from 'react';

import WorkflowEditorContainer from "./WorkflowEditor/WorkflowEditorContainer";
import RunnableWorkflowService from "../../../Services/RunnableWorkflowService/RunnableWorkflowService";
import {redirectToProjectsList} from "../../Projects/utils/route";
import {makeCancellable} from "../../../Services/rest/utils";
import PublicWorkflowsService from "../../../Services/rest/PublicWorkflowsService";
import Runs from "../../../Services/RunnableWorkflowService/models/Runs";

export default class ReadOnlyWorkflowDashboard extends Component {

  runnableWorkflowRequest;

  state = {
    runnableWorkflow: null
  };

  constructor (props) {
    super(props);
    this.initializeRunnableWorkflowService();
  }

  initializeRunnableWorkflowService () {
    RunnableWorkflowService.WorkflowsService = PublicWorkflowsService;
    // currently we don't support the view of runs when the workflow is viewed in public mode
    RunnableWorkflowService.RunsService = {
      getRunsOfWorkflow: () => new Runs([])
    };
  }

  componentDidMount = async () => {
    try {
      const runnableWorkflow = await this.fetchRunnableWorkflow();
      RunnableWorkflowService.startWatchingRunsStatus(runnableWorkflow);
    } catch (e) {
      console.error(e);
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

  getWorkflow = () => this.state.runnableWorkflow.getWorkflow();

  render() {
    const {runnableWorkflow} = this.state;
    return <WorkflowEditorContainer
      runnableWorkflow={runnableWorkflow}
      onWorkflowEdited={this.onWorkflowEdited}
      readOnly/>;
  }
}
