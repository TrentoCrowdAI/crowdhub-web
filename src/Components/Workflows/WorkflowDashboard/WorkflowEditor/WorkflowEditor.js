import React, {Component} from 'react';
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";

import './WorkflowEditor.css';
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../../common/Breadcrumbs";
import {PROJECTS_PATH} from "../../../Projects/Projects";
import GraphEditor from "./WorkflowGraphEditor";
import DraggableBlockTypeList from "./DraggableBlockTypeList";
import {DiagramModel} from "storm-react-diagrams";

export default class WorkflowEditor extends Component {

  graphModel = new DiagramModel();

  constructor(props) {
    super(props);
    const {blocks, graph} = props;
    this.state = {
      blocks,
      graph,
      selectedBlock: null, // { id: 1, data: {} }
    };
  }


  onNodeSelected = (node) => this.onBlockSelected(this.state.blocks[node.id]);

  onNoNodeSelected = () => this.onNoBlockSelected();

  onNewNode = (node, blockType) => this.setState((state) => ({
    blocks: {
      ...state.blocks,
      [node.id]: {type: blockType.data.type}
    }
  }));

  onNodeDeleted = (node) => this.setState((state) => {
    const blocks = state.blocks;
    delete blocks[node.id];
    return {blocks};
  });

  // TODO: Handle deletion of selected block

  onBlockSelected = (selectedBlock) => this.setState({selectedBlock});

  onNoBlockSelected = () => this.setState({selectedBlock: null});

  render() {
    const {workflow, blockTypes} = this.props;
    return (
      <Container className="full-width" style={{'flex': 1, 'marginTop': '-1em'}}>
        <Row className="full-height">
          <Col xs={2} className="light-background">
            <DraggableBlockTypeList blockTypes={this.props.blockTypes}/>
          </Col>

          <Col xs={7} style={{'position': 'relative'}}>
            {/*<WorkflowBreadcrumb/>*/}
            <GraphEditor graphModel={this.graphModel}
                         graph={workflow.graph}

                         onNewNode={this.onNewNode}
                         onNodeDeleted={this.onNodeDeleted}

                         onNodeSelected={this.onNodeSelected}
                         onNoNodeSelected={this.onNoNodeSelected}/>
          </Col>

          <Col xs={3} className="light-background">
            {
              this.state.selectedBlock ?
                <BlockProperties blockTypes={blockTypes} block={this.state.selectedBlock}/> :
                <WorkflowProperties/>
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

const BlockProperties = ({block}) => (
  <p>{JSON.stringify(block)}</p>
);
const WorkflowProperties = () => (
  <p>Workflow Properties</p>
);
