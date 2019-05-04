import React, {Component} from 'react';
import {Alert, Breadcrumb, Col, Container, Row} from "react-bootstrap";

import ProjectsService from "../../../Services/rest/ProjectsService";
import ProjectForm from "../ProjectForm/ProjectForm";
import {redirectToProjectsList} from "../utils/route";
import {PROJECTS_PATH} from "../Projects";
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../common/Breadcrumbs";

export default class EditProject extends Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  componentDidMount = () => this.fetchProject();

  fetchProject = async () => {
    try {
      const project = await ProjectsService.getProject(this.state.id);
      this.setState({project});
    } catch (e) {
      redirectToProjectsList(this);
    }
  };

  handleProjectSubmission = async (projectData, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await ProjectsService.updateProject({
        id: this.state.project.id,
        data: projectData
      });
      this.returnToProjectPage();
    } catch (e) {
      this.onUpdateProjectFailed(e);
    }

    setSubmitting(false);
  };

  onCancel = () => this.returnToProjectPage();

  returnToProjectPage = () => this.props.history.push(`${PROJECTS_PATH}/${this.state.project.id}`);

  onUpdateProjectFailed = (e) => this.setState({updateError: e});

  render() {
    return (
      <Container>

        <Breadcrumb>
          <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
          <LinkBreadcrumb to={`${PROJECTS_PATH}/${this.props.match.params.id}`}>
            {this.state.project ? this.state.project.data.name : '...'}
          </LinkBreadcrumb>
          <SimpleBreadcrumb>Edit</SimpleBreadcrumb>
        </Breadcrumb>

        <Row>
          <Col>
            <h4>
              Edit project {this.state.project && this.state.project.data.name}
            </h4>
          </Col>
        </Row>

        {
          this.state.updateError &&
          <UpdateProjectError error={this.state.updateError}/>
        }

        {
          !this.state.project &&
          <FetchingProject/>
        }
        {
          this.state.project &&
          <ProjectForm projectData={this.state.project.data}
                       onSubmit={this.handleProjectSubmission}
                       submitText="Save"
                       cancelText="Back to Project"
                       cancelButtonUrlDestination={`${PROJECTS_PATH}/${this.state.project.id}`}/>
        }
      </Container>
    );
  }

}

function FetchingProject() {
  return (<p>Fetching Project...</p>);
}


export const UpdateProjectError = ({error}) => (
  <Col>
    <Alert variant="danger">
      There's been an updating the project.
    </Alert>
  </Col>
);
