import React, {Component} from 'react';
import {Alert, Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import ProjectsService from "../../../Services/rest/ProjectsService";
import {makeCancellable} from "../../../Services/rest/utils";
import {PROJECTS_PATH} from "../Projects";
import {SimpleBreadcrumb} from "../../common/Breadcrumbs";
import {ProjectsTable} from "./ProjectsTable";
import LoadingContainer from "../../common/LoadingContainer";


export class ProjectsList extends Component {

  state = {};

  componentDidMount = () => this.fetchProjects();

  componentWillUnmount = () => this.pendingProjectsRequest.cancel();

  fetchProjects = async () => {
    try {
      this.pendingProjectsRequest = makeCancellable(ProjectsService.getProjects());
      const projects = await this.pendingProjectsRequest.result;

      this.setState({projects});
    } catch (e) {
      this.setState({
        projects: null,
        fetchError: true
      });
    }
  };

  render() {

    return (
      <Container>

        <Breadcrumb>
          <SimpleBreadcrumb>Projects</SimpleBreadcrumb>
        </Breadcrumb>

        <Row className="header-row">
          <Col>
            <h3>Projects list</h3>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <Link className="btn btn-primary" to={`${PROJECTS_PATH}/new`}>New</Link>
          </Col>
        </Row>

        <LoadingContainer loading={!this.state.projects && !this.state.fetchError}>
          <Row>
            {
              !this.state.projects && this.state.fetchError &&
              <FetchProjectsError/>
            }

            {
              this.state.projects && this.state.projects.length === 0 &&
              <NoProjects/>
            }

            {
              this.state.projects && this.state.projects.length > 0 &&
              <ProjectsTable projects={this.state.projects} onProjectDeleted={this.fetchProjects}/>
            }
          </Row>
        </LoadingContainer>

      </Container>
    )
  }
}

export const NoProjects = () => (
  <Col>
    <p>You haven't created any project yet. Use the 'Add' button to create a new one</p>
  </Col>
);

export const FetchProjectsError = () => (
  <Col>
    <Container>
      <Alert variant="danger">
        There's been an error while fetching the projects
      </Alert>
    </Container>
  </Col>
);
