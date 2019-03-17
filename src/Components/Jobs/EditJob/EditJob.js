import React, {Component} from 'react';
import JobsService from "../../../Services/JobsService";
import JobForm from "../JobForm/JobForm";
import Container from "react-bootstrap/Container";

export default class EditJob extends Component {

  state = {};

  async componentDidMount() {
    await this.fetchJob();
  }

  fetchJob = async () => {
    const id = this.props.match.params.id;
    const job = await JobsService.getJob(id);
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
        {
          !this.state.job &&
          <FetchingJob/>
        }
        {
          this.state.job &&
          <JobForm jobData={this.state.job.data}
                   onSubmit={this.handleJobSubmission}
                   onCancel={this.onCancel}
                   submitText="Save"
                   cancelText="Cancel"/>
        }
      </Container>
    );
  }

}

function FetchingJob() {
  return (<p>Fetching job...</p>);
}
