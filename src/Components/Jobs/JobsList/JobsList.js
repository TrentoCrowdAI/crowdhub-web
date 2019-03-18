/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import Link from "react-router-dom/Link";
import {Alert, Col, Container, Row, Table, Button} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import DeleteJobModal from "./DeleteJobModal";
import {makeCancellable} from "../../../Services/utils";
import "./JobsList.css";

export class JobsList extends Component {

  state = {};

  componentDidMount = () => this.fetchJobs();

  componentWillUnmount = () => this.pendingJobsRequest.cancel();

  async fetchJobs() {
    try {
      this.pendingJobsRequest = makeCancellable(JobsService.getJobs());
      const jobs = await this.pendingJobsRequest.result;

      this.setState({jobs});
    } catch (e) {
      this.setState({
        jobs: null,
        fetchError: true
      });
    }
  }

  onUserWantToDeleteJob = (job) => this.setState({jobToDelete: job});

  onOpenJobView = (job) => this.props.history.push(`/jobs/${job.id}`);

  onOpenEditJob = (job) => this.props.history.push(`/jobs/${job.id}/edit`);

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
              <Link to="/jobs/new" className="btn btn-primary">Add</Link>
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
            <JobsTable jobs={this.state.jobs}
                       onUserWantToDeleteJob={this.onUserWantToDeleteJob}
                       onOpenJobView={this.onOpenJobView}
                       onOpenEditJob={this.onOpenEditJob}/>
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

export const JobsTable = ({jobs, onUserWantToDeleteJob, onOpenJobView, onOpenEditJob}) => (
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
        <JobsTableRow job={job} key={job.id}
                      onUserWantToDeleteJob={onUserWantToDeleteJob}
                      onOpenEditJob={onOpenEditJob}
                      onOpenJobView={onOpenJobView}/>
      ))}
      </tbody>
    </Table>
  </Col>
);

const ignoreEventAnd = (callback) => (e) => {
  e.stopPropagation();
  //e.preventDefault();
  callback();
};

export const JobsTableRow = ({job, onUserWantToDeleteJob, onOpenJobView, onOpenEditJob}) => (
  <tr onClick={() => onOpenJobView(job)} className="clickable-row">
    <td>{job.id}</td>
    <td>{job.data.name}</td>
    <td>{job.data.description}</td>
    <td/>
    <td>

      <a className="icon-button"
         onClick={ignoreEventAnd(() => onOpenEditJob(job))}>
        <i className="fas fa-edit"/>
      </a>

      <a className="icon-button"
         onClick={ignoreEventAnd(() => onUserWantToDeleteJob(job))}>
        <i className="fas fa-trash-alt"/>
      </a>
    </td>
  </tr>
);