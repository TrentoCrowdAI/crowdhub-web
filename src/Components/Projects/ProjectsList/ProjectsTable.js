import React from "react";
import {Col, Modal, Table} from "react-bootstrap";

import {Link} from "react-router-dom";
import {PROJECTS_PATH} from "../Projects";
import {DeleteButtonAndModal} from "../../common/DeleteButtonAndModal";
import ProjectsService from "../../../Services/rest/ProjectsService";
import ShareProjectButtonAndModal from "./ShareProjectButtonAndModal/ShareProjectButtonAndModal";
import "./ProjectsTable.css";

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

  return (
    <tr>
      <td>
        <Link to={openProjectLink}>{project.id}</Link>
      </td>
      <td>
        <Link to={openProjectLink}>{project.data.name}</Link>
      </td>
      <td>{project.data.description}</td>
      <td className="actions-cell">
        <ShareProjectButtonAndModal project={project}/>
        <EditButton project={project}/>
        <DeleteProjectButton project={project} onProjectDeleted={onProjectDeleted}/>
      </td>
    </tr>
  );
};

const EditButton = ({project}) => {
  const editProjectLink = `${PROJECTS_PATH}/${project.id}/edit`;
  return (
    <Link to={editProjectLink} className="icon-button">
      <i className="fas fa-edit"/>
    </Link>
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
