import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Container, Navbar, Row} from "react-bootstrap";

import './WorkflowEditor.css';
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../../common/Breadcrumbs";
import {PROJECTS_PATH} from "../../../Projects/Projects";
import GraphEditor from "./GraphEditor/GraphEditor";
import DraggableBlockTypeListSidebar from "./DraggableBlockTypeListSidebar";
import WorkflowDataEditorSidebar from "./WorkflowDataEditorSidebar";
import NodeConfiguratorSidebar from "./NodeConfiguratorSidebar";
import BackButton from "../../../common/BackButton";
import WorkflowGraphModel from "./GraphEditor/WorkflowGraphModel";

export default class WorkflowEditor extends Component {

  graphModel = new WorkflowGraphModel();

  state = {
    selectedNode: null
  };

  onNodeSelected = (selectedNode) => this.setState({selectedNode});

  onNoNodeSelected = () => this.setState({selectedNode: null});

  onSavePressed = () => {
    this.onWorkflowDataEdited();
    this.props.onSave();
  };

  onWorkflowDataEdited = (data) => {
    const workflow = {
      ...this.props.workflow
    };
    if (data) {
      workflow.data = {
        ...workflow.data,
        ...data
      };
    }
    workflow.data.graph = this.graphModel.serializeDiagram();
    this.props.onWorkflowEdited(workflow);
  };

  // TODO: Handle deletion of selected block

  render() {
    const {workflow, blockTypes} = this.props;
    return (
      <Container className="full-width" style={{'flex': 1, 'marginTop': '-1em'}}>
        <Row className="full-height">
          <Col xs={2} className="light-background">
            <DraggableBlockTypeListSidebar/>
          </Col>

          <Col xs={7} className="graph-editor-container" style={{display: 'flex'}}>
            {
              !this.props.workflow &&
              <p>Loading ...</p>
            }
            {
              this.props.workflow &&

              <div style={{flex: 1}}>
                <GraphEditor
                  initialGraph={workflow.data.graph}
                  graphModel={this.graphModel}

                  onNodeSelected={this.onNodeSelected}
                  onNoNodeSelected={this.onNoNodeSelected}/>

                <WorkflowBreadcrumb/>
                <WorkflowSaveBar workflow={workflow}
                                 graphModel={this.graphModel}
                                 onSavePressed={this.onSavePressed}
                                 isSaving={this.props.isSaving}/>
              </div>
            }
          </Col>

          <Col xs={3} className="light-background">
            {
              this.state.selectedNode &&
              <NodeConfiguratorSidebar blockTypes={blockTypes}
                                       node={this.state.selectedNode}
                                       onModelUpdate={() => this.forceUpdate()}/>
            }
            {
              this.props.workflow && !this.state.selectedNode &&
              <WorkflowDataEditorSidebar workflowData={this.props.workflow.data}
                                         onEdit={this.onWorkflowDataEdited}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


const WorkflowBreadcrumb = () => (
  <div className="workflow-breadcrumb">
    <Breadcrumb>
      <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
      <SimpleBreadcrumb>Hello world</SimpleBreadcrumb>
      <SimpleBreadcrumb>Workflows</SimpleBreadcrumb>
      <SimpleBreadcrumb>First</SimpleBreadcrumb>
    </Breadcrumb>
  </div>
);

const WorkflowSaveBar = ({workflow, graphModel, isSaving, onSavePressed}) => {
  const isValid = graphModel.isValid();
  return (
    <Navbar className="light-background justify-content-between workflow-bottom-navbar">
      <BackButton text="Return to project" to={`${PROJECTS_PATH}/${workflow.projectId}`}/>

      <div>
        {
          !isValid &&
          <span>
            <i className="fas fa-exclamation-triangle"/> Workflow contains some errors
          </span>
        }
      </div>

      <Button disabled={!isValid || isSaving} onClick={onSavePressed}>Save</Button>
    </Navbar>
  )
};
