import React, {Component} from 'react';
import {Container, Row} from "react-bootstrap";
import mockedJobs from "../../../mock-data/jobs";
import Col from "react-bootstrap/es/Col";
import {Link} from "react-router-dom";

export default class ViewJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      job: mockedJobs[0]
    }
  }


  render() {
    return (
      <JobData job={this.state.job}/>
    );
  }
}

function JobData({job}) {
  return (
    <Container>
      <Row>
        <Col><h1>Job #{job.id}</h1></Col>
        <Col className="d-flex flex-row-reverse">
          <div>
            <Link to={`/jobs/${job.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        </Col>
      </Row>
      <Row>
        <h2>{job.data.name}</h2>
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
        <Col>{job.data.reward / 100} $</Col>{/* TODO: Move */}
      </Row>
    </Container>
  );
}
