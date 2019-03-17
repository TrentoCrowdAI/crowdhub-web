/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import Link from "react-router-dom/Link";
import {Alert, Col, Container, Row, Table} from "react-bootstrap";
import JobsService from "../../../Services/JobsService";
import DeleteJobModal from "./DeleteJobModal";

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

  onUserWantToDeleteJob = (job) => this.setState({jobToDelete: job});

  onUserConfirmDeletion = async () => {
    const job = this.state.jobToDelete;
    this.setState({jobs: null, jobToDelete: null});

    await JobsService.deleteJob(job);

    await this.fetchJobs();
  };

  render() {

    return (
      <Container>
        {
          this.state.jobToDelete &&
          <DeleteJobModal jobToDelete={this.state.jobToDelete}
                          onCancel={() => this.setState({jobToDelete: null})}
                          onConfirmDeletion={this.onUserConfirmDeletion}/>
        }

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
            <JobsTable jobs={this.state.jobs} onUserWantToDeleteJob={this.onUserWantToDeleteJob}/>
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
    <Container>
      <Alert variant="danger">
        There's been an error while fetching the jobs
      </Alert>
    </Container>
  </Col>
);

export const JobsTable = ({jobs, onUserWantToDeleteJob}) => (
  <Col>
    <h1>Jobs</h1>
    <Table hover>
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Platforms</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {jobs.map(job => (
        <JobsTableRow job={job} key={job.id} onUserWantToDeleteJob={onUserWantToDeleteJob}/>
      ))}
      </tbody>
    </Table>
  </Col>
);

export const JobsTableRow = ({job, onUserWantToDeleteJob}) => (
  <tr>
    <td>{job.id}</td>
    <td>{job.data.name}</td>
    <td>{job.data.description}</td>
    <td/>
    <td>

      <a href="#" onClick={() => onUserWantToDeleteJob(job)}>
        <i className="fas fa-trash-alt"/>
      </a>
    </td>
  </tr>
);
