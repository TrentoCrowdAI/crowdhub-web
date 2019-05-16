import {BlockNodeFactory} from "./BlockNodeFactory";
import {DoBlockNodeFactory} from "./DoBlockNodeFactory";

const nodeFactories = [
  DoBlockNodeFactory,
  BlockNodeFactory
];

export default {
  getNodeFactoryForBlockType (blockType) {
     return nodeFactories.find(Factory => Factory.supportsBlockType(blockType));
  }
}
