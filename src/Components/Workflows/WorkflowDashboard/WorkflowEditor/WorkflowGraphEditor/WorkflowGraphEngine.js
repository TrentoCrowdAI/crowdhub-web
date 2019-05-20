import {DefaultLabelFactory, DiagramEngine} from "storm-react-diagrams";
import BlackLinkFactory from "./factories/BlackLinkFactory";
import nodeFactories from "./factories/nodeFactories";
import BlockPortFactory from "./factories/BlockPortFactory";

export class WorkflowGraphEngine extends DiagramEngine {

  blockTypeDefinitions;

  constructor(blockTypeDefinitions) {
    super();
    this.setBlockTypeDefinitions(blockTypeDefinitions);
    this.registerFactories();
  }

  setBlockTypeDefinitions(blockTypeDefinitions) {
    this.blockTypeDefinitions = blockTypeDefinitions;
  }

  registerFactories() {
    this.registerLinkFactory(new BlackLinkFactory());
    this.registerPortFactory(new BlockPortFactory());
    this.registerLabelFactory(new DefaultLabelFactory());
    this.registerNodeFactories();
  }

  registerNodeFactories () {
    this.getBlockTypeDefinitions().forEach(blockTypeDefinition => {
      const Factory = nodeFactories.getNodeFactoryForBlockType(blockTypeDefinition.name);
      this.registerNodeFactory(new Factory(blockTypeDefinition.name));
    });
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

}
