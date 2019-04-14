import React, {Component} from "react";
import {Col, Container, Table} from "react-bootstrap";

import {ignoreEventAnd} from "../../utils/events";
import {Link} from "react-router-dom";
import {PROJECTS_PATH} from "../Projects";
import DeleteProjectModal from "./DeleteProjectModal";
import ProjectsService from "../../../Services/ProjectsService";

export const ProjectsTable = ({projects, onProjectDeleted}) => (
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
      {
        projects.map(project => (
          <ProjectsTableRow project={project} key={project.id} onProjectDeleted={onProjectDeleted}/>
        ))
      }
      </tbody>
    </Table>
  </Col>
);

export class ProjectsTableRow extends Component {

  state = {};

  onUserWantToDeleteProject = () => this.setState({delete: true});

  onUserConfirmDeletion = async () => {
    const project = this.props.project;
    this.onDeletingProject();
    await ProjectsService.deleteProject(project);
    this.props.onProjectDeleted(project);
  };

  onUserCancelDeletion = () => this.setState({delete: false});

  onDeletingProject = () => this.setState({deleting: true});

  render() {
    const project = this.props.project;
    const openProjectLink = `${PROJECTS_PATH}/${project.id}`;
    const editProjectLink = `${PROJECTS_PATH}/${project.id}/edit`;

    return (
      <tr>
        { /* Confirm delete project modal */}
        <DeleteProjectModal projectToDelete={project}
                            show={this.state.delete}
                            deleting={this.state.deleting}
                            onCancel={this.onUserCancelDeletion}
                            onConfirmDeletion={this.onUserConfirmDeletion}/>

        <td>
          <Link to={openProjectLink}>{project.id}</Link>
        </td>
        <td>
          <Link to={openProjectLink}>{project.data.name}</Link>
        </td>
        <td>{project.data.description}</td>
        <td>

          <Link to={editProjectLink} className="icon-button">
            <i className="fas fa-edit"/>
          </Link>

          <a className="icon-button"
             onClick={ignoreEventAnd(this.onUserWantToDeleteProject)}>
            <i className="fas fa-trash-alt"/>
          </a>
        </td>
      </tr>
    );
  }
}

