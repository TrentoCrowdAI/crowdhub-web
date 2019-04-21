import React, {Component} from 'react';
import {Button, ButtonToolbar, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";


export default class WorkflowForm extends Component {

  validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required')
  });


  handleSubmit = async (values, formikBag) => {
    const workflowData = this.valuesToWorkspaceData(values);
    await this.props.onSubmit(workflowData, formikBag);
  };

  workspaceDataToValues = (workspaceDataFromProps) => {
    const data = workspaceDataFromProps || {};
    return {
      name: data.name || '',
      description: data.description || ''
    }
  };

  valuesToWorkspaceData = (values) => {
    return {
      name: values.name,
      description: values.description
    };
  };


  render() {
    return (
      <Formik
        initialValues={this.workspaceDataToValues(this.props.workspaceData)}
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


              <ButtonToolbar className="form-buttons">
                <Button variant="secondary" onClick={this.props.onCancel}>Cancel</Button>
                <Button type="submit">{this.props.submitText}</Button>
              </ButtonToolbar>

            </Form>
          );
        }}
      </Formik>
    );
  }
}
