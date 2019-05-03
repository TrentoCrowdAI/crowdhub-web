import {DiagramModel} from "storm-react-diagrams";

export default class WorkflowGraphModel extends DiagramModel {

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

}
