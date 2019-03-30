import React, {Component} from 'react';
import {Alert, Col, Row, Container} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import JobForm from "../JobForm/JobForm";
import BackButton from "../../common/BackButton";
import Templates from "./Templates";

const DEFAULT_TEMPLATE_ID = 'blank';

export default class CreateJob extends Component {

  constructor(props) {
    super(props);
    const templateId = props.match.params.template_id || DEFAULT_TEMPLATE_ID;
    const template = Templates[templateId] || Templates[DEFAULT_TEMPLATE_ID];

    this.state = {
      creationError: false,
      jobData: this.buildJobStartingFromTemplate(template)
    }
  }

  buildJobStartingFromTemplate = template => {
    console.log(template)
      return {
        name: `My ${template.name}`,
        design: template.design
      }
  };

  render() {
    return (
      <Container>
        <BackButton to="/jobs" text="Return to jobs list"/>

        <Row>
          <Col><h1>Create new job</h1></Col>
        </Row>

        {
          this.state.creationError &&
          <JobCreationFailed/>
        }

        <JobForm jobData={this.state.jobData}
          onSubmit={this.handleJobSubmission}
                 onCancel={this.onCancel}
                 submitText="Create"/>
      </Container>
    );
  }

  handleJobSubmission = async (jobData, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await JobsService.createJob({data: jobData});
      this.redirectToJobsList();
    } catch (e) {
      this.onJobCreationFailed();
    }

    setSubmitting(false);
  };

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
