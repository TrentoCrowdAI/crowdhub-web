import React, {Component} from 'react';
import JobForm from "./JobForm/JobForm";
import Container from "react-bootstrap/Container";
import JobsService from "../../Services/JobsService";
import {Alert, Col} from "react-bootstrap";

export default class CreateJob extends Component {

  constructor(props, context) {
    super(props);
    this.context = context;
    this.state = {
      job: {},
      creationError: false
    }
  }


  render() {
    // Wrap using withRouter to obtain the history object in the props
    return (
      <Container>

        {
          this.state.creationError &&
          <JobCreationFailed/>
        }

        <JobForm job={this.state.job} onSubmit={this.handleJobSubmission} onCancel={this.onCancel}
                 submitText="Create" cancelText="Return to job list"/>
      </Container>
    );
  }

  handleJobSubmission = async (job, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await JobsService.createJob(job);
    } catch (e) {
      this.onJobCreationFailed();
    }

    setSubmitting(false);
    this.redirectToJobsList();
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
