import React, {Component} from "react";
import {Breadcrumb, Spinner} from "react-bootstrap";

import {LinkBreadcrumb, SimpleBreadcrumb} from "../../../common/Breadcrumbs";
import {PROJECTS_PATH} from "../../../Projects/Projects";
import ProjectsService from "../../../../Services/rest/ProjectsService";

export default class WorkflowBreadcrumb extends Component {

  state = {
    projectName: null
  };

  componentDidMount = () => this.fetchProjectName();

  fetchProjectName = async () => {
    const {projectId} = this.props.workflow;
    try {
      const {data} = await ProjectsService.getProject(projectId);
      this.setState({
        projectName: data.name
      });
    } catch (e) {

    }
  };

  render() {
    const {name, projectId} = this.props.workflow;
    return (
      <div className="workflow-breadcrumb">
        <Breadcrumb>
          <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
          <LinkBreadcrumb to={`${PROJECTS_PATH}/${projectId}`}>
            {
              this.state.projectName ||
              <Spinner animation="grow" size="sm"/>
            }
          </LinkBreadcrumb>
          <LinkBreadcrumb to={`${PROJECTS_PATH}/${projectId}`}>Workflows</LinkBreadcrumb>
          <SimpleBreadcrumb>{name}</SimpleBreadcrumb>
        </Breadcrumb>
      </div>
    );
  }
}
