import React, {Component} from 'react';
import {DiagramEngine, DiagramWidget} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';
import './GraphEditor.css'
import uuid from 'uuid';
import {BlockNodeFactory, BlockNodeModel} from "./BlockNode";
import BlackLinkFactory from "./BlackLinkFactory";

export default class GraphEditor extends Component {

  engine = new DiagramEngine();

  constructor(props) {
    super(props);
    this.initGraph();
    this.deserializeGraph(props.initialGraph);
  }

  initGraph = () => {
    this.engine.installDefaultFactories();
    this.engine.registerNodeFactory(new BlockNodeFactory());
    this.engine.registerLinkFactory(new BlackLinkFactory());
    this.engine.setDiagramModel(this.getModel());
  };

  deserializeGraph = (graph) => {
    if (graph && graph.id) {
      this.getModel().deSerializeDiagram(graph, this.engine);
      this.addSelectedListenerToNodesOfModel();
    }
  };

  addSelectedListenerToNodesOfModel = () => {
    Object.values(this.getModel().getNodes())
      .forEach(this.addSelectedListener);
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
    this.addNodeToGraph(node, blockType);
  };

  createNodeFromBlockType = (blockType, position) => {
    const {data} = blockType;
    const {nodeDefinition} = data;
    const node = new BlockNodeModel();
    node.deSerialize({
      ...nodeDefinition,

      id: uuid(),

      ports: nodeDefinition.ports.map(port => ({
        ...port,
        id: uuid()
      })),

      x: position.x,
      y: position.y,

      data: blockType.data
    }, this.engine);
    return node;
  };


  addNodeToGraph = (node) => {
    this.addSelectedListener(node);
    this.getModel().addNode(node);
    this.forceUpdate();
  };

  addSelectedListener = (node) => node.addListener({
    selectionChanged: this.onSelectedNodeChanged,
    entityRemoved: this.props.onNoNodeSelected
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

