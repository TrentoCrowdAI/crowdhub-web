import React, {Component} from 'react';
import {Alert, Button, ButtonToolbar, Col, Form, Modal, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";

import WorkflowsService from "../../../../Services/WorkflowsService";
import './CreateWorkflow.css';


export class CreateWorkflowButton extends Component {

  state = {showModal: false};

  showCreateWorkflowModal = () => this.setState({showModal: true});

  onWorkflowCreated = () => {
    this.hideCreateWorkflowModal();
    this.props.onWorkflowCreated();
  };

  hideCreateWorkflowModal = () => this.setState({showModal: false});

  render() {
    return (
      <div>
        <CreateWorkflowModal show={this.state.showModal} onCancel={this.hideCreateWorkflowModal}
                             projectId={this.props.projectId}  onWorkflowCreated={this.onWorkflowCreated}/>

        <Button onClick={this.showCreateWorkflowModal} >Add workflow</Button>
      </div>
    );
  }
}


export class CreateWorkflowModal extends Component {

  state = {};

  handleSubmit = async (values, formikBag) => {
    const workflowData = this.valuesToWorkspaceData(values);
    const workflow = {
      projectId: this.props.projectId,
      data: workflowData
    };
    await this.createNewWorkflow(workflow, formikBag);
  };

  valuesToWorkspaceData = (values) => {
    return {
      name: values.name,
      description: values.description
    };
  };

  createNewWorkflow = async (workflow, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await WorkflowsService.createWorkflow(workflow);
      this.onWorkflowCreated();
    } catch (e) {
      this.onWorkflowCreationError();
    }

    setSubmitting(false);
  };

  onWorkflowCreated = () => this.props.onWorkflowCreated();

  onWorkflowCreationError = () => this.setState({creationError: true});

  initialData = {
    name: '',
    description: ''
  };

  validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required')
  });


  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Create new workflow</Modal.Title>
        </Modal.Header>


        <Formik
          initialValues={this.initialData}
          onSubmit={this.handleSubmit}
          validationSchema={this.validationSchema}>

          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => {

            const isValid = name => touched[name] && !errors[name];
            const isInvalid = name => touched[name] && errors[name];

            return (
              <Form onSubmit={handleSubmit} noValidate>

                <Modal.Body>

                  {
                    this.state.creationError &&
                    <CreateWorkflowError/>
                  }


                  {/* name */}
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Workflow name name</Form.Label>
                        <Form.Control name="name" type="text" value={values.name}
                                      onChange={handleChange} onBlur={handleBlur}
                                      isInvalid={isInvalid('name')}
                                      isValid={isValid('name')}/>

                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* description */}
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Workflow description</Form.Label>
                        <Form.Control name="description" value={values.description} as="textarea" rows="3"
                                      onChange={handleChange} onBlur={handleBlur}
                                      isInvalid={isInvalid('description')}
                                      isValid={isValid('description')}/>
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>


                <Modal.Footer>
                  <ButtonToolbar className="form-buttons">
                    <Button variant="secondary" onClick={this.props.onCancel}>Cancel</Button>
                    <Button type="submit">Create</Button>
                  </ButtonToolbar>

                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}


export const CreateWorkflowError = () => (
  <Row>
    <Col>
      <Alert variant="danger">
        There's been an error while creating the new workflow.
      </Alert>
    </Col>
  </Row>
);

