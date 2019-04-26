import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";

import './WorkflowEditor.css';
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../../common/Breadcrumbs";
import {PROJECTS_PATH} from "../../../Projects/Projects";
import GraphEditor from "./GraphEditor/GraphEditor";
import DraggableBlockTypeListSidebar from "./DraggableBlockTypeListSidebar";
import WorkflowDataEditorSidebar from "./WorkflowDataEditorSidebar";
import NodeConfiguratorSidebar from "./NodeConfiguratorSidebar";
import BackButton from "../../../common/BackButton";
import WorkflowGraphModel from "./GraphEditor/WorkflowGraphModel";
import {makeCancellable} from "../../../../Services/utils";
import BlockTypesService from "../../../../Services/BlockTypesService";

/**
 * Renders the interface with the 3 columns and mediates the communication between the GraphEditor and the right column.
 * It also fetches the block types from the server
 */
export default class WorkflowEditor extends Component {

  graphModel = new WorkflowGraphModel();

  state = {
    blockTypes: null,
    fetchBlockTypesError: false,

    selectedNode: null
  };

  // TODO: can we separate the loading of the block types from the editor?
  componentDidMount = () => this.fetchBlockTypes();

  componentWillUnmount = () => this.pendingBlockTypesRequest.cancel();

  async fetchBlockTypes() {
    try {
      this.pendingBlockTypesRequest = makeCancellable(BlockTypesService.getBlockTypes());
      const blockTypes = await this.pendingBlockTypesRequest.result;
      this.setState({
        blockTypes,
        fetchBlockTypesError: false
      });
    } catch (e) {
      this.setState({fetchBlockTypesError: true});
    }
  }


  onNodeSelected = (selectedNode) => this.setState({selectedNode});

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
    const {workflow} = this.props;
    const {blockTypes} = this.state;

    return (
      <Container className="full-width" style={{'flex': 1, 'marginTop': '-1em'}}>
        {
          (!workflow || !blockTypes) &&
          <p>Loading ...</p>
        }

        {
          workflow && blockTypes &&
          <Row className="full-height">
            <Col xs={2} className="light-background">
              <DraggableBlockTypeListSidebar blockTypes={blockTypes}/>
            </Col>

            <Col xs={7} className="graph-editor-container" style={{display: 'flex'}}>
              <div style={{flex: 1}}>
                <GraphEditor
                  initialGraph={workflow.data.graph}
                  graphModel={this.graphModel}
                  blockTypes={blockTypes}
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
                <WorkflowDataEditorSidebar workflowData={this.props.workflow.data}
                                           onEdit={this.onWorkflowDataEdited}/>
              }
            </Col>
          </Row>
        }
      </Container>
    );
  }
}


const WorkflowBreadcrumb = ({workflow}) => (
  <div className="workflow-breadcrumb">
    <Breadcrumb>
      <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
      <SimpleBreadcrumb>Hello world</SimpleBreadcrumb>
      <SimpleBreadcrumb>Workflows</SimpleBreadcrumb>
      <SimpleBreadcrumb>{workflow.data.name}</SimpleBreadcrumb>
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

      <Button disabled={!isValid || isSaving} onClick={onSavePressed}>
        {
          isSaving &&
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        }
        <span> Save</span>
      </Button>
    </Navbar>
  )
};
