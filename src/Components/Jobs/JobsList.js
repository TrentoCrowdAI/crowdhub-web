import React, {Component} from 'react';
import Link from "react-router-dom/Link";
import {Container, Row, Col, Table, Alert} from "react-bootstrap";
import JobsService from "../../Services/JobsService";

export class JobsList extends Component {

  constructor(props) {
    super(props);
    this.match = this.props.match;
    this.state = {};
  }

  async componentDidMount() {
    await this.fetchJobs();
  }

  componentWillUnmount() {
    this.componentUnoumnted = true;
  }

  async fetchJobs() {
    try {
      const jobs = await JobsService.getJobs();

      if (!this.componentUnoumnted) {
        this.setState({jobs});
      }
    } catch (e) {
        this.setState({
          jobs: null,
          fetchError: true
        })
    }
  }

  render() {

    return (
      <Container>
        <Row>
          <Col>
            <h2>List</h2>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <div>
              <Link to={`${this.match.url}/new`} className="btn btn-primary">Add</Link>
            </div>
          </Col>
        </Row>
        <Row>
          {
            !this.state.jobs && !this.state.fetchError &&
            <FetchingJobs/>
          }

          {
            !this.state.jobs && this.state.fetchError &&
            <FetchJobsError/>
          }

          {
            this.state.jobs && this.state.jobs.length === 0 &&
            <NoJobs/>
          }

          {
            this.state.jobs && this.state.jobs.length > 0 &&
            <JobsTable jobs={this.state.jobs}/>
          }

        </Row>
      </Container>
    )
  }
}

export const FetchingJobs = () => (
  <Col>
    <p>Fetching jobs ...</p>
  </Col>
);

export const NoJobs = () => (
  <Col>
    <p>You haven't created any jobs yet. Use the 'Add' button to create a new one</p>
  </Col>
);

export const FetchJobsError = () => (
  <Col>
    <Alert variant="danger">
      There's been an error while fetching the jobs
    </Alert>
  </Col>
);

export const JobsTable = ({jobs}) => (
  <Col>
    <Table>
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Platforms</th>
      </tr>
      </thead>
      <tbody>
      {jobs.map(job => (
        <JobsTableRow job={job} key={job.id}/>
      ))}
      </tbody>
    </Table>
  </Col>
);

export const JobsTableRow = ({job}) => (
  <tr>
    <td>{job.id}</td>
    <td>{job.data.name}</td>
    <td>{job.data.description}</td>
    <td></td>
  </tr>
);

