import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";

import {LinkBreadcrumb, SimpleBreadcrumb} from "../../common/Breadcrumbs";
import ProjectsService from "../../../Services/ProjectsService";
import {makeCancellable} from "../../../Services/utils";
import {redirectToProjectsList} from "../utils/route";
import {PROJECTS_PATH} from "../Projects";
import EmbeddableWorkflowsList from "../../Workflows/WorkflowsList/EmbeddableWorkflowsList";


export default class ViewProject extends Component {

  state = {};

  componentDidMount = () => this.fetchProject();

  componentWillUnmount = () => this.pendingProjectRequest.cancel();

  async fetchProject() {
    const id = this.props.match.params.id;

    try {
      this.pendingProjectRequest = makeCancellable(ProjectsService.getProject(id));
      const project = await this.pendingProjectRequest.result;

      this.setState({project});
    } catch (e) {
      redirectToProjectsList(this);
    }
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
          <SimpleBreadcrumb>
            {this.state.project ? this.state.project.data.name : '...'}
          </SimpleBreadcrumb>
        </Breadcrumb>

        {
          !this.state.project &&
          <FetchingProject/>
        }

        {
          this.state.project &&
          <Row>
            <ProjectData project={this.state.project}/>
            <hr style={{width: '100%'}}/>
            <EmbeddableWorkflowsList project={this.state.project}/>
          </Row>
        }

      </Container>
    );
  }
}

const FetchingProject = () => (<p>Fetching ...</p>);

function ProjectData({project}) {
  return (
    <Container>

      <Row>

        <Col><h4>Project {project.data.name}</h4></Col>
        <Col className="d-flex flex-row-reverse">
          <div>
            <Link to={`${PROJECTS_PATH}/${project.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>{project.data.description}</Col>
      </Row>
    </Container>
  );
}

