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

  componentDidMount() {
    const {runnableWorkflow} = this.props;
    this.onRunsUpdate(runnableWorkflow);
    runnableWorkflow.addRunsListener(this.onRunsUpdate);
  }

  onRunsUpdate = (runnableWorkflow) => {
    // TODO: The logic to block edit is spread everywhere, can we group it somewhere?
    this.graphModel.setLocked(!runnableWorkflow.canBeEdited());
    this.graphModel.setRuns(runnableWorkflow.getRuns());
    this.forceUpdate();
  };

  componentWillUnmount() {
    this.props.runnableWorkflow.removeRunsListener(this.onRunsUpdate);
  }

  onBlockSelected = (selectedBlock) => this.setState({selectedBlock});

  onSavePressed = () => {
    this.onWorkflowEdited();
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

  render() {
    const {runnableWorkflow, blockTypeDefinitions} = this.props;
    const workflow = runnableWorkflow.getWorkflow();
    const initialGraph = workflow.graph;

    return (
      <Container className="full-width workflow-editor-container">
        <Row className="full-height">

          {/* Left sidebar */}
          {
            runnableWorkflow.canBeEdited() &&
            <Col xs={2} className="light-background">
              <DraggableBlockTypeListSidebar blockTypeDefinitions={blockTypeDefinitions}/>
            </Col>
          }


          {/* Center */}
          <Col xs={7} className="graph-editor-container">
            <WorkflowGraphEditor
              initialGraph={initialGraph}
              graphModel={this.graphModel}
              blockTypeDefinitions={blockTypeDefinitions}
              onBlockSelected={this.onBlockSelected}/>

            <WorkflowBreadcrumb workflow={workflow}/>

            <WorkflowSaveBar runnableWorkflow={runnableWorkflow}
                             graphModel={this.graphModel}
                             onSavePressed={this.onSavePressed}
                             isSaving={this.props.isSaving}/>
          </Col>

          {/* Right sidebar */}
          <Col xs={3} className="light-background right-sidebar">
            {
              this.state.selectedBlock ?
                <BlockConfiguratorSidebar block={this.state.selectedBlock}
                                          graphModel={this.graphModel}
                                          onModelUpdate={() => this.forceUpdate()}
                                          runnableWorkflow={runnableWorkflow}/>
                :
                <WorkflowSidebar runnableWorkflow={runnableWorkflow}
                                 onEdit={this.onWorkflowEdited}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

