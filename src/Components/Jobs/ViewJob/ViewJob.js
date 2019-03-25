import React, {Component} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import JobsService from "../../../Services/JobsService";
import {makeCancellable} from "../../../Services/utils";
import {rewardIntegerToString} from "../utils/job";
import PublishButtons from "./PublishButtons";
import BackButton from "../../common/BackButton";
import {redirectToJobsList} from "../utils/route";


export default class ViewJob extends Component {

  state = {};

  componentDidMount = () => this.fetchJob();

  componentWillUnmount = () => this.pendingJobRequest.cancel();

  async fetchJob() {
    const id = this.props.match.params.id;

    try {
      this.pendingJobRequest = makeCancellable(JobsService.getJob(id));
      const job = await this.pendingJobRequest.result;

      this.setState({job});
    } catch (e) {
      redirectToJobsList(this);
    }
  }

  render() {
    if (!this.state.job) {
      return <FetchingJob/>;
    } else {
      return (
        <Container>
          <Row>
            <JobData job={this.state.job}/>
          </Row>
          <hr/>
          <Row>
            <PublishButtons job={this.state.job}/>
          </Row>
        </Container>
      );
    }
  }
}

const FetchingJob = () => (
  <Container>
    <p>Fetching ...</p>
  </Container>
);

function JobData({job}) {
  return (
    <Container>
      <BackButton to="/jobs" text="Return to jobs list"/>

      <Row>
        <Col><h2>Job #{job.id}</h2></Col>
        <Col className="d-flex flex-row-reverse">
          <div>
            <Link to={`/jobs/${job.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col><h2>{job.data.name}</h2></Col>
      </Row>

      <Row>
        <Col md="3" lg="2">
          <strong>Description:</strong>
        </Col>
        <Col>{job.data.description}</Col>
      </Row>

      <Row>
        <Col md="3" lg="2">
          <strong>Reward:</strong>
        </Col>
        <Col>{rewardIntegerToString(job.data.reward)} $</Col>
      </Row>
    </Container>
  );
}

