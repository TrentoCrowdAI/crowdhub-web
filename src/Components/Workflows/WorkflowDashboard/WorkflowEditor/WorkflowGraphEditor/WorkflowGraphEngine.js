import {DiagramEngine} from "storm-react-diagrams";
import BlackLinkFactory from "./factories/BlackLinkFactory";
import {BlockNodeFactory} from "./factories/BlockNodeFactory";

export class WorkflowGraphEngine extends DiagramEngine {

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

  getModel() {
    return this.getDiagramModel();
  }

  getNextBlockId = () => `block_${Object.keys(this.getNodes()).length}`;

}
