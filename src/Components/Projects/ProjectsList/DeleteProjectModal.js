import React from 'react';
import {Button, Modal} from "react-bootstrap";

export default ({show, deleting, projectToDelete, onCancel, onConfirmDeletion}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Delete project <span className="project-id">#{show && projectToDelete.id}</span></Modal.Title>
    </Modal.Header>

    <Modal.Body>
      Are you sure you want to delete "<strong>{show && projectToDelete.data.name}</strong>"?
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel} disabled={deleting}>Cancel</Button>
      <Button variant="danger" onClick={onConfirmDeletion}  disabled={deleting}>Delete</Button>
    </Modal.Footer>
  </Modal>
);
