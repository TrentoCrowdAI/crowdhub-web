/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Alert, Breadcrumb, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

import ProjectsService from "../../../Services/ProjectsService";
import DeleteProjectModal from "./DeleteProjectModal";
import {makeCancellable} from "../../../Services/utils";
import "./ProjectsList.css";
import {PROJECTS_PATH} from "../Projects";
import {SimpleBreadcrumb} from "../../common/Breadcrumbs";
import {ignoreEventAnd} from "../../utils/events";


export class ProjectsList extends Component {

  state = {};

  componentDidMount = () => this.fetchProjects();

  componentWillUnmount = () => this.pendingProjectsRequest.cancel();

  async fetchProjects() {
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
  }

  onUserWantToDeleteProject = (projectToDelete) => this.setState({projectToDelete});

  onOpenProjectView = (project) => this.props.history.push(`${PROJECTS_PATH}/${project.id}`);

  onOpenEditProject = (project) => this.props.history.push(`${PROJECTS_PATH}/${project.id}/edit`);

  onUserConfirmDeletion = async () => {
    const project = this.state.projectToDelete;
    this.setState({projects: null, projectToDelete: null});

    await ProjectsService.deleteProject(project);

    await this.fetchProjects();
  };

  render() {

    return (
      <Container>

        { /* Confirm delete project modal */}
        <DeleteProjectModal projectToDelete={this.state.projectToDelete} show={!!this.state.projectToDelete}
                        onCancel={() => this.setState({projectToDelete: null})}
                        onConfirmDeletion={this.onUserConfirmDeletion}/>

        <Breadcrumb>
          <SimpleBreadcrumb>Projects</SimpleBreadcrumb>
        </Breadcrumb>

        <Row>
          <Col>
            <h3>Projects list</h3>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <Link className="btn btn-primary" to={`${PROJECTS_PATH}/new`}>New</Link>
          </Col>
        </Row>
        <Row>
          {
            !this.state.projects && !this.state.fetchError &&
            <FetchingProjects/>
          }

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
            <ProjectsTable projects={this.state.projects}
                           onUserWantToDeleteProject={this.onUserWantToDeleteProject}
                           onOpenProjectView={this.onOpenProjectView}
                           onOpenEditProject={this.onOpenEditProject}/>
          }

        </Row>
      </Container>
    )
  }
}

export const FetchingProjects = () => (
  <Col>
    <p>Fetching projects ...</p>
  </Col>
);

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

export const ProjectsTable = ({projects, onUserWantToDeleteProject, onOpenProjectView, onOpenEditProject}) => (
  <Col>
    <Table hover>
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {projects.map(project => (
        <ProjectsTableRow project={project} key={project.id}
                          onUserWantToDeleteProject={onUserWantToDeleteProject}
                          onOpenEditProject={onOpenEditProject}
                          onOpenProjectView={onOpenProjectView}/>
      ))}
      </tbody>
    </Table>
  </Col>
);



export const ProjectsTableRow = ({project, onUserWantToDeleteProject, onOpenProjectView, onOpenEditProject}) => (
  <tr onClick={() => onOpenProjectView(project)} className="clickable-row">
    <td>{project.id}</td>
    <td>{project.data.name}</td>
    <td>{project.data.description}</td>
    <td>

      <a className="icon-button"
         onClick={ignoreEventAnd(() => onOpenEditProject(project))}>
        <i className="fas fa-edit"/>
      </a>

      <a className="icon-button"
         onClick={ignoreEventAnd(() => onUserWantToDeleteProject(project))}>
        <i className="fas fa-trash-alt"/>
      </a>
    </td>
  </tr>
);
