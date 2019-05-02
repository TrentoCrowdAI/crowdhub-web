import React, {Component} from 'react';
import {Col, Container, Navbar, Row, Spinner} from "react-bootstrap";

import './WorkflowEditor.css';
import {PROJECTS_PATH} from "../../../Projects/Projects";
import WorkflowGraphEditor from "./WorkflowGraphEditor/WorkflowGraphEditor";
import DraggableBlockTypeListSidebar from "./DraggableBlockTypeListSidebar";
import WorkflowPropertiesSidebar from "./WorkflowPropertiesSidebar";
import BlockConfiguratorSidebar from "./BlockConfiguratorSidebar";
import BackButton from "../../../common/BackButton";
import WorkflowGraphModel from "./WorkflowGraphEditor/WorkflowGraphModel";
import WorkflowBreadcrumb from "./WorkflowBreadcrumb";
import LoadingButton from "../../../common/LoadingButton";

const WorkflowEditor = (props) => {
  if (!props.workflow || !props.blockTypeDefinitions) {
    return <LoadingWorkflowEditor/>;
  } else {
    return <LoadedWorkflowEditor {...props}/>;
  }
};

const LoadingWorkflowEditor = () => (
  <div className="loading-spinner-container">
    <Spinner animation="border" variant="primary"/>
  </div>
);

class LoadedWorkflowEditor extends Component {

  graphModel = new WorkflowGraphModel();

  state = {
    selectedNode: null // TODO: Rename
  };

  onNodeSelected = (selectedNode) => this.setState({selectedNode});

  onSavePressed = () => {
    this.onWorkflowEdited();
    this.props.onSave();
  };

  onWorkflowEdited = (workflow) => {
    if (!workflow) {
      workflow = this.props.workflow;
    }
    workflow.graph = this.graphModel.serializeDiagram();
    this.props.onWorkflowEdited(workflow);
  };

  render() {
    const {workflow, blockTypeDefinitions} = this.props;

    return (
      <Container className="full-width workflow-editor-container">
        <Row className="full-height">

          {/* Left sidebar */}
          <Col xs={2} className="light-background">
            <DraggableBlockTypeListSidebar blockTypeDefinitions={blockTypeDefinitions}/>
          </Col>

          {/* Center */}
          <Col xs={7} className="graph-editor-container">
            <WorkflowGraphEditor
              initialGraph={workflow.graph}
              graphModel={this.graphModel}
              blockTypeDefinitions={blockTypeDefinitions}
              onNodeSelected={this.onNodeSelected}/>

            <WorkflowBreadcrumb workflow={workflow}/>

            <WorkflowSaveBar workflow={workflow}
                             graphModel={this.graphModel}
                             onSavePressed={this.onSavePressed}
                             isSaving={this.props.isSaving}/>
          </Col>

          {/* Right sidebar */}
          <Col xs={3} className="light-background right-sidebar">
            {
              this.state.selectedNode ?
                <BlockConfiguratorSidebar block={this.state.selectedNode}
                                          graphModel={this.graphModel}
                                          onModelUpdate={() => this.forceUpdate()}/>
                :
                <WorkflowPropertiesSidebar workflow={this.props.workflow}
                                           onEdit={this.onWorkflowEdited}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


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

      <LoadingButton disabled={!isValid || isSaving} isSaving={isSaving} onClick={onSavePressed}>Save</LoadingButton>
    </Navbar>
  )
};

export default WorkflowEditor;
