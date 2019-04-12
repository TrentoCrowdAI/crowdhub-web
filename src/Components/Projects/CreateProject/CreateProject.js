import React, {Component} from 'react';
import {Alert, Col, Row, Container} from "react-bootstrap";

import JobsService from "../../../Services/JobsService";
import ProjectForm from "../ProjectForm/JobForm";
import BackButton from "../../common/BackButton";
import Templates from "./Templates";

const DEFAULT_TEMPLATE_ID = 'blank';

export default class CreateProject extends Component {

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

        <ProjectForm jobData={this.state.jobData}
                     onSubmit={this.handleJobSubmission}
                     onCancel={this.onCancel}
                     submitText="Create"/>
      </Container>
    );
  }

  handleJobSubmission = async (jobData, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await JobsService.createProject({data: jobData});
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
