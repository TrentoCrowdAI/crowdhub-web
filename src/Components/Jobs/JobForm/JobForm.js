import React, {Component} from 'react';
import {Col, Row, Form, InputGroup, Button, Alert, ButtonToolbar} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import "./JobForm.css";

export default class JobForm extends Component {

  handleSubmit = (values, formikBag) => {
    const job = this.valuesToJob(values);
    this.props.onSubmit(job, formikBag)
  };

  valuesToJob = (values) => {
    return {
      name: values.name,
      description: values.description,

      num_votes: values.num_votes,
      max_votes: values.max_votes,
      reward: Math.floor(values.reward * 100), // TODO: Improve

      items_csv: values.items_csv,
      items_gold_csv: values.items_gold_csv,

      design: {
        html: values.html,
        css: values.css,
        js: values.js
      }
    };
  };

  jobToValues = (jobFromProps) => {
    const job = jobFromProps || {};
    return {
      name: job.name || '',
      description: job.description || '',

      num_votes: job.num_votes || 3,
      max_votes: job.max_votes || 10,
      reward: (job.reward && job.reward / 100) || 0.01,

      items_csv: job.items_csv || '',
      items_gold_csv: job.items_gold_csv || '',

      html: (job.design && job.design.html) || '',
      css: (job.design && job.design.css) || '',
      js: (job.design && job.design.js) || ''
    };
  };

  validationSchema = Yup.object().shape({ // TODO: Maybe move schemas in a common place
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),

    num_votes: Yup.number()
      .required('Num votes must be a number')
      .integer('Must be an integer')
      .positive('Must be positive'),
    max_votes: Yup.number()
      .required('Max votes must be a number')
      .integer('Must be an integer')
      .positive('Must be positive'),
    reward: Yup.number('')
      .required('Reward must be a number')
      .min(0.1, 'Must be greater than 0.1$')
      .positive('Must be positive'), // TODO: Improve

    items_csv: Yup.string()
      .required('URL of CSV of items is required')
      .url('Must be a valid URL'),
    items_gold_csv: Yup.string()
      .required('URL of CSV of gold items is required')
      .url('Must be a valid URL'),

    html: Yup.string(),
    css: Yup.string(),
    js: Yup.string()
  });

  render() {

    return (
      <Formik
        initialValues={this.jobToValues(this.props.jobData)}
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
                    <Form.Label>Job name</Form.Label>
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
                    <Form.Label>Job description</Form.Label>
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


              {/* CSV items */}
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Path to CSV file</Form.Label>
                    <Form.Control name="items_csv" type="text" value={values.items_csv}
                                  onChange={handleChange} onBlur={handleBlur}
                                  isInvalid={isInvalid('items_csv')}
                                  isValid={isValid('items_csv')}
                                  placeholder="Ex: https://raw.githubusercontent.com/..."/>
                    <Form.Control.Feedback type="invalid">
                      {errors.items_csv}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* CSV gold items */}
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Path to GOLD CSV file</Form.Label>
                    <Form.Control name="items_gold_csv" type="text" value={values.items_gold_csv}
                                  onChange={handleChange} onBlur={handleBlur}
                                  isInvalid={isInvalid('items_gold_csv')}
                                  isValid={isValid('items_gold_csv')}
                                  placeholder="Ex: https://raw.githubusercontent.com/..."/>
                    <Form.Control.Feedback type="invalid">
                      {errors.items_gold_csv}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* number of votes and reward */}
              <Row>
                {/* votes per item */}
                <Col xs="12" sm="4">
                  <Form.Group>
                    <Form.Label>Votes for item</Form.Label>
                    <Form.Control type="number" name="num_votes" value={values.num_votes} onChange={handleChange}
                                  isInvalid={isInvalid('num_votes')} isValid={isValid('num_votes')}/>
                    <Form.Control.Feedback type="invalid">
                      {errors.num_votes}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* votes per worker */}
                <Col xs="12" sm="4">
                  <Form.Group>
                    <Form.Label>Max votes per worker</Form.Label>
                    <Form.Control type="number" step="1" name="max_votes" value={values.max_votes}
                                  onChange={handleChange} isInvalid={isInvalid('max_votes')}
                                  isValid={isValid('max_votes')}/>
                    <Form.Control.Feedback type="invalid">
                      {errors.max_votes}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* reward */}
                <Col xs="12" sm="4">
                  <Form.Group>
                    <Form.Label>Reward</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="number" step="0.01" name="reward" value={values.reward}
                                    onChange={handleChange} isInvalid={isInvalid('reward')}
                                    isValid={isValid('reward')}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.reward}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              {/* template */}
              <Row>
                {/* HTML */}
                <Col xs="12" sm="4">
                  <Form.Group>
                    <Form.Label>HTML</Form.Label>
                    <Form.Control name="html" value={values.html} as="textarea" rows="3" onChange={handleChange}
                                  isInvalid={isInvalid('html')} isValid={isValid('html')}/>
                  </Form.Group>
                </Col>

                {/* CSS */}
                <Col xs="12" sm="4">
                  <Form.Group>
                    <Form.Label>CSS</Form.Label>
                    <Form.Control name="css" value={values.css} as="textarea" rows="3" onChange={handleChange}
                                  isInvalid={isInvalid('css')} isValid={isValid('css')}/>
                  </Form.Group>
                </Col>

                {/* JS */}
                <Col xs="12" sm="4">
                  <Form.Group>
                    <Form.Label>JS</Form.Label>
                    <Form.Control name="js" value={values.js} as="textarea" rows="3" onChange={handleChange}
                                  isInvalid={isInvalid('js')} isValid={isValid('js')}/>
                  </Form.Group>
                </Col>
              </Row>


              <ButtonToolbar className="form-buttons">
                <Button variant="secondary" onClick={this.props.onCancel} className="cancel-job-form">
                  {this.props.cancelText}
                </Button>
                <Button variant="primary" type="submit" className="submit-job-form">
                  {this.props.submitText}
                </Button>
              </ButtonToolbar>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
