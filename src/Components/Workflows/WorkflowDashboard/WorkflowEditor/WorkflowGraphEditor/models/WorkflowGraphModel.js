import {DiagramModel} from "storm-react-diagrams";
import BlockingContextsModel from "./BlockingContextsModel";

export default class WorkflowGraphModel extends DiagramModel {

  blockingContexts = new BlockingContextsModel(this);

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.blockingContexts.deSerialize(data.blockingContexts || []);
  }


  serialize() {
    return {
      ...super.serialize(),
      blockingContexts: this.blockingContexts.serialize()
    }
  }

  isValid = () => this.getBlocksArray()
    .find(block => !block.isValid()) == null;

  getBlocks = () => this.getNodes();

  getBlocksArray = () => Object.values(this.getBlocks());

  isNewLabelValid = (blockModel, label) => {
    if (label.length <= 0) {
      return false;
    }
    const blockWithSameLabel = this.getBlockByLabelOrNull(label);
    return blockWithSameLabel === blockModel || blockWithSameLabel == null;
  };

  getBlockByLabelOrNull = (label) => this.getBlocksArray().find(block => block.getLabel() === label);

  getNextBlockLabel = () => `block_${this.getBlocksArray().length}`;

  setRuns = (runs) => this.getBlocksArray().forEach(block => block.setRuns(runs));

  getBlockingContexts() {
    return this.blockingContexts;
  }
}
