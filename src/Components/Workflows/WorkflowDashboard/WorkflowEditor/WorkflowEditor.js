import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";

import './WorkflowEditor.css';
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../../common/Breadcrumbs";
import {PROJECTS_PATH} from "../../../Projects/Projects";
import GraphEditor from "./GraphEditor/GraphEditor";
import DraggableBlockTypeListSidebar from "./DraggableBlockTypeListSidebar";
import WorkflowDataEditorSidebar from "./WorkflowDataEditorSidebar";
import NodeConfiguratorSidebar from "./NodeConfiguratorSidebar";

export default class WorkflowEditor extends Component {

  state = {
    selectedNode: null
  };

  onNodeSelected = (selectedNode) => this.setState({selectedNode});

  onNoNodeSelected = () => this.setState({selectedNode: null});

  onNodeEdited = (editedNode) => {
    const graph = this.props.workflow.graph;

    const index = graph.nodes.findIndex(node => node.id === editedNode.id);
    graph.nodes[index] = editedNode;

    this.onGraphEdited(graph);
  };

  onGraphEdited = (graph) => this.onWorkflowEdited({
    ...this.props.workflow,
    graph
  });

  onWorkflowEdited =(workflow) => this.props.onWorkflowEdited(workflow);


  // TODO: Handle deletion of selected block

  render() {
    const {workflow, blockTypes} = this.props;
    return (
      <Container className="full-width" style={{'flex': 1, 'marginTop': '-1em'}}>
        <Row className="full-height">
          <Col xs={2} className="light-background">
            <DraggableBlockTypeListSidebar blockTypes={this.props.blockTypes}/>
          </Col>

          <Col xs={7} style={{'position': 'relative'}}>
            {/*<WorkflowBreadcrumb/>*/}

            <GraphEditor
              graph={workflow.graph}
              onGraphEdited={this.onGraphEdited}

              onNodeSelected={this.onNodeSelected}
              onNoNodeSelected={this.onNoNodeSelected}/>

            <WorkflowSaveBar workflow={workflow}/>
          </Col>

          <Col xs={3} className="light-background">
            {
              this.state.selectedNode ?
                // TODO: Rename
                <NodeConfiguratorSidebar blockTypes={blockTypes}
                                         node={this.state.selectedNode}
                                         onNodeEdited={(node)=>this.onNodeEdited(node)}/> :
                <WorkflowDataEditorSidebar workflow={this.state.workflow} onEdit={this.onWorkflowEdited}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


const WorkflowBreadcrumb = () => (
  <Breadcrumb>
    <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
    <SimpleBreadcrumb>Hello world</SimpleBreadcrumb>
    <SimpleBreadcrumb>Workflows</SimpleBreadcrumb>
    <SimpleBreadcrumb>First</SimpleBreadcrumb>
  </Breadcrumb>
);

const WorkflowSaveBar = ({isValid}) => {
  return (
    <div style={{'position': 'absolute', 'top': 0}}>
      ok {isValid}
    </div>
  )
};
