import React, {Component} from 'react';
import {Container, Row, Col} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import JobForm from "../JobForm/JobForm";
import BackButton from "../../common/BackButton";

export default class EditJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  async componentDidMount() {
    await this.fetchJob();
  }

  fetchJob = async () => {
    const job = await JobsService.getJob(this.state.id);
    this.setState({job});
  };

  handleJobSubmission = async (jobData, {setSubmitting}) => {
    setSubmitting(true);

    await JobsService.updateJob({
      id: this.state.job.id,
      data: jobData
    });

    setSubmitting(false);
    this.returnToJobPage();
  };

  onCancel = () => this.returnToJobPage();

  returnToJobPage = () => this.props.history.push(`/jobs/${this.state.job.id}`);

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
