import React, {Component} from 'react';
import {Alert, Breadcrumb, Col, Container, Row} from "react-bootstrap";

import ProjectsService from "../../../Services/ProjectsService";
import ProjectForm from "../ProjectForm/ProjectForm";
import {PROJECTS_PATH} from "../Projects";
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../common/Breadcrumbs";

export default class CreateProject extends Component {

  state = {
    creationError: false
  };

  render() {
    return (
      <Container>
        <Breadcrumb>
          <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
          <SimpleBreadcrumb>New</SimpleBreadcrumb>
        </Breadcrumb>

        <Row>
          <Col><h1>Create new project</h1></Col>
        </Row>

        {
          this.state.creationError &&
          <ProjectCreationFailed/>
        }

        <ProjectForm cancelButtonUrlDestination={PROJECTS_PATH}
                     cancelText="Back to Projects"
                     onSubmit={this.handleProjectSubmission}
                     submitText="Create"/>
      </Container>
    );
  }

  handleProjectSubmission = async (projectData, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await ProjectsService.createProject({data: projectData});
      this.redirectToProjectsList();
    } catch (e) {
      this.onProjectCreationFailed();
    }

    setSubmitting(false);
  };

  onProjectCreationFailed = () => this.setState({creationError: true});

  redirectToProjectsList = () => this.props.history.push(PROJECTS_PATH);

}

export const ProjectCreationFailed = () => (
  <Col>
    <Alert variant="danger">
      There's been an error while creating the project
    </Alert>
  </Col>
);
