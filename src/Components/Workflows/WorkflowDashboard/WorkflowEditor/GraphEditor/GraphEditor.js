import React, {Component} from 'react';
import {DefaultNodeFactory, DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';
import './GraphEditor.css'
import uuid from 'uuid';
import {BlockNodeFactory, BlockNodeModel} from "./BlockNode";

export default class GraphEditor extends Component {

  engine = new DiagramEngine();
  model = new DiagramModel();

  constructor(props) {
    super(props);
    this.initGraph();
    this.deserializeGraph(props.graph);
  }


  deserializeGraph = (graph) => {
    if (graph && graph.id) {
      this.model.deSerializeDiagram(graph, this.engine);
      this.addSelectedListenerToNodesOfModel();
    }
  };

  initGraph = () => {
    this.engine.installDefaultFactories();
    this.engine.registerNodeFactory(new BlockNodeFactory());
    this.engine.setDiagramModel(this.model);
  };

  addSelectedListenerToNodesOfModel = () => {
    Object.keys(this.model.nodes)
      .map(id => this.model.nodes[id])
      .forEach(node => this.addSelectedListener(node));
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

      data: this.createBlockDataFromBlockType(blockType)
    }, this.engine);
    return node;
  };

  createBlockDataFromBlockType = (blockType) => ({
    type: blockType.data.type,
    parameters: blockType.data.parameters.map(parameter => ({
      ...parameter,
      value: parameter.default,
      isValid: true
    }))
  });

  addNodeToGraph = (node) => {
    this.addSelectedListener(node);
    this.model.addNode(node);
    this.forceUpdate();

    this.props.onGraphEdited(this.model.serializeDiagram());
  };

  addSelectedListener = (node) => node.addListener({
    selectionChanged: this.onSelectedNodeChanged
  });

  onSelectedNodeChanged = () => {
    const selectedNodes = this.getSelectedNodes();
    setImmediate(() => { // TODO: Can we remove this? this is needed to fire the onBlur (of Text) before changing selected node
      if (selectedNodes.length === 1) {
        const node = selectedNodes[0];
        this.props.onNodeSelected(node);
      } else {
        this.props.onNoNodeSelected();
      }
    });

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

