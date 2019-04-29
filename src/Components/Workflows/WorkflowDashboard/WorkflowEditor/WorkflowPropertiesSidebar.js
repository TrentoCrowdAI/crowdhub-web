import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";

import './WorkflowPropertiesSidebar.css';
import LoadingButton from "../../../common/LoadingButton";
import WorkflowsService from "../../../../Services/WorkflowsService";

/**
 * Sidebar to edit the workflow name and description
 *
 * TODO: The name Properties was never used inside the project, rename this component
 */
export default class WorkflowPropertiesSidebar extends Component {

  constructor(props) {
    super(props);
    const {name, description} = props.workflow;
    this.state = {
      name,
      description,

      startingWorkflow: false,
      startWorkflowError: false
    }
  }

  // TODO: Use utils, this won't scale
  onChangeName = (event) => this.setState({
    name: event.target.value
  });

  onChangeDescription = (event) => this.setState({
    description: event.target.value
  });

  onBlur = () => this.props.onEdit({
    ...this.props.workflow,
    name: this.state.name || this.props.name,
    description: this.state.description || this.props.description
  });

  runWorkflow = async () => {
    try {
      // TODO: Save the workflow before starting
      this.setState({startingWorkflow: true, startWorkflowError: false});
      await WorkflowsService.startWorkflow(this.props.workflow);
    } catch (e) {
      this.setState({startWorkflowError: true});
    }
    this.setState({startingWorkflow: false});
  };

  render() {
    return (
      <div className="d-flex flex-column">
        <div>
          <Row>
            <Col>
              <h5>Workflow properties</h5>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeName}
                              onBlur={this.onBlur}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" type="text" as="textarea" value={this.state.description}
                              onChange={this.onChangeDescription} onBlur={this.onBlur}/>
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="bottom-button-container">
          {
            this.state.startWorkflowError &&
            <div className="start-workflow-error">
              <span>
                <i className="fas fa-exclamation-triangle"/> Can't start workflow!
              </span>
            </div>
          }

          <LoadingButton onClick={this.runWorkflow} block={true}
                         isSaving={this.state.startingWorkflow}>Run</LoadingButton>
        </div>
      </div>
    );
  }
}
