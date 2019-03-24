import React, {Component} from 'react';
import {Container, Row, Col, Alert} from "react-bootstrap";

import JobsService, {Errors} from "../../../Services/JobsService";
import JobForm from "../JobForm/JobForm";
import BackButton from "../../common/BackButton";

export default class EditJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  componentDidMount = () => this.fetchJob();

  fetchJob = async () => {
    const job = await JobsService.getJob(this.state.id);
    this.setState({job});
  };

  handleJobSubmission = async (jobData, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await JobsService.updateJob({
        id: this.state.job.id,
        data: jobData
      });
      this.returnToJobPage();
    } catch (e) {
      this.onUpdateJobFailed(e);
    }

    setSubmitting(false);
  };

  onCancel = () => this.returnToJobPage();

  returnToJobPage = () => this.props.history.push(`/jobs/${this.state.job.id}`);

  onUpdateJobFailed = (e) => this.setState({updateError: e});

  render() {
    return (
      <Container>
        <BackButton to={`/jobs/${this.state.id}`} text="Cancel"/>

        <Row>
          <Col>
            <h1>
              Edit job {this.state.job && `#${this.state.id}`}
            </h1>
          </Col>
        </Row>

        {
          this.state.updateError &&
          <UpdateJobError error={this.state.updateError}/>
        }

        {
          !this.state.job &&
          <FetchingJob/>
        }
        {
          this.state.job &&
          <JobForm jobData={this.state.job.data}
                   onSubmit={this.handleJobSubmission}
                   onCancel={this.onCancel}
                   submitText="Save"/>
        }
      </Container>
    );
  }

}

function FetchingJob() {
  return (<p>Fetching job...</p>);
}


export const UpdateJobError = ({error}) => (
  <Col>
    <Alert variant="danger">
      {
        error === Errors.INVALID_JOB_DATA ?
          "Validation of the Job failer. Please check all the data" :
          "There's been an error while creating the job"
      }

    </Alert>
  </Col>
);
