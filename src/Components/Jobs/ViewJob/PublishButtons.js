import React, {Component} from "react";
import {Button, Col, Row, Modal, Container} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import {closeAndAfterAnimation} from "../utils/modal";
import "./PublishButtons.css";

export default class PublishButtons extends Component {

  state = {};

  onUserWantsToPublish = publishOn => () => this.setState({publishOn});

  publish = async () => {
    const platform = this.state.publishOn;
    this.setState({
      publishOn: null,
      isPublishing: true
    });

    await JobsService.publish(this.props.job, platform);

    this.setState({
      isPublishing: false,
      published: true
    });
  };

  render() {
    return (
      <Container className="publish-buttons">
        <Row>
          <Col><h4>Publish</h4></Col>
        </Row>

        {
          this.state.publishOn &&
          <PublishJobModal job={this.props.job}
                           onCancel={() => this.setState({publishOn: null})}
                           onConfirm={this.publish}/>
        }

        {
          this.state.published &&
          <PublishedModal job={this.props.job}/>
        }

        <Row>
          <Col md="4">
            <Button onClick={this.onUserWantsToPublish('MTurk')} block>Amazon Mechanical Turk</Button>
          </Col>
          <Col md="4">
            <Button onClick={this.onUserWantsToPublish('F8')} block>Figure Eight</Button>
          </Col>
          <Col md="4">
            <Button onClick={this.onUserWantsToPublish('Toloka')} block>Yandex.Toloka</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

class PublishJobModal extends Component {

  state = {show: true};

  onCancelPressed = closeAndAfterAnimation(this, () => this.props.onCancel());

  onConfirmPressed = closeAndAfterAnimation(this, () => this.props.onConfirm());

  render() {
    const job = this.props.job;
    return (
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>Publish job <span className="job-id">#{job.id}</span></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to publish "<strong>{job.data.name}</strong>"?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCancelPressed}>Cancel</Button>
          <Button variant="primary" onClick={this.onConfirmPressed}>Publish</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}

class PublishedModal extends Component {

  state = {show: true};

  onClose = closeAndAfterAnimation(this, () => {});

  render() {
    const job = this.props.job;
    return (
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>Job #{job.id} published</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Job "<strong>{job.data.name}</strong>" was published!
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
