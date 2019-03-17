import React, {Component} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import JobsService from "../../../Services/JobsService";
import {makeCancellable} from "../../../Services/utils";
import {rewardIntegerToString} from "../utils";
import Button from "react-bootstrap/es/Button";

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
      this.redirectToJobsList();
    }
  }

  redirectToJobsList = () => this.props.history.push('/jobs');

  render() {
    return (
      <Container>

        {
          !this.state.job &&
          <FetchingJob/>
        }

        {
          this.state.job &&
          <JobData job={this.state.job}/>
        }

      </Container>
    );
  }
}

const FetchingJob = () => (
  <p>Fetching ...</p>
);

function JobData({job}) {
  return (
    <Container>
      <Row>
        <Col>
          <Link to="/jobs" className="btn btn-outline-info">
            <i className="fas fa-arrow-left"/> Return to jobs list
          </Link>
        </Col>
      </Row>

      <Row>
        <Col><h1>Job #{job.id}</h1></Col>
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
