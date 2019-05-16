import {DefaultBlockNodeFactory} from "./DefaultBlockNodeFactory";
import {DoBlockNodeFactory} from "./DoBlockNodeFactory";

const nodeFactories = [
  DoBlockNodeFactory,
  DefaultBlockNodeFactory
];

export default {
  getNodeFactoryForBlockType (blockType) {
     return nodeFactories.find(Factory => Factory.supportsBlockType(blockType));
  }
}
