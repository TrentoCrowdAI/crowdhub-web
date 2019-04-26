import React, {Component} from 'react';
import {DiagramEngine, DiagramWidget} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';
import './GraphEditor.css'
import {BlockNodeFactory, BlockNodeModel} from "./BlockNode";
import BlackLinkFactory from "./BlackLinkFactory";

class WorkflowGraphEngine extends DiagramEngine {

  blockTypeDefinitions;

  constructor(blockTypeDefinitions) {
    super();
    this.setBlockTypeDefinitions(blockTypeDefinitions);
    this.installFactories();
  }

  setBlockTypeDefinitions(blockTypeDefinitions) {
    this.blockTypeDefinitions = blockTypeDefinitions;
  }

  installFactories() {
    this.installDefaultFactories();
    this.registerLinkFactory(new BlackLinkFactory());
    this.getBlockTypeDefinitions().forEach(blockTypeDefinition => this.registerNodeFactory(
      new BlockNodeFactory(blockTypeDefinition.name)
    ));
  }

  getBlockTypeDefinitions() {
    return this.blockTypeDefinitions;
  }

  getBlockTypeDefinition(blockType) {
    return this.getBlockTypeDefinitions().find(definition => definition.name === blockType);
  }

}

export default class WorkflowGraphEditor extends Component {

  engine;

  constructor(props) {
    super(props);
    this.initGraph();
    this.deserializeGraph(props.initialGraph);
  }

  initGraph = () => {
    this.engine = new WorkflowGraphEngine(this.props.blockTypeDefinitions);
    this.engine.setDiagramModel(this.getModel());
    this.engine.blockTypeDefinitions = this.props.blockTypeDefinitions;
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

  createNodeFromBlockType = (blockTypeDefinition, position) => {
    const node = new BlockNodeModel();

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
    this.forceUpdate();
  };

  addSelectedListener = (node) => node.addListener({
    selectionChanged: this.onSelectedNodeChanged,
    entityRemoved: this.onSelectedNodeChanged
  });

  onSelectedNodeChanged = () => {
    const selectedNodes = this.getSelectedNodes();

    if (selectedNodes.length === 1) {
      const node = selectedNodes[0];
      this.props.onNodeSelected(node);
    } else {
      this.props.onNodeSelected(null);
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

