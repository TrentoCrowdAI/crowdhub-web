import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";

import './WorkflowEditor.css';
import {PROJECTS_PATH} from "../../../Projects/Projects";
import WorkflowGraphEditor from "./WorkflowGraphEditor/WorkflowGraphEditor";
import DraggableBlockTypeListSidebar from "./DraggableBlockTypeListSidebar";
import WorkflowDataEditorSidebar from "./WorkflowDataEditorSidebar";
import NodeConfiguratorSidebar from "./NodeConfiguratorSidebar";
import BackButton from "../../../common/BackButton";
import WorkflowGraphModel from "./WorkflowGraphEditor/WorkflowGraphModel";
import {makeCancellable} from "../../../../Services/utils";
import BlockTypesDefinitionService from "../../../../Services/BlockTypeDefinitionsService";
import WorkflowBreadcrumb from "./WorkflowBreadcrumb";
import LoadingButton from "../../../common/LoadingButton";

/**
 * Renders the interface with the 3 columns and mediates the communication between the WorkflowGraphEditor and the right column.
 * It also fetches the block types from the server
 */
export default class WorkflowEditor extends Component {

  graphModel = new WorkflowGraphModel();

  state = {
    blockTypeDefinitions: null,
    fetchBlockTypesError: false,

    selectedNode: null
  };

  // TODO: can we separate the loading of the block types from the editor?
  componentDidMount = () => this.fetchBlockTypes();

  componentWillUnmount = () => this.pendingBlockTypesRequest.cancel();

  async fetchBlockTypes() {
    try {
      this.pendingBlockTypesRequest = makeCancellable(BlockTypesDefinitionService.getBlockTypeDefinitions());
      const blockTypeDefinitions = await this.pendingBlockTypesRequest.result;
      this.setState({
        blockTypeDefinitions,
        fetchBlockTypesError: false
      });
    } catch (e) {
      this.setState({fetchBlockTypesError: true});
    }
  }


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
    const {workflow} = this.props;
    const {blockTypeDefinitions} = this.state;

    return (
      <Container className="full-width" style={{'flex': 1, 'marginTop': '-1em'}}>
        {
          (!workflow || !blockTypeDefinitions) &&
          <LoadingWorkflowEditor/>
        }

        {
          workflow && blockTypeDefinitions &&
          <Row className="full-height">
            <Col xs={2} className="light-background">
              <DraggableBlockTypeListSidebar blockTypeDefinitions={blockTypeDefinitions}/>
            </Col>

            <Col xs={7} className="graph-editor-container" style={{display: 'flex'}}>
              <div style={{flex: 1}}>
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
              </div>
            </Col>

            <Col xs={3} className="light-background">
              {
                this.state.selectedNode &&
                <NodeConfiguratorSidebar node={this.state.selectedNode}
                                         onModelUpdate={() => this.forceUpdate()}/>
              }
              {
                !this.state.selectedNode &&
                <WorkflowDataEditorSidebar workflow={this.props.workflow}
                                           onEdit={this.onWorkflowEdited}/>
              }
            </Col>
          </Row>
        }
      </Container>
    );
  }
}

const LoadingWorkflowEditor = () => (
  <div className="loading-spinner-container">
    <Spinner animation="border" variant="primary"/>
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

      <LoadingButton disabled={!isValid || isSaving} isSaving={isSaving} onClick={onSavePressed} text="Save"/>
    </Navbar>
  )
};
