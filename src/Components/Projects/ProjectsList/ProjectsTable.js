import React from "react";
import {Col, Modal, Table} from "react-bootstrap";

import {Link} from "react-router-dom";
import {PROJECTS_PATH} from "../Projects";
import {DeleteButtonAndModal} from "../../common/DeleteButtonAndModal";
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

export const ProjectsTableRow = ({project, onProjectDeleted}) => {
  const openProjectLink = `${PROJECTS_PATH}/${project.id}`;
  const editProjectLink = `${PROJECTS_PATH}/${project.id}/edit`;

  return (
    <tr>

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

        <DeleteProjectButton project={project} onProjectDeleted={onProjectDeleted}/>
      </td>
    </tr>
  );
};

const DeleteProjectButton = ({project, onProjectDeleted}) => (
  <DeleteButtonAndModal
    onDeleted={onProjectDeleted}
    serviceCall={() => ProjectsService.deleteProject(project)}

    header={
      <Modal.Title>Delete project <span className="project-id">#{project.id}</span></Modal.Title>
    }

    body={
      <div>
        Are you sure you want to delete the project <strong>{project.data.name}</strong>?
      </div>
    }
  />
);
