import React, {Component} from 'react';
import {Alert, Col, Container} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import JobForm from "../JobForm/JobForm";

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

        {
          this.state.creationError &&
          <JobCreationFailed/>
        }

        <JobForm onSubmit={this.handleJobSubmission}
                 onCancel={this.onCancel}
                 submitText="Create"
                 cancelText="Return to job list"/>
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

  onCancel = () => this.redirectToJobsList();

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
