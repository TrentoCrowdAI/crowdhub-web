import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';

import "./ProjectForm.css";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import BackButton from "../../common/BackButton";


export default class ProjectForm extends Component {

  state = {};

  handleSubmit = (values, formikBag) => {
    const project = this.valuesToProjectData(values);
    this.props.onSubmit(project, formikBag);
  };

  valuesToProjectData = (values) => {
    return {
      name: values.name,
      description: values.description
    };
  };

  projectDataToValues = (projectDataFromProps) => {
    const data = projectDataFromProps || {};
    return {
      name: data.name || '',
      description: data.description || ''
    };
  };

  validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required')
  });

  render() {

    return (
      <div className="project-form-container">

        <Formik
          initialValues={this.projectDataToValues(this.props.projectData)}
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
                      <Form.Label>Project name</Form.Label>
                      <Form.Control name="name" type="text" value={values.name}
                                    onChange={handleChange} onBlur={handleBlur}
                                    placeholder="Ex: classify category of papers"
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
                      <Form.Label>Project description</Form.Label>
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
                  <BackButton to={this.props.cancelButtonUrlDestination || '/'}
                              text={this.props.cancelText}/>

                  <Button variant="primary" type="submit" className="submit-project-form">
                    {this.props.submitText}
                  </Button>
                </ButtonToolbar>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
