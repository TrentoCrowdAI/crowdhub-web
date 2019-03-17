import React, {Component} from 'react';
import {Alert, Col, Row, Container} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import JobForm from "../JobForm/JobForm";
import BackButton from "../../common/BackButton";

export default class CreateJob extends Component {

  constructor(props, context) {
    super(props);
    this.context = context;
    this.state = {
      creationError: false
    }
  }

  render() {
    return (
      <Container>
        <BackButton to="/jobs" text="Return to jobs list"/>

        <Row>
          <Col><h1>Create new job</h1></Col>
        </Row>

        {
          this.state.creationError &&
          <JobCreationFailed/>
        }

        <JobForm onSubmit={this.handleJobSubmission}
                 onCancel={this.onCancel}
                 submitText="Create"/>
      </Container>
    );
  }

  handleJobSubmission = async (jobData, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await JobsService.createJob({data: jobData});
      this.redirectToJobsList();
    } catch (e) {
      console.log(e);
      this.onJobCreationFailed();
    }

    setSubmitting(false);
  };

  onJobCreationFailed = () => this.setState({creationError: true});

  redirectToJobsList = () => this.props.history.push('/jobs');

}

export const JobCreationFailed = () => (
  <Col>
    <Alert variant="danger">
      There's been an error while creating the job
    </Alert>
  </Col>
);
