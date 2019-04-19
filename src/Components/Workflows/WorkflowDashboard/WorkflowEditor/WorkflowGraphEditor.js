import React, {Component} from 'react';
import {DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';
import './WorkflowGraphEditor.css'
import uuid from 'uuid';

export default class WorkflowGraphEditor extends Component {

  engine = new DiagramEngine();
  model = new DiagramModel();

  constructor(props) {
    super(props);
    this.initGraph();
  }

  initGraph = () => {
    this.engine.installDefaultFactories();
    this.engine.setDiagramModel(this.model);
  };

  onDrop = (event) => {
    if (this.isEventADroppedBlockType(event)) {
      this.onDropBlockType(event);
    }
  };

  isEventADroppedBlockType = (event) => !!this.getBlockTypeFromEvent(event);

  onDropBlockType = (event) => {
    const blockType = this.getBlockTypeFromEvent(event);
    const position = this.getMousePosition(event);
    this.addBlockFromDroppedBlockType(blockType, position);
  };

  getBlockTypeFromEvent = (event) => JSON.parse(event.dataTransfer.getData('blockType'));

  getMousePosition = (event) => this.engine.getRelativeMousePoint(event);

  addBlockFromDroppedBlockType = (blockType, position) => {
    const block = this.createBlockFromBlockType(blockType, position);
    this.addBlock(block);
    this.forceUpdate();
  };

  createBlockFromBlockType = ({data}, position) => ({
    ...data.model,

    id: uuid(),

    ports: data.model.ports.map(port => ({
      ...port,
      id: uuid()
    })),

    x: position.x,
    y: position.y
  });

  addBlock = (block) => {
    const node = this.createNodeFromBlock(block);
    this.addSelectedListener(node);
    this.model.addNode(node);
  };

  createNodeFromBlock = (block) => {
    const node = new DefaultNodeModel();
    node.deSerialize(block, this.engine);
    return node;
  };

  addSelectedListener = (node) => node.addListener({
    selectionChanged: this.onSelectedNodeChanged
  });

  onSelectedNodeChanged = () => {
    const selectedNodes = this.getSelectedNodes();
    if (selectedNodes.length === 1) {
      this.props.onBlockSelected();
    } else {
      this.props.onNoBlockSelected();
    }
  };

  getSelectedNodes = () => this.model.getSelectedItems('node');

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
