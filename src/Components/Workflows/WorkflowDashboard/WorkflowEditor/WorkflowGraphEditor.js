import React, {Component} from 'react';
import {DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';
import './WorkflowGraphEditor.css'
import uuid from 'uuid';

export default class WorkflowGraphEditor extends Component {

  engine = new DiagramEngine();

  constructor(props) {
    super(props);
    this.initGraph();
  }

  initGraph = () => {
    this.engine.installDefaultFactories();
    // TODO: Deserialize
    this.engine.setDiagramModel(this.getModel());
  };

  onDrop = (event) => {
    if (this.isEventCausedByADroppedBlockType(event)) {
      this.onBlockTypeDropped(event);
    }
  };

  isEventCausedByADroppedBlockType = (event) => !!this.getBlockTypeFromEvent(event);

  onBlockTypeDropped = (event) => {
    const blockType = this.getBlockTypeFromEvent(event);
    const position = this.getMousePosition(event);
    this.createNodeFromDroppedBlockType(blockType, position);
  };

  getBlockTypeFromEvent = (event) => JSON.parse(event.dataTransfer.getData('blockType'));

  getMousePosition = (event) => this.engine.getRelativeMousePoint(event);

  createNodeFromDroppedBlockType = (blockType, position) => {
    const node = this.createNodeFromBlockType(blockType, position);
    this.props.onNewNode(node, blockType);
    this.addNodeToGraph(node, blockType);
  };

  createNodeFromBlockType = ({data}, position) => {
    const {nodeDefinition} = data;
    const node = new DefaultNodeModel();
    node.deSerialize({
      ...nodeDefinition,

      id: uuid(),

      ports: nodeDefinition.ports.map(port => ({
        ...port,
        id: uuid()
      })),

      x: position.x,
      y: position.y
    }, this.engine);
    return node;
  };

  addNodeToGraph = (node) => {
    this.addSelectedListener(node);
    this.getModel().addNode(node);
    this.forceUpdate();
  };

  addSelectedListener = (node) => node.addListener({
    selectionChanged: this.onSelectedNodeChanged
  });

  onSelectedNodeChanged = () => {
    const selectedNodes = this.getSelectedNodes();
    if (selectedNodes.length === 1) {
      const node = selectedNodes[0];
      this.props.onNodeSelected(node);
    } else {
      this.props.onNoNodeSelected();
    }
  };

  getSelectedNodes = () => this.getModel().getSelectedItems('node');

  getModel = () => this.props.graphModel;

  render() {
    return (
      <div onDrop={this.onDrop}
           onDragOver={event => event.preventDefault()}
           className="full-height">
        <DiagramWidget diagramEngine={this.engine}/>
      </div>
    );
  }

}
