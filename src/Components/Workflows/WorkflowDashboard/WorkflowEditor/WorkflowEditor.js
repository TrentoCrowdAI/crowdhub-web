import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";

import './WorkflowEditor.css';
import WorkflowGraphEditor from "./WorkflowGraphEditor/WorkflowGraphEditor";
import DraggableBlockTypeListSidebar from "./sidebars/DraggableBlockTypeListSidebar";
import WorkflowSidebar from "./sidebars/WorkflowSidebar/WorkflowSidebar";
import BlockConfiguratorSidebar from "./sidebars/BlockSidebar/BlockSidebar";
import WorkflowGraphModel from "./WorkflowGraphEditor/models/WorkflowGraphModel";
import WorkflowBreadcrumb from "./WorkflowBreadcrumb";
import {WorkflowSaveBar} from "./WorkflowSaveBar";


export default class WorkflowEditor extends Component {

  graphModel = new WorkflowGraphModel();

  state = {
    selectedBlock: null
  };

  constructor(props) {
    super(props);
    const {runnableWorkflow} = this.props;
    this.graphModel.workflowId = runnableWorkflow.getWorkflow().id;
  }

  componentDidMount() {
    const {runnableWorkflow} = this.props;
    this.onRunsUpdate(runnableWorkflow);
    runnableWorkflow.addRunsListener(this.onRunsUpdate);
  }

  onRunsUpdate = (runnableWorkflow) => {
    this.graphModel.setLocked(this.isEditDisabled());
    this.graphModel.setRuns(runnableWorkflow.getRuns());
    this.onModelUpdated();
  };

  onModelUpdated = () => {
    console.log("[WorkflowEditor] onModelUpdated()");
    this.onWorkflowEdited();
    this.forceUpdate();
  };

  componentWillUnmount() {
    this.props.runnableWorkflow.removeRunsListener(this.onRunsUpdate);
  }

  onBlockSelected = (selectedBlock) => this.setState({selectedBlock});

  onSavePressed = () => {
    this.onModelUpdated();
    this.props.onSave();
  };

  onWorkflowEdited = (workflow) => {
    if (!workflow) {
      workflow = this.getWorkflow();
    }
    workflow.graph = this.graphModel.serializeDiagram();
    this.props.onWorkflowEdited(workflow);
  };

  getWorkflow = () => this.props.runnableWorkflow.getWorkflow();

  isReadOnly = () => this.props.readOnly;

  isEditDisabled = () => this.isReadOnly() || !this.props.runnableWorkflow.canBeEdited();

  render() {
    const {runnableWorkflow, blockTypeDefinitions} = this.props;
    const workflow = runnableWorkflow.getWorkflow();
    const initialGraph = workflow.graph;

    return (
      <Container className="full-width workflow-editor-container" id="workflow-editor">
        <Row className="full-height">

          {/* Left sidebar */}
          {
            !this.isEditDisabled() &&
            <Col className="editor-left-sidebar light-background">
              <DraggableBlockTypeListSidebar blockTypeDefinitions={blockTypeDefinitions}/>
            </Col>
          }


          {/* Center */}
          <Col className="editor-center graph-editor-container">
            <WorkflowGraphEditor
              initialGraph={initialGraph}
              graphModel={this.graphModel}
              blockTypeDefinitions={blockTypeDefinitions}
              onBlockSelected={this.onBlockSelected}
              onModelUpdate={this.onModelUpdated}/>

            <WorkflowBreadcrumb workflow={workflow}/>

            {
              !this.isReadOnly() &&
              <WorkflowSaveBar runnableWorkflow={runnableWorkflow}
                               graphModel={this.graphModel}
                               onSavePressed={this.onSavePressed}
                               isSaving={this.props.isSaving}
                               saveError={this.props.saveError}
                               disabled={this.isEditDisabled()}/>
            }
          </Col>

          {/* Right sidebar */}
          <Col className="editor-right-sidebar light-background">
            {
              this.state.selectedBlock ?
                <BlockConfiguratorSidebar block={this.state.selectedBlock}
                                          graphModel={this.graphModel}
                                          onModelUpdate={this.onModelUpdated}
                                          runnableWorkflow={runnableWorkflow}
                                          readOnly={this.isReadOnly()}
                                          disabled={this.isEditDisabled()}/>
                :
                <WorkflowSidebar runnableWorkflow={runnableWorkflow}
                                 onEdit={this.onWorkflowEdited}
                                 graphModel={this.graphModel}
                                 onModelUpdate={this.onModelUpdated}
                                 readOnly={this.isReadOnly()}
                                 disabled={this.isEditDisabled()}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

