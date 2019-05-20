import React, {Component} from 'react';
import {Alert} from "react-bootstrap";
import {DiagramWidget} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';

import './WorkflowGraphEditor.css'
import {WorkflowGraphEngine} from "./WorkflowGraphEngine";

export default class WorkflowGraphEditor extends Component {

  engine;

  state = {
    deserializationError: false
  };

  constructor(props) {
    super(props);
    this.initGraph();
  }

  componentDidMount() {
    this.deserializeGraph(this.props.initialGraph);
  }

  initGraph = () => {
    this.engine = new WorkflowGraphEngine(this.props.blockTypeDefinitions);
    this.engine.setDiagramModel(this.getModel());
    this.engine.blockTypeDefinitions = this.props.blockTypeDefinitions;
  };

  deserializeGraph = (graph) => {
    if (graph && graph.id) {
      try {
        this.getModel().deSerializeDiagram(graph, this.engine);
        this.addSelectedListenerToNodesOfModel();
      } catch (e) {
        this.setState({deserializationError: true});
        console.error('[WorkflowGraphEditor] deserialization error', e);
      }
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

  isEventCausedByADroppedBlockType = (event) => !!this.getBlockTypeDefinitionFromEvent(event);

  onBlockTypeDropped = (event) => {
    const blockTypeDefinition = this.getBlockTypeDefinitionFromEvent(event);
    const position = this.getMousePosition(event);
    this.createNodeFromDroppedBlockType(blockTypeDefinition, position);
  };

  getBlockTypeDefinitionFromEvent = (event) => JSON.parse(event.dataTransfer.getData('blockTypeDefinition'));

  getMousePosition = (event) => this.engine.getRelativeMousePoint(event);

  createNodeFromDroppedBlockType = (blockTypeDefinition, position) => {
    const node = this.createNodeFromBlockType(blockTypeDefinition, position);
    this.addNodeToGraph(node, blockTypeDefinition);
  };

  createNodeFromBlockType = (blockTypeDefinition, position) => { // TODO: Simplify
    const type = blockTypeDefinition.name;
    const factory = this.engine.getNodeFactory(type);
    const node = factory.getNewInstance();
    node.parent = this.getModel(); // TODO: Can we rename this?
    node.deSerialize({ // I don't want to copy the id
      name: blockTypeDefinition.displayName,
      type: blockTypeDefinition.name,
      ports: blockTypeDefinition.ports,
      color: blockTypeDefinition.color,

      x: position.x,
      y: position.y
    }, this.engine);
    return node;
  };


  addNodeToGraph = (node) => {
    this.addSelectedListener(node);
    this.getModel().addNode(node);
    this.props.onModelUpdate();
  };

  addSelectedListener = (node) => node.addListener({
    selectionChanged: this.onSelectedNodeChanged,
    entityRemoved: this.onSelectedNodeChanged
  });

  onSelectedNodeChanged = () => {
    const selectedNodes = this.getSelectedNodes();
    if (selectedNodes.length === 1) {
      const node = selectedNodes[0];
      this.props.onBlockSelected(node);
    } else {
      this.props.onBlockSelected(null);
    }
  };

  getSelectedNodes = () => this.getModel().getSelectedItems('node');

  getModel = () => this.props.graphModel;

  render() {
    if (this.state.deserializationError) {
      return <GraphDeserializationError/>
    } else {
      return (
        <div onDrop={this.onDrop}
             onDragOver={event => event.preventDefault()}
             className="diagram-widget-container">
          <DiagramWidget diagramEngine={this.engine}/>
        </div>
      );
    }
  }

}

const GraphDeserializationError = () => (
  <div className="deserialization-error-container">
    <Alert className="deserialization-error" variant="danger">
      Can't deserialize graph.
    </Alert>
  </div>
);
