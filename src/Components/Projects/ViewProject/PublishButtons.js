import React, {Component} from "react";
import {Button, Col, Container, Modal, ProgressBar, Row} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import "./PublishButtons.css";

export default class PublishButtons extends Component {

  state = {};

  openConfirmDialogForPlatform = platform => () => this.setState({publishOnPlatform: platform});

  publish = async () => {
    const platform = this.state.publishOnPlatform;
    this.onPublishing();

    try {
      await JobsService.publish(this.props.job, platform);
      this.onJobPublished();
    } catch (e) {
      this.onPublishError();
    }
  };

  onPublishing = () => this.setState({
    publishOnPlatform: null, // closes the modal
    isPublishing: true
  });

  onJobPublished = () => this.setState({
    isPublishing: false,
    published: true
  });

  onPublishError = () => this.setState({
    isPublishing: false,
    publishError: true,
    published: false
  });

  render() {
    return (
      <Container className="publish-buttons">
        <Row>
          <Col><h4>Publish</h4></Col>
        </Row>

        { /* Confirm to publish on platform modal */}
        <PublishJobModal job={this.props.job} show={!!this.state.publishOnPlatform}
                         onCancel={() => this.setState({publishOnPlatform: null})}
                         onConfirm={this.publish}/>

        { /* Publishing job modal */}
        <PublishingModal job={this.props.job} show={this.state.isPublishing}/>

        { /* Job published modal */}
        <PublishedModal job={this.props.job} show={this.state.published}
                        onClose={() => this.setState({published: false})}/>

        { /* Error while published job modal */}
        <PublishFailedModal job={this.props.job} show={this.state.publishError}
                            onClose={() => this.setState({publishError: false})}/>

        { /* Buttons to select the platform */}
        <Row>
          <Col md="4">
            <Button className="MTurk-publish" onClick={this.openConfirmDialogForPlatform('MTurk')} block>Amazon
              Mechanical Turk</Button>
          </Col>
          <Col md="4">
            <Button className="F8-publish" onClick={this.openConfirmDialogForPlatform('F8')} block>Figure Eight</Button>
          </Col>
          <Col md="4">
            <Button className="Toloka-publish" onClick={this.openConfirmDialogForPlatform('Toloka')}
                    block>Yandex.Toloka</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export const PublishJobModal = ({show, job, onCancel, onConfirm}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Publish job <span className="job-id">#{job.id}</span></Modal.Title>
    </Modal.Header>

    <Modal.Body>
      Are you sure you want to publish "<strong>{job.data.name}</strong>"?
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" className="cancel" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" className="confirm" onClick={onConfirm}>Publish</Button>
    </Modal.Footer>
  </Modal>
);

export const PublishingModal = ({show, job}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Publishing Job #{job.id}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      Please wait while Job #{job.id} is being published.
      <ProgressBar animated now={100}/>
    </Modal.Body>
  </Modal>
);

export const PublishedModal = ({show, job, onClose}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Job #{job.id} published</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      Job "<strong>{job.data.name}</strong>" published!
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export const PublishFailedModal = ({show, job, onClose}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Something went wrong</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      Something went wrong while publishing Job #{job.id}.
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);
