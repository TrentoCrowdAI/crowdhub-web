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
    // TODO: The logic to block edit is spread everywhere, can we group it somewhere?
    this.graphModel.setLocked(!runnableWorkflow.canBeEdited());
    this.graphModel.setRuns(runnableWorkflow.getRuns());
    this.onModelUpdated();
  };

  onModelUpdated = () => {
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
      <Container className="full-width workflow-editor-container" id="workflow-editor">
        <Row className="full-height">

          {/* Left sidebar */}
          {
            runnableWorkflow.canBeEdited() &&
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

            <WorkflowSaveBar runnableWorkflow={runnableWorkflow}
                             graphModel={this.graphModel}
                             onSavePressed={this.onSavePressed}
                             isSaving={this.props.isSaving}/>
          </Col>

          {/* Right sidebar */}
          <Col className="editor-right-sidebar light-background">
            {
              this.state.selectedBlock ?
                <BlockConfiguratorSidebar block={this.state.selectedBlock}
                                          graphModel={this.graphModel}
                                          onModelUpdate={this.onModelUpdated}
                                          runnableWorkflow={runnableWorkflow}/>
                :
                <WorkflowSidebar runnableWorkflow={runnableWorkflow}
                                 onEdit={this.onWorkflowEdited}
                                 graphModel={this.graphModel}
                                 onModelUpdate={this.onModelUpdated}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

