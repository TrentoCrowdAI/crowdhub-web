import React, {Component} from 'react';
import WorkflowEditor from "./WorkflowEditor/WorkflowEditor";
import {makeCancellable} from "../../../Services/utils";
import ProjectsService from "../../../Services/ProjectsService";

export default class WorkflowDashboard extends Component {


  state = {
    blockTypes: null,
    workflow: {}
  };

  componentDidMount = () => this.fetchWorkflow();

  componentWillUnmount = () => this.pendingWorkflowRequest.cancel();

  async fetchWorkflow() {
    const id = this.props.match.params.id;

    try {
      this.pendingWorkflowRequest = makeCancellable(ProjectsService.getProject(id));
      const project = await this.pendingWorkflowRequest.result;

      this.setState({project});
    } catch (e) {
      // TODO: redirectToProjectsList(this);
    }
  }

  onWorkflowEdited = (workflow) => this.setState({workflow});

  render() {
    return <WorkflowEditor workflow={this.state.workflow}
                           onWorkflowEdited={this.onWorkflowEdited}/>;
  }
}
