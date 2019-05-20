import {DefaultPortModel} from "storm-react-diagrams";

export default class BlockPortModel extends DefaultPortModel {

  canLinkToPort(port) {
    if (!super.canLinkToPort(port)) {
      return false;
    }
    const linkWouldCreateRecursiveDependence = BlockPortModel.blockDependsOnItself(this.getBlock());
    if (linkWouldCreateRecursiveDependence) {
      console.info("Link prevented to avoid recursive dependencies");
    }
    return !linkWouldCreateRecursiveDependence;
  }

  getBlock() {
    return this.parent;
  }

  getConnectedBlocks() {
    return this.getLinksAsList()
      .map(link => link.sourcePort === this ? link.targetPort : link.sourcePort)
      .map(port => port.getBlock());
  }

  getLinksAsList() {
    return Object.values(this.getLinks());
  }

  static blockDependsOnItself(block, visitedBlockIds = {}) {
    visitedBlockIds[block.getId()] = true;
    const outPort = block.getPort('out');
    const connectedBlocks = outPort.getConnectedBlocks();
    for (let connectedBlock of connectedBlocks) {
      if (visitedBlockIds[connectedBlock.getId()]) {
        return true;
      }
      if (BlockPortModel.blockDependsOnItself(connectedBlock, visitedBlockIds)) {
        return true;
      }
    }
    visitedBlockIds[block.getId()] = false;
    return false;
  }

}
